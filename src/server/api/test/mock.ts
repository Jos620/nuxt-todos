import { http, HttpResponse } from 'msw';

import type { TestResponse } from '.';

export const apiTestMock = http.get('/api/test', () => {
  return HttpResponse.json<TestResponse>({
    title: 'Mocked title',
  });
});
