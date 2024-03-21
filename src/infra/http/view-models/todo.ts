import { z } from 'zod';

import { type Todo } from '@/app/entities/todo';

export const todoViewModelSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(255),
  description: z.string().max(255).optional(),
  isCompleted: z.boolean(),
  completedAt: z.string().optional(),
});
export type TodoHTTP = z.infer<typeof todoViewModelSchema>;

export class TodoViewModel {
  static toHTTP(todo: Todo): TodoHTTP {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
      completedAt: todo.completedAt?.toISOString(),
    };
  }
}
