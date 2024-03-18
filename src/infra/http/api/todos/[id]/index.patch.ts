import { CompleteTodoService } from '~/app/services/todo/complete-todo';
import { DrizzleDatabase } from '~/infra/database/drizzle';
import { findTodoDTO } from '~/infra/http/dto/todos';
import { type TodoHTTP, TodoViewModel } from '~/infra/http/view-models/todo';

export interface TodoIdPatchResponse {
  todo?: TodoHTTP;
}

export default defineEventHandler<Promise<TodoIdPatchResponse>>(
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
