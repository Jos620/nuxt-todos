import { beforeEach, describe, expect, it } from 'vitest';

import type { TodosRepository } from '@/app/repositories/todo';

import {
  fakeTodos,
  InMemoryDatabase,
} from '../../../../tests/database/in-memory-database';
import { DeleteTodoService } from './delete-todo';

let db: TodosRepository;
let deleteTodoService: DeleteTodoService;

describe('delete-todo', () => {
  beforeEach(() => {
    db = new InMemoryDatabase().withTodos();
    deleteTodoService = new DeleteTodoService(db);
  });

  it('should delete a todo', async () => {
    const allTodos = await db.getAllTodos();
    expect(allTodos).toHaveLength(3);

    await deleteTodoService.execute(allTodos[1].id);

    const remainingTodos = await db.getAllTodos();
    expect(remainingTodos).toHaveLength(2);

    expect(remainingTodos.map((todo) => todo.title)).toMatchObject([
      fakeTodos[0][0],
      fakeTodos[2][0],
    ]);
  });
});
