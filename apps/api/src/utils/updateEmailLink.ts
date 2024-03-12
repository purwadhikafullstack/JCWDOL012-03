import jwt from 'jsonwebtoken';

export const generateToken = (payload: { userId: number; email: string }): string => {
  const { userId, email } = payload;
  const secretKey = 'freshmart12345678901234567890123';
  const expiresIn = '1d';
  const token = jwt.sign({ userId, email }, secretKey, { expiresIn });
  return token;
};