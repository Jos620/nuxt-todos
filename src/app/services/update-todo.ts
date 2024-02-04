import { Todo } from '../entities/todo';
import { TodoError } from '../errors/todo';
import type { TodosRepository } from '../repositories/todo';

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
