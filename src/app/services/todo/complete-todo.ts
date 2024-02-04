import type { Todo } from '@/app/entities/todo';
import { TodoError } from '@/app/errors/todo';
import type { TodosRepository } from '@/app/repositories/todo';

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
