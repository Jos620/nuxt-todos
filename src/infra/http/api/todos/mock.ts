import { http, HttpResponse } from 'msw';

import { InMemoryDatabase } from '../../../../../tests/database/in-memory-database';
import { CreateTodoService } from '../../../../app/services/todo/create-todo';
import { GetAllTodosService } from '../../../../app/services/todo/get-all-todos';
import { createTodoDTO } from '../../dto/todos';
import {
  type MultipleTodosResponse,
  type SingleTodoResponse,
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

export const apiTodosPost = http.post('/api/todos', async ({ request }) => {
  const db = new InMemoryDatabase();
  const createTodoService = new CreateTodoService(db);

  const body = createTodoDTO.parse(await request.json());

  const todo = await createTodoService.execute(body);

  return HttpResponse.json<SingleTodoResponse>({
    todo: TodoViewModel.toHTTP(todo),
  });
});
