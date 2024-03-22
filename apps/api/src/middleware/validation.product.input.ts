import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import prisma from '@/prisma';

const productSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required(),
  storeId: yup.number().required(),
  categoryId: yup.number().required(),
});

export const validateProductInput = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description, price, stock, storeId, categoryId } = req.body;

    await productSchema.validate({
      name,
      description,
      price,
      stock,
      storeId,
      categoryId,
    });

    const storeExists = await prisma.store.findUnique({
      where: { id: parseInt(storeId) || -1 },
    });
    if (!storeExists) {
      throw new Error('Store does not exist');
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) || -1 },
    });
    if (!categoryExists) {
      throw new Error('Category does not exist');
    }

    next();
  } catch (error) {
    console.error('Error validating product input:', error);
    return res.status(400).json({
      code: 400,
      message: 'Invalid product input',
    });
  }
};
