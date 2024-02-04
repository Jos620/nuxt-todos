import { Todo } from '@/app/entities/todo';
import { TodoError } from '@/app/errors/todo';
import type { TodosRepository } from '@/app/repositories/todo';

export class UpdateTodoService {
  constructor(private db: TodosRepository) {}

  async execute(id: Todo['id'], overrides: Partial<Todo> = {}) {
    const todo = await this.db.getTodoById(id);
    if (!todo) throw TodoError.notFound();

    const newTodo = new Todo({
      ...todo.props,
      ...overrides,
    });

    await this.db.updateTodo(newTodo);

    return newTodo;
  }
}
