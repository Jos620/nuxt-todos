import type { Todo } from '@/app/entities/todo';
import type { TodosRepository } from '@/app/repositories/todo';

export class DeleteTodoService {
  constructor(private db: TodosRepository) {}

  async execute(id: Todo['id']) {
    await this.db.deleteTodoById(id);
  }
}
