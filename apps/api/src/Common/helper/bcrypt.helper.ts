import { hashSync, compareSync } from 'bcryptjs';

export const hash = (password: string): string => {
  return hashSync(password, 8);
};

export const compare = (password: string, hashedPassword: string): boolean => {
  return compareSync(password, hashedPassword);
};
