import { defineConfig } from 'drizzle-kit';

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error('DATABASE_URL and DATABASE_AUTH_TOKEN are required');
}

export default defineConfig({
  schema: './src/infra/database/drizzle/schema.ts',
  driver: 'turso',
  dbCredentials: {
    url,
    authToken,
  },
});
