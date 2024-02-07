import type { Todo } from '@/app/entities/todo';

export class TodoViewModel {
  static toHTTP(todo: Todo) {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
      completedAt: todo.completedAt?.toString(),
    };
  }
}

export type TodoHTTP = ReturnType<typeof TodoViewModel.toHTTP>;
