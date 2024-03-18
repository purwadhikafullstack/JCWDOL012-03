import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import prisma from '@/prisma';

const productSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
});

export const validateProductUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description, price } = req.body;

    await productSchema.validate({
      name,
      description,
      price,
    });

    next();
  } catch (error) {
    console.error('Error validating product input:', error);
    return res.status(400).json({
      code: 400,
      message: 'Invalid product input',
    });
  }
};
