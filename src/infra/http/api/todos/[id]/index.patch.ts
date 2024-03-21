import { CompleteTodoService } from '~/app/services/todo/complete-todo';
import { DrizzleDatabase } from '~/infra/database/drizzle';
import { findTodoDTO, type SingleTodoResponse } from '~/infra/http/dto/todos';
import { TodoViewModel } from '~/infra/http/view-models/todo';

export default defineEventHandler<Promise<SingleTodoResponse>>(
  async (event) => {
    const db = DrizzleDatabase.getInstance();
    const completeTodoService = new CompleteTodoService(db);

    const { id } = await getValidatedRouterParams(event, (params) => {
      return findTodoDTO.parse(params);
    });

    const todo = await completeTodoService.execute(id);

    return {
      todo: TodoViewModel.toHTTP(todo),
    };
  },
);
