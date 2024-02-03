import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    root: '.',
    environment: 'nuxt',
    exclude: [
      '**/node_modules/**',
      '**/.nuxt/**',
      '**/dist/**',
      './tests/e2e/**',
    ],
  },
});
