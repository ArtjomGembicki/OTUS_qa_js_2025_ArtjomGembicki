import { test, expect } from '@playwright/test';

test.describe('UI tests for lesson21', () => {


  // 1. Проверка отображения формы логина
  // Ожидаемый результат: поля Email, Password и кнопка Sign in видимы

  test('Login form is visible', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });


// 2. Кнопка Sign in неактивна при пустых полях
// Ожидаемый результат: кнопка имеет атрибут disabled

  test('Sign in button is disabled when fields are empty', async ({ page }) => {
    await page.goto('/login');
    const signInButton = page.locator('button[type="submit"]');
    await expect(signInButton).toBeDisabled();
    });


// 3. Ошибка при логине с неверными данными
// Ожидаемый результат: отображается сообщение "credentials invalid"

  test('Login fails with invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[placeholder="Email"]').fill('wrong@user.com');
    await page.locator('input[type="password"]').fill('wrongpassword');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('li', { hasText: 'credentials invalid' })).toBeVisible();
    });


  // 4. Переход на страницу регистрации
  // Ожидаемый результат: открывается URL /register

  test('Navigate to register page', async ({ page }) => {
    await page.goto('/login');
    await page.locator('a', { hasText: 'Sign up' }).click();
    await expect(page).toHaveURL(/.*register/);
  });

  // 5. Проверка отображения списка статей на главной
// Ожидаемый результат: 
// - есть хотя бы одна статья
// - у статьи есть заголовок
// - у статьи есть ссылка
 
  test('Articles list is visible', async ({ page }) => {
    await page.goto('/');
    const articles = page.locator('.article-preview');
    const count = await articles.count();
    expect(count).toBeGreaterThan(0);
    await expect(articles.first().locator('h1')).toBeVisible();
    await expect(articles.first().locator('a.preview-link')).toBeVisible();
  });

});