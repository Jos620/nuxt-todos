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

    const { title, description } = await readBody(event);

    const newTodo = await createTodoService.execute({ title, description });

    return {
      todo: TodoViewModel.toHTTP(newTodo),
    };
  },
);
