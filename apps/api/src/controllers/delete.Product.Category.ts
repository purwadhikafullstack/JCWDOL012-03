import { Request, Response } from 'express';
import prisma from '@/prisma';

const DeleteProductCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'category successfully deleted',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export default DeleteProductCategory;
