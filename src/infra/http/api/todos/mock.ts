import { http, HttpResponse } from 'msw';

import { InMemoryDatabase } from '../../../../../tests/database/in-memory-database';
import { GetAllTodosService } from '../../../../app/services/todo/get-all-todos';
import {
  type MultipleTodosResponse,
  TodoViewModel,
} from '../../view-models/todo';

export const apiTodosGet = http.get('/api/todos', async () => {
  const db = new InMemoryDatabase().withTodos();
  const getAllTodosService = new GetAllTodosService(db);

  const todos = await getAllTodosService.execute();

  return HttpResponse.json<MultipleTodosResponse>({
    todos: todos.map(TodoViewModel.toHTTP),
  });
});
