import { z } from 'zod';

export const bodySchema = z.object({
  title: z.string({ description: 'Required' }).max(255),
  description: z.string().max(255).optional(),
});

export const idRouteParamsSchema = z.object({
  id: z.string().uuid(),
});
