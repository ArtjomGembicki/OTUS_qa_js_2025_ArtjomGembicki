export class UsersService {
  constructor(request, baseURL, token) {
    this.request = request;
    this.baseURL = baseURL;
    this.token = token;
  }

  async getUser(userId) {
    return this.request.get(`${this.baseURL}/Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async deleteUser(userId) {
    return this.request.delete(`${this.baseURL}/Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}