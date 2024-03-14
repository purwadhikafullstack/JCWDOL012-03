import jwt from 'jsonwebtoken';

function generateUpdateEmailLink(newEmail: string, userId: number): string {
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

export default generateUpdateEmailLink;
