import { randomUUID } from 'node:crypto';

import { z } from 'zod';

export interface TodoProps {
  title: string;
  description?: string;
  completedAt?: Date;
}

export class Todo {
  readonly id: string;
  props: TodoProps;

  constructor(props: TodoProps, id?: string) {
    this.props = props;
    this.id = id || randomUUID();
  }

  get title() {
    return this.props.title;
  }

  set title(title: TodoProps['title']) {
    this.props.title = title;
  }

  get description() {
    return this.props.description;
  }

  set description(description: TodoProps['description']) {
    this.props.description = description;
  }

  get completedAt() {
    return this.props.completedAt;
  }

  get isCompleted() {
    return !!this.props.completedAt;
  }

  toggle() {
    this.props.completedAt = this.props.completedAt ? undefined : new Date();
  }
}

export const todoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(255),
  description: z.string().max(255).optional(),
  isCompleted: z.boolean(),
  completedAt: z.date().optional(),
});
