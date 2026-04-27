export class BookService {
  constructor(request, baseURL, token) {
    this.request = request;
    this.baseURL = baseURL;
    this.token = token;
  }

  async addBook(book) {
    return this.request.post(`${this.baseURL}/BookStore/v1/Books`, {
      data: {
        userId: book.userId,
        collectionOfIsbns: [{ isbn: book.isbn }]
      },
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async updateBook(isbn, newIsbn) {
    return this.request.put(`${this.baseURL}/BookStore/v1/Books/${isbn}`, {
      data: { isbn: newIsbn },
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async getBook(isbn) {
    return this.request.get(`${this.baseURL}/BookStore/v1/Book?ISBN=${isbn}`);
  }

  async deleteBook(isbn, userId) {
    return this.request.delete(`${this.baseURL}/BookStore/v1/Book`, {
      data: { isbn, userId },
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}