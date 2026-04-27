export interface UserData {
  userName: string;
  password: string;
}

export function generateUser(): UserData {
  const random = Math.floor(Math.random() * 100000);

  return {
    userName: `user_${random}`,
    password: `Password!${random}`,
  };
}