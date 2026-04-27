export class AuthService {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async register(userName, password) {
    return this.request.post(`${this.baseURL}/Account/v1/User`, {
      data: { userName, password },
    });
  }

  async generateToken(userName, password) {
    return this.request.post(`${this.baseURL}/Account/v1/GenerateToken`, {
      data: { userName, password },
    });
  }

  async authorize(userName, password) {
    return this.request.post(`${this.baseURL}/Account/v1/Authorized`, {
      data: { userName, password },
    });
  }
}