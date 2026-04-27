export function generateUser() {
  const random = Math.floor(Math.random() * 100000);
  return {
    userName: `user_${random}`,
    password: `Password!${random}`,
  };
}