import { z } from 'zod';

import { DeleteTodoService } from '~/app/services/todo/delete-todo';
import { DrizzleDatabase } from '~/infra/database/drizzle';

export default defineEventHandler<Promise<void>>(async (event) => {
  const db = DrizzleDatabase.getInstance();
  const deleteTodoService = new DeleteTodoService(db);

  const { id } = await getValidatedRouterParams(event, (params) => {
    const schema = z.object({
      id: z.string(),
    });

    return schema.parse(params);
  });

  await deleteTodoService.execute(id);
});
