import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@/config';

export const generateToken = (user: any): string => {
  const { id, name, email, role } = user;
  return sign(
    {
      name,
      id,
      email,
      role,
    },
    JWT_SECRET,
  );
};

export const verifyToken = (
  token: string,
): { isValid: boolean; data?: any } => {
  try {
    const verifiedToken = verify(token, JWT_SECRET);
    return {
      isValid: true,
      data: verifiedToken,
    };
  } catch {
    return { isValid: false };
  }
};
