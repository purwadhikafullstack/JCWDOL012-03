import { Request, Response } from 'express';
import prisma from '@/prisma';

const UpdateProductCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    return res.status(200).json({
      code: 200,
      message: 'category succesfully updated',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export default UpdateProductCategory;
