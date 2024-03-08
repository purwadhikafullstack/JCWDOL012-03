import { Request, Response } from 'express';
import prisma from '@/prisma';

const CreateProductCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const existingCategory = await prisma.category.findMany({
      where: {
        name,
      },
    });

    if (existingCategory.length > 0) {
      return res.status(400).json({
        code: 400,
        message: 'Category with this name already exists',
      });
    }

    const createCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'category succesfully created',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export default CreateProductCategory;
