export interface TestResponse {
  title: string;
}

export default defineEventHandler<TestResponse>(() => {
  return {
    title: 'Nuxt Template!',
  };
});
