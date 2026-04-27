import { test, expect } from '@playwright/test';
import { AuthService } from '../framework/services/auth.service.js';
import { UsersService } from '../framework/services/users.service.js';
import { generateUser } from '../framework/fixtures/user.fixture.js';
import { config } from '../framework/config/config.js';

test.describe('DemoQA BookStore API', () => {
  test('Full user lifecycle: register → login → get info → delete', async ({ request }) => {
    const auth = new AuthService(request, config.baseURL);

    // 1. Генерируем пользователя
    const user = generateUser();

    // 2. Регистрируем
    const registerResponse = await auth.register(user.userName, user.password);
    expect(registerResponse.status()).toBe(201);

    const registerBody = await registerResponse.json();
    const userId = registerBody.userID;

    // 3. Генерируем токен
    const tokenResponse = await auth.generateToken(user.userName, user.password);
    expect(tokenResponse.status()).toBe(200);

    const tokenBody = await tokenResponse.json();
    const token = tokenBody.token;

    // 4. Авторизация (проверка)
    const authResponse = await auth.authorize(user.userName, user.password);
    expect(authResponse.status()).toBe(200);

    // 5. Работаем с UsersService
    const users = new UsersService(request, config.baseURL, token);

    // 6. Получаем информацию о пользователе
    const getResponse = await users.getUser(userId);
    expect(getResponse.status()).toBe(200);

    // 7. Удаляем пользователя
    const deleteResponse = await users.deleteUser(userId);
    expect(deleteResponse.status()).toBe(204);
  });
});