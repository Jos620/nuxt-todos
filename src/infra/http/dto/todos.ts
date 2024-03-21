import { z } from 'zod';

import { todoViewModelSchema } from '../view-models/todo';

export const createTodoDTO = z.object({
  title: z.string({ required_error: 'Title is required!' }).max(255),
  description: z
    .string()
    .max(255, 'Description must be at most 255 characters long!')
    .optional(),
});

export const findTodoDTO = z.object({
  id: z.string().uuid(),
});

export const singleTodoResponseSchema = z.object({
  todo: todoViewModelSchema.optional(),
});

export const multipleTodosResponseSchema = z.object({
  todos: z.array(todoViewModelSchema),
});

export type SingleTodoResponse = z.infer<typeof singleTodoResponseSchema>;
export type MultipleTodosResponse = z.infer<typeof multipleTodosResponseSchema>;
