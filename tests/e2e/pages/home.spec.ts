import { expect, test } from '..';

test('Home title', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const heading = page.getByRole('heading', { name: 'Nuxt Todo List' });

  expect(await heading.isVisible()).toBeTruthy();
});

test('Todo table', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const todos = page.getByTestId('todo');

  expect(await todos.count()).toBe(3);

  const buyMilkTodo = todos.filter({
    hasText: 'Buy some milk',
  });

  expect(await buyMilkTodo.textContent()).toContain(
    'Remember to check the expiration date',
  );
});
