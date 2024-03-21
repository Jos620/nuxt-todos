import { GetTodoService } from '~/app/services/todo/get-todo';
import { DrizzleDatabase } from '~/infra/database/drizzle';
import { findTodoDTO, type SingleTodoResponse } from '~/infra/http/dto/todos';
import { TodoViewModel } from '~/infra/http/view-models/todo';

export default defineEventHandler<Promise<SingleTodoResponse>>(
  async (event) => {
    const db = DrizzleDatabase.getInstance();
    const getTodoService = new GetTodoService(db);

    const { id } = await getValidatedRouterParams(event, (params) => {
      return findTodoDTO.parse(params);
    });

    const todo = await getTodoService.execute(id);

    if (!todo) {
      throw new Error('Todo not found');
    }

    return {
      todo: TodoViewModel.toHTTP(todo),
    };
  },
);
