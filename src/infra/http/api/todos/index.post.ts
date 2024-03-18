import { CreateTodoService } from '~/app/services/todo/create-todo';
import { DrizzleDatabase } from '~/infra/database/drizzle';
import { createTodoDTO } from '~/infra/http/dto/todos';
import {
  type SingleTodoResponse,
  TodoViewModel,
} from '~/infra/http/view-models/todo';

export default defineEventHandler<Promise<SingleTodoResponse>>(
  async (event) => {
    const db = DrizzleDatabase.getInstance();
    const createTodoService = new CreateTodoService(db);

    const { title, description } = await readValidatedBody(event, (body) => {
      return createTodoDTO.parse(body);
    });

    const newTodo = await createTodoService.execute({ title, description });

    return {
      todo: TodoViewModel.toHTTP(newTodo),
    };
  },
);
