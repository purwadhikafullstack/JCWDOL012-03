import jwt, { JwtPayload } from 'jsonwebtoken';

export function getEmailFromToken(token: string): string {
  const secretKey = 'freshmart12345678901234567890123';

  try {
    const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

    console.log('Decoded token:', decodedToken);
    const email = decodedToken.email;

    return email;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
}