import type { TodosRepository } from '@/app/repositories/todo';

export class GetAllTodosService {
  constructor(private db: TodosRepository) {}

  async execute() {
    return await this.db.getAllTodos();
  }
}
