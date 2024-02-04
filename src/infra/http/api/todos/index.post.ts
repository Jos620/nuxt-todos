import { z } from 'zod';

import { CreateTodoService } from '~/app/services/todo/create-todo';
import { DrizzleDatabase } from '~/infra/database/drizzle';
import { type TodoHTTP, TodoViewModel } from '~/infra/http/view-models/todo';

interface CreateTodoResponse {
  todo: TodoHTTP;
}

export default defineEventHandler<Promise<CreateTodoResponse>>(
  async (event) => {
    const db = DrizzleDatabase.getInstance();
    const createTodoService = new CreateTodoService(db);

    const { title, description } = await readValidatedBody(event, (body) => {
      const schema = z.object({
        title: z.string().min(1).max(255),
        description: z.string().max(255).optional(),
      });

      return schema.parse(body);
    });

    const newTodo = await createTodoService.execute({ title, description });

    return {
      todo: TodoViewModel.toHTTP(newTodo),
    };
  },
);
