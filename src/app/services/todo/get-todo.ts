import type { Todo } from '@/app/entities/todo';
import type { TodosRepository } from '@/app/repositories/todo';

export class GetTodoService {
  constructor(private db: TodosRepository) {}

  async execute(id: Todo['id']) {
    return await this.db.getTodoById(id);
  }
}
