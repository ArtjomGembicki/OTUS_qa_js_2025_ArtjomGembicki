import dotenv from 'dotenv';
dotenv.config();

export interface Config {
  baseURL: string | undefined;
}

export const config: Config = {
  baseURL: process.env.BASE_URL,
};