import { todoPageURLRegex } from '../../utils/regex';
import { expect, test } from '..';

test('Todo creation form fields', async ({ page }) => {
  await page.goto('/todo/create', { waitUntil: 'networkidle' });

  expect(await page.isVisible('input[name="title"]')).toBeTruthy();
  expect(await page.isVisible('textarea[name="description"]')).toBeTruthy();
});

test('Todo creation', async ({ page }) => {
  await page.goto('/todo/create');

  await page.fill('input[name="title"]', 'My new todo');
  await page.fill('textarea[name="description"]', 'This is my new todo');

  await page.click('button[type="submit"]');

  await page.waitForURL(todoPageURLRegex, {
    timeout: 5000,
  });

  expect(await page.isVisible('h2:has-text("My new todo")')).toBeTruthy();
  expect(
    await page.isVisible('p:has-text("This is my new todo")'),
  ).toBeTruthy();
});
