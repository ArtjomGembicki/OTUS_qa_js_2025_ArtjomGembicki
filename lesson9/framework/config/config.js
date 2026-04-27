import dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL,
  userName: process.env.USER_NAME,
  password: process.env.PASSWORD,
};