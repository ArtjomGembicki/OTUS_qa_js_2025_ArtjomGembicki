import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { InventoryPage } from './pages/InventoryPage.js';

const BASE_URL = 'https://www.saucedemo.com';

test.describe('UI tests for lesson22 (SauceDemo)', () => {
  
   // Тест: Успешный логи
   // Описание: Проверяет, что пользователь с валидными данными может войти в систему.
   // Ожидаемый результат: После логина происходит переход на страницу /inventory.

  test('Successful login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto(BASE_URL);
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

    // Тест: Ошибка при логине с неверными кредами
    // Описание: Проверяет, что система отображает ошибку при вводе неверных логина и пароля.
    // Ожидаемый результат: Появляется сообщение об ошибке (errorMessage visible).

  test('Login fails with invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto(BASE_URL);
    await login.login('wrong_user', 'wrong_pass');
    await expect(login.errorMessage).toBeVisible();
  });

    // Тест: Проверка логина заблокированным пользователем 
    // Описание: Проверяет, что заблокированный пользователь не может войти.
    // Ожидаемый результат: Появляется сообщение об ошибке (errorMessage visible).

  test('Locked out user cannot login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto(BASE_URL);
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.errorMessage).toBeVisible();
  });

    // Тест: Проверка товаров на странице после логина
    // Описание: Проверяет, что после успешного логина отображается список товаров.
    // Ожидаемый результат: Количество товаров на странице больше 0.

  test('Inventory list is visible', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto(BASE_URL);
    await login.login('standard_user', 'secret_sauce');

    const count = await inventory.items.count();
    expect(count).toBeGreaterThan(0);
  });

    // Тест: Проверка добавления товара в корзину
    // Описание: Проверяет, что пользователь может добавить товар в корзину.
    // Ожидаемый результат: Значок корзины отображает число "1".

  test('Add item to cart', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto(BASE_URL);
    await login.login('standard_user', 'secret_sauce');

    await inventory.addFirstItemToCart();
    await expect(inventory.cartBadge).toHaveText('1');
  });

});