import { beforeEach, describe, expect, it } from 'vitest';

import type { TodosRepository } from '@/app/repositories/todo';

import { InMemoryDatabase } from '../../../../tests/database/in-memory-database';
import { CompleteTodoService } from './complete-todo';
import { GetTodoService } from './get-todo';

let db: TodosRepository;
let completeTodoService: CompleteTodoService;
let getTodoService: GetTodoService;

describe('complete-todo', () => {
  beforeEach(() => {
    db = new InMemoryDatabase().withTodos();
    completeTodoService = new CompleteTodoService(db);
    getTodoService = new GetTodoService(db);
  });

  it('should complete a todo', async () => {
    const [todo] = await db.getAllTodos();
    expect(todo.isCompleted).toBe(false);

    await completeTodoService.execute(todo.id);

    const newTodo = await getTodoService.execute(todo.id);
    expect(newTodo?.isCompleted).toBe(true);
  });
});
