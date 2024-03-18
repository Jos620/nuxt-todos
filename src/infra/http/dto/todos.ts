import { z } from 'zod';

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
