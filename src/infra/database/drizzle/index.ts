import { createClient } from '@libsql/client';
import { eq } from 'drizzle-orm';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';

import type { Todo } from '@/app/entities/todo';
import { TodoError } from '@/app/errors/todo';
import type { TodosRepository } from '@/app/repositories/todo';

import { DrizzleTodosMapper } from './mappers/todos';
import { todosTable } from './schema';

export class DrizzleDatabase implements TodosRepository {
  /* eslint-disable no-use-before-define */
  private static instance: DrizzleDatabase;

  static getInstance() {
    if (!DrizzleDatabase.instance) {
      DrizzleDatabase.instance = new DrizzleDatabase();
    }
    return DrizzleDatabase.instance;
  }

  private readonly db: LibSQLDatabase;

  private constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    const databaseAuthToken = process.env.DATABASE_AUTH_TOKEN;
    if (!databaseUrl || !databaseAuthToken) {
      throw new Error('Database URL and Auth Token must be provided');
    }

    const client = createClient({
      url: databaseUrl,
      authToken: databaseAuthToken,
    });

    this.db = drizzle(client);
  }

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.db.select().from(todosTable).all();
    return todos.map(DrizzleTodosMapper.toDomain);
  }

  async getTodoById(id: string): Promise<Todo | undefined> {
    const [todo] = await this.db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, id));

    if (!todo) {
      throw TodoError.notFound();
    }

    return DrizzleTodosMapper.toDomain(todo);
  }

  async createTodo(todo: Todo): Promise<void> {
    await this.db
      .insert(todosTable)
      .values(DrizzleTodosMapper.toPersistence(todo))
      .execute();
  }

  async updateTodo(todo: Todo): Promise<void> {
    await this.db
      .update(todosTable)
      .set(DrizzleTodosMapper.toPersistence(todo))
      .where(eq(todosTable.id, todo.id))
      .execute();
  }

  async deleteTodoById(id: string): Promise<void> {
    await this.db.delete(todosTable).where(eq(todosTable.id, id)).execute();
  }
}
