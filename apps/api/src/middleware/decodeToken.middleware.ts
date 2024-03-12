import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(403).json({
      code: 403,
      message: 'Unauthorized: Token is missing',
    });
  }

  const userToken = authToken.split(' ')[1];

  try {
    const decodedToken = verifyToken(userToken);

    if (!decodedToken.isValid) {
      return res.status(403).json({
        code: 403,
        message: 'Unauthorized: Invalid Token',
      });
    }

    // Tambahkan properti 'user' ke dalam objek 'Request'
    (req as any).user = decodedToken.data;

    next();
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
};