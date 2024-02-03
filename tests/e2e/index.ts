import { test as base } from '@playwright/test';
import { http } from 'msw';
import { createWorkerFixture, type MockServiceWorker } from 'playwright-msw';

import handlers from '../mocks/handlers';
export { expect } from '@playwright/test';

export const test = base.extend<{
  msw: MockServiceWorker;
  http: typeof http;
}>({
  msw: createWorkerFixture(handlers),
  http,
});
