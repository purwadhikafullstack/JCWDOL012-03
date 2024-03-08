import { Request, Response } from 'express';
import prisma from '@/prisma';

const GetProductCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getDataById = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      code: 200,
      data: getDataById,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export default GetProductCategoryById;
