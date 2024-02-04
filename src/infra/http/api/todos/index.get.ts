import { GetAllTodosService } from '~/app/services/todo/get-all-todos';
import { DrizzleDatabase } from '~/infra/database/drizzle';
import { type TodoHTTP, TodoViewModel } from '~/infra/http/view-models/todo';

export interface TodosResponse {
  todos: TodoHTTP[];
}

export default defineEventHandler<Promise<TodosResponse>>(async () => {
  const db = DrizzleDatabase.getInstance();
  const getAllTodosService = new GetAllTodosService(db);

  const todos = await getAllTodosService.execute();

  return {
    todos: todos.map(TodoViewModel.toHTTP),
  };
});
