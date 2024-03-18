import { DeleteTodoService } from '~/app/services/todo/delete-todo';
import { DrizzleDatabase } from '~/infra/database/drizzle';
import { findTodoDTO } from '~/infra/http/dto/todos';

export default defineEventHandler<Promise<void>>(async (event) => {
  const db = DrizzleDatabase.getInstance();
  const deleteTodoService = new DeleteTodoService(db);

  const { id } = await getValidatedRouterParams(event, (params) => {
    return findTodoDTO.parse(params);
  });

  await deleteTodoService.execute(id);
});
