import { Request, Response } from 'express';
import prisma from '@/prisma';

const CreateProductCategory = async (req: Request, res: Response) => {
  try {
    const { categoryInput } = req.body;
    const existingCategory = await prisma.category.findMany();

    return res.status(200).json({
      code: 200,
      data: existingCategory,
    });
  } catch (error) {}
};

export default CreateProductCategory;
