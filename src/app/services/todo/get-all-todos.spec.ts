import { beforeEach, describe, expect, it } from 'vitest';

import type { TodosRepository } from '@/app/repositories/todo';

import {
  fakeTodos,
  InMemoryDatabase,
} from '../../../../tests/database/in-memory-database';
import { GetAllTodosService } from './get-all-todos';

let db: TodosRepository;
let getAllTodosService: GetAllTodosService;

describe('delete-todo', () => {
  beforeEach(() => {
    db = new InMemoryDatabase().withTodos();
    getAllTodosService = new GetAllTodosService(db);
  });

  it('should get all todos', async () => {
    const allTodos = await getAllTodosService.execute();

    const titles = allTodos.map((todo) => todo.title);
    const expectedTitles = fakeTodos.map((todo) => todo[0]);

    expect(titles).toMatchObject(expectedTitles);
  });
});
