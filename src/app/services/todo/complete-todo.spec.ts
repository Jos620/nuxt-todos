import { beforeEach, describe, expect, it } from 'vitest';

import type { TodosRepository } from '@/app/repositories/todo';

import { InMemoryDatabase } from '../../../../tests/database/in-memory-database';
import { CompleteTodoService } from './complete-todo';

let db: TodosRepository;
let completeTodoService: CompleteTodoService;

describe('complete-todo', () => {
  beforeEach(() => {
    db = new InMemoryDatabase().withTodos();
    completeTodoService = new CompleteTodoService(db);
  });

  it('should complete a todo', async () => {
    const [todo] = await db.getAllTodos();
    expect(todo.isCompleted).toBe(false);

    await completeTodoService.execute(todo.id);

    const [completedTodo] = await db.getAllTodos();
    expect(completedTodo.isCompleted).toBe(true);
  });
});
