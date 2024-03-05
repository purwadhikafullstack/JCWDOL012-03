import jwt from 'jsonwebtoken';

function generateVerificationLink(email: string): string {
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

export default generateVerificationLink;
