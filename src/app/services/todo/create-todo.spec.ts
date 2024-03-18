import { beforeEach, describe, expect, it } from 'vitest';

import type { TodosRepository } from '@/app/repositories/todo';

import { InMemoryDatabase } from '../../../../tests/database/in-memory-database';
import { CreateTodoService } from './create-todo';

let db: TodosRepository;
let createTodoService: CreateTodoService;

describe('create-todo', () => {
  beforeEach(() => {
    db = new InMemoryDatabase().withTodos();
    createTodoService = new CreateTodoService(db);
  });

  it('should create a todo', async () => {
    const todo = await createTodoService.execute({
      title: 'New todo',
    });

    expect(todo).toMatchObject({
      id: expect.any(String),
      title: 'New todo',
      isCompleted: false,
    });
  });

  it('should create a todo with a description', async () => {
    const todo = await createTodoService.execute({
      title: 'New todo',
      description: 'New todo description',
    });

    expect(todo).toMatchObject({
      id: expect.any(String),
      title: 'New todo',
      description: 'New todo description',
      isCompleted: false,
    });
  });
});
