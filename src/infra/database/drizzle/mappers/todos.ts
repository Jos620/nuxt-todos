import { Todo } from '@/app/entities/todo';

import type { DrizzleTodo } from '../schema';

export class DrizzleTodosMapper {
  static toDomain(todo: DrizzleTodo): Todo {
    return new Todo(
      {
        title: todo.title,
        description: todo.description || undefined,
        completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
      },
      todo.id,
    );
  }

  static toPersistence(todo: Todo): DrizzleTodo {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description || null,
      completedAt: todo.completedAt || null,
    };
  }
}
