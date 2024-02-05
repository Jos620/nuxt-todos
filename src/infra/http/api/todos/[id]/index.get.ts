import { z } from 'zod';

import { GetTodoService } from '~/app/services/todo/get-todo';
import { DrizzleDatabase } from '~/infra/database/drizzle';
import { TodoHTTP, TodoViewModel } from '~/infra/http/view-models/todo';

export interface TodoIdResponse {
  todo?: TodoHTTP;
}

export default defineEventHandler<Promise<TodoIdResponse>>(async (event) => {
  const db = DrizzleDatabase.getInstance();
  const getTodoService = new GetTodoService(db);

  const { id } = await getValidatedRouterParams(event, (params) => {
    const schema = z.object({
      id: z.string(),
    });

    return schema.parse(params);
  });

  const todo = await getTodoService.execute(id);

  if (!todo) {
    throw new Error('Todo not found');
  }

  return {
    todo: TodoViewModel.toHTTP(todo),
  };
});
