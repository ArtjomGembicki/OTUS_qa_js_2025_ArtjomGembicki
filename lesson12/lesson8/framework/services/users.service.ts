import { APIRequestContext, APIResponse } from '@playwright/test';

export class UsersService {
  private request: APIRequestContext;
  private baseURL: string;
  private token: string;

  constructor(request: APIRequestContext, baseURL: string, token: string) {
    this.request = request;
    this.baseURL = baseURL;
    this.token = token;
  }

  async getUser(userId: string): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}/Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async deleteUser(userId: string): Promise<APIResponse> {
    return this.request.delete(`${this.baseURL}/Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}