import { Todo, type TodoProps } from '@/app/entities/todo';
import type { TodosRepository } from '@/app/repositories/todo';

export class CreateTodoService {
  constructor(private db: TodosRepository) {}

  async execute(props: TodoProps) {
    const todo = new Todo(props);

    await this.db.createTodo(todo);

    return todo;
  }
}
