import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

const GetAllProduct = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.body;

    let { page = 1, limit = 6 } = req.query;
    page = typeof page === 'string' ? parseInt(page) : 1;
    limit = typeof limit === 'string' ? parseInt(limit) : 6;

    const offset = (page - 1) * limit;
    const total = await prisma.product.count();
    const totalPages = Math.ceil(total / Number(limit));
    const prevPage = page > 1 ? page - 1 : null; //
    const nextPage = page < totalPages ? page + 1 : null;

    const allData = await prisma.product.findMany({
      skip: offset,
      take: limit,
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
      pagination: {
        currentPage: page,
        prevPage,
        nextPage,
        totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export default GetAllProduct;
