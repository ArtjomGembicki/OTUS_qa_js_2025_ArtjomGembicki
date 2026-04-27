import { APIRequestContext, APIResponse } from '@playwright/test';

export interface AddBookPayload {
  userId: string;
  isbn: string;
}

export class BookService {
  private request: APIRequestContext;
  private baseURL: string;
  private token: string;

  constructor(request: APIRequestContext, baseURL: string, token: string) {
    this.request = request;
    this.baseURL = baseURL;
    this.token = token;
  }

  async addBook(book: AddBookPayload): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}/BookStore/v1/Books`, {
      data: {
        userId: book.userId,
        collectionOfIsbns: [{ isbn: book.isbn }],
      },
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async updateBook(isbn: string, newIsbn: string): Promise<APIResponse> {
    return this.request.put(`${this.baseURL}/BookStore/v1/Books/${isbn}`, {
      data: { isbn: newIsbn },
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async getBook(isbn: string): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}/BookStore/v1/Book?ISBN=${isbn}`);
  }

  async deleteBook(isbn: string, userId: string): Promise<APIResponse> {
    return this.request.delete(`${this.baseURL}/BookStore/v1/Book`, {
      data: { isbn, userId },
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}