import { Request, Response } from 'express';
import prisma from '@/prisma';

const GetProductCategory = async (req: Request, res: Response) => {
  try {
    const getCategory = await prisma.category.findMany({
      include: {
        products: true,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'data retrieved',
      data: getCategory,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export default GetProductCategory;
