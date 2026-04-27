import { APIRequestContext, APIResponse } from '@playwright/test';

export class AuthService {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async register(userName: string, password: string): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}/Account/v1/User`, {
      data: { userName, password },
    });
  }

  async generateToken(userName: string, password: string): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}/Account/v1/GenerateToken`, {
      data: { userName, password },
    });
  }

  async authorize(userName: string, password: string): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}/Account/v1/Authorized`, {
      data: { userName, password },
    });
  }
}