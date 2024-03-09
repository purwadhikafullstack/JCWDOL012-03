import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

// Middleware untuk validasi input name, email, password, dan phone
export const validateStoreAdminInput = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      phone: yup.string().required(),
    });

    await schema.validate(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json({
      code: 400,
      error: error.message,
    });
  }
};
