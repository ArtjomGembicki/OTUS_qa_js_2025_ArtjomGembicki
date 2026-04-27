import dotenv from 'dotenv';
dotenv.config();

export interface Config {
  baseURL: string | undefined;
  userName: string | undefined;
  password: string | undefined;
}

export const config: Config = {
  baseURL: process.env.BASE_URL,
  userName: process.env.USER_NAME,
  password: process.env.PASSWORD,
};