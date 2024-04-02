import { beforeEach, describe, expect, it } from 'vitest';

import type { TodosRepository } from '@/app/repositories/todo';

import { InMemoryDatabase } from '../../../../tests/database/in-memory-database';
import { CreateTodoService } from './create-todo';
import { GetTodoService } from './get-todo';
import { UpdateTodoService } from './update-todo';

let db: TodosRepository;
let createTodoService: CreateTodoService;
let getTodoService: GetTodoService;
let updateTodosService: UpdateTodoService;

describe('get-todo', () => {
  beforeEach(() => {
    db = new InMemoryDatabase();
    createTodoService = new CreateTodoService(db);
    getTodoService = new GetTodoService(db);
    updateTodosService = new UpdateTodoService(db);
  });

  it('should update a todo', async () => {
    const todo = await createTodoService.execute({
      title: 'New todo',
    });

    const updatedTodo = await updateTodosService.execute(todo.id, {
      title: 'Updated todo',
    });
    expect(updatedTodo.title).toBe('Updated todo');

    const foundTodo = await getTodoService.execute(todo.id);
    expect(foundTodo).not.toBeNull();
    expect(foundTodo?.title).toBe('Updated todo');
  });
});
