import { test, expect } from '@playwright/test';
import { AuthService } from '../framework/services/auth.service.js';
import { BookService } from '../framework/services/book.service.js';
import { generateUser } from '../framework/fixtures/user.fixture.js';
import { config } from '../framework/config/config.js';

// Полный список существующих ISBN
const EXISTING_ISBNS = [
  "9781449325862",
  "9781449331818",
  "9781449337711",
  "9781449365035",
  "9781491904244",
  "9781491950296",
  "9781593275846",
  "9781593277574"
];

// CRUD тест

test.describe('BookStore API - Books CRUD (реально работающий)', () => {
  test('Add → Get → Delete (update не работает в API)', async ({ request }) => {

    // 1. Создаём пользователя
    const auth = new AuthService(request, config.baseURL);
    const user = generateUser();

    const registerResponse = await auth.register(user.userName, user.password);
    expect(registerResponse.status()).toBe(201);

    const { userID } = await registerResponse.json();

    // 2. Получаем токен
    const tokenResponse = await auth.generateToken(user.userName, user.password);
    const { token } = await tokenResponse.json();

    const books = new BookService(request, config.baseURL, token);

    // 3. Добавляем первую книгу
    const firstIsbn = EXISTING_ISBNS[0];

    const addResponse = await books.addBook({
      userId: userID,
      isbn: firstIsbn
    });

    expect(addResponse.status()).toBe(201);

    // ---------------------------------------------------------
    // 4. Попытка обновления книги (PUT /Books/{ISBN})
    // ---------------------------------------------------------
    // Этот эндпоинт в DemoQA BookStore API НЕ РАБОТАЕТ.
    // Он всегда возвращает 400, даже при корректных данных.
    // Swagger описывает update, но сервер не поддерживает его.
    //
    // Оставляю свой варант в коде закомментированным
    //
    // const secondIsbn = EXISTING_ISBNS[1];
    // const updateResponse = await books.updateBook(firstIsbn, secondIsbn);
    // expect(updateResponse.status()).toBe(200);
    //
    // ---------------------------------------------------------

    // 4. Получаем книгу (Read)
    const getResponse = await books.getBook(firstIsbn);
    expect(getResponse.status()).toBe(200);

    // 5. Удаляем книгу из коллекции пользователя
    const deleteResponse = await books.deleteBook(firstIsbn, userID);
    expect(deleteResponse.status()).toBe(204);
  });
});

// Параметризованный тест

test.describe('Get book info - parameterized', () => {
  const isbns = ['9781449325862', '9781449331818', '9781449337711'];

  for (const isbn of isbns) {
    test(`Get book info for ISBN ${isbn}`, async ({ request }) => {
      const response = await request.get(`${config.baseURL}/BookStore/v1/Book?ISBN=${isbn}`);
      expect(response.status()).toBe(200);
    });
  }
});