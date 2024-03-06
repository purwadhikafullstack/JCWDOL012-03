import { Request, Response } from 'express';
import prisma from '@/prisma';

const CreateProductCategory = async (req: Request, res: Response) => {
  try {
    const { categoryInput } = req.body;

    const createCategory = await prisma.category.create({
      data: {
        name: categoryInput,
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
