import type { Todo } from '../entities/todo';
import type { TodosRepository } from '../repositories/todo';

export class GetTodoService {
  constructor(private db: TodosRepository) {}

  async execute(id: Todo['id']) {
    return await this.db.getTodoById(id);
  }
}
