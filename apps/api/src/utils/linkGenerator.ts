import jwt from 'jsonwebtoken';

export function generateVerificationLink(email: string): string {
  const secretKey = 'freshmart12345678901234567890123';
  const expirationTime = 60 * 60;
  const payload = {
    email: email,
    exp: Math.floor(Date.now() / 1000) + expirationTime,
  };
  const token = jwt.sign(payload, secretKey);
  const verificationLink = `http://localhost:3000/auth/verification?token=${token}`;
  return verificationLink;
}

export function generateResetPasswordLink(email: string): string {
  const secretKey = 'freshmart12345678901234567890123';
  const expirationTime = 60 * 60;
  const payload = {
    email: email,
    exp: Math.floor(Date.now() / 1000) + expirationTime,
  };
  const token = jwt.sign(payload, secretKey);
  const verificationLink = `http://localhost:3000/auth/reset-password?token=${token}`;
  return verificationLink;
}

export function generateEmailLink(newEmail: string, userId: number): string {
  const secretKey = 'freshmart12345678901234567890123';
  const expirationTime = 60 * 60;
  const payload = {
    userId,
    email: newEmail,
    exp: Math.floor(Date.now() / 1000) + expirationTime,
  };
  const token = jwt.sign(payload, secretKey);
  const updateEmailLink = `http://localhost:3000/auth/update-email?token=${token}`;
  return updateEmailLink;
}
