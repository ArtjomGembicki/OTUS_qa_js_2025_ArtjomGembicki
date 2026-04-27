import { test, expect } from '@playwright/test';

const BASE_URL = 'https://bookstore.demoqa.com';

test.describe('Bookstore API tests', () => {

  test('Создание пользователя — ошибка: логин уже используется', async ({ request }) => {
    const username = 'existingUser123';
    const password = 'Qwerty123!';

    // 1. Создаём пользователя первый раз
    await request.post(`${BASE_URL}/Account/v1/User`, {
      data: { userName: username, password }
    });

    // 2. Пытаемся создать того же пользователя второй раз
    const response = await request.post(`${BASE_URL}/Account/v1/User`, {
      data: { userName: username, password }
    });

    expect(response.status()).toBe(406); // Not Acceptable
    const body = await response.json();
    expect(body.message).toContain('User exists!');
  });

  test('Создание пользователя — ошибка: пароль не подходит', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/Account/v1/User`, {
      data: {
        userName: `user_${Date.now()}`,
        password: '123' // слишком слабый пароль
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain('Passwords must have');
  });

  test('Создание пользователя — успешно', async ({ request }) => {
    const username = `user_${Date.now()}`;
    const password = 'Qwerty123!';

    const response = await request.post(`${BASE_URL}/Account/v1/User`, {
      data: { userName: username, password }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();

    expect(body.username).toBe(username);
    expect(body.userID).toBeTruthy();
  });

  test('Генерация токена — ошибка', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/Account/v1/GenerateToken`, {
      data: {
        userName: 'nonexistentUser',
        password: 'WrongPassword123!'
      }
    });

    expect(response.status()).toBe(200); // API всегда возвращает 200
    const body = await response.json();

    expect(body.status).toBe('Failed');
    expect(body.result).toContain('User authorization failed');
  });

  test('Генерация токена — успешно', async ({ request }) => {
    const username = `user_${Date.now()}`;
    const password = 'Qwerty123!';

    // 1. Создаём пользователя
    await request.post(`${BASE_URL}/Account/v1/User`, {
      data: { userName: username, password }
    });

    // 2. Генерируем токен
    const response = await request.post(`${BASE_URL}/Account/v1/GenerateToken`, {
      data: { userName: username, password }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.status).toBe('Success');
    expect(body.token).toBeTruthy();
  });

});
