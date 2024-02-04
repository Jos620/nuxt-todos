import type { Todo } from '../entities/todo';
import { TodoError } from '../errors/todo';
import type { TodosRepository } from '../repositories/todo';

export class CompleteTodoService {
  constructor(private db: TodosRepository) {}

  async execute(id: Todo['id']) {
    const todo = await this.db.getTodoById(id);
    if (!todo) throw TodoError.notFound();

    todo.toggle();

    await this.db.updateTodo(todo);

    return todo;
  }
}
