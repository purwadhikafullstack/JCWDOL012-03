import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

const GetAllProduct = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.body;
    const allData = await prisma.product.findMany({
      where: {
        storeId: storeId ? storeId : 1,
      },
      include: {
        image: true,
        store: true,
        categories: true,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'data successfully retrieved',
      data: allData,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export default GetAllProduct;
