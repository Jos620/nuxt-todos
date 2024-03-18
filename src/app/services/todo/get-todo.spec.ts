import { beforeEach, describe, expect, it } from 'vitest';

import type { TodosRepository } from '@/app/repositories/todo';

import { InMemoryDatabase } from '../../../../tests/database/in-memory-database';
import { GetAllTodosService } from './get-all-todos';
import { GetTodoService } from './get-todo';

let db: TodosRepository;
let getTodoService: GetTodoService;
let getAllTodosService: GetAllTodosService;

describe('get-todo', () => {
  beforeEach(() => {
    db = new InMemoryDatabase().withTodos();
    getTodoService = new GetTodoService(db);
    getAllTodosService = new GetAllTodosService(db);
  });

  it('should get a todo by its ID', async () => {
    const allTodos = await getAllTodosService.execute();

    for (const todo of allTodos) {
      const result = await getTodoService.execute(todo.id);
      expect(result).toEqual(todo);
    }
  });
});
