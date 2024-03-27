import { Request, Response } from 'express';
import prisma from '@/prisma';
import { jwtDecode } from 'jwt-decode';

// http://localhost:9296/api/productSearch/search?query=${string} ini untuk di frontend

export interface jwtPayload {
  id: number;
  role: string;
}
const SearchProduct = async (req: Request, res: Response) => {
  try {
    // const getCookies = req.cookies['user-token'];
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);

    // if (!cookiesToDecode) {
    //   return res.status(401).json({
    //     code: 401,
    //     message: "you're not authorized",
    //   });
    // }

    const { id } = req.params;
    const queryParam = req.query.query;
    const query =
      typeof queryParam === 'string' ? queryParam : queryParam?.toString();

    if (query === '') {
      return res.status(200).json({
        code: 200,
        status: 'empty',
        message: 'type the product name...',
      });
    }
    const products = await prisma.product.findMany({
      where: {
        storeId: parseInt(id),
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
      include: {
        image: true,
        store: true,
        categories: true,
      },

    });

    if (products.length === 0) {
      return res.status(200).json({
        code: 200,
        status: 'zero',
        message: "we don't have the product you are looking for",
      });
    }
    res.status(200).json({
      code: 200,
      message: 'success',
      data: products,
      hu: products.length,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export default SearchProduct;
