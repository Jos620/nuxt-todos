import type { InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todosTable = sqliteTable('todos', {
  id: text('id').unique().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
});

export type DrizzleTodo = InferSelectModel<typeof todosTable>;
