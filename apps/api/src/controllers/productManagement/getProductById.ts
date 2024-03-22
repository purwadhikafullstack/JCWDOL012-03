import prisma from '@/prisma';
import { Request, Response } from 'express';

const GetProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getData = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        image: true,
        categories: true,
        store: true,
      },
    });

    if (!getData) {
      return res.status(400).json({
        code: 400,
        message: 'product not found',
      });
    }

    return res.status(200).json({
      code: 200,
      message: 'data successfully retrieved',
      data: getData,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
};

export default GetProductById;
