import type { Todo } from '../entities/todo';
import type { TodosRepository } from '../repositories/todo';

export class DeleteTodoService {
  constructor(private db: TodosRepository) {}

  async execute(id: Todo['id']) {
    await this.db.deleteTodoById(id);
  }
}
