import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export const GetAllDiscount = async (req: Request, res: Response) => {
  try {
    // const getCookies = req.cookies['user-token'];
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    // if (!cookiesToDecode || cookiesToDecode.role !== 'superadmin' || cookiesToDecode.role !== "storeadmin") {
    //   return res.status(401).json({
    //     code: 401,
    //     message: "you're not authorized",
    //   });
    // }

    let { page = 1, limit = 5 } = req.query;
    page = typeof page === 'string' ? parseInt(page) : 1;
    limit = typeof limit === 'string' ? parseInt(limit) : 5;

    const offset = (page - 1) * limit;
    const total = await prisma.storeAdmin.count();
    const totalPages = Math.ceil(total / Number(limit));
    const prevPage = page > 1 ? page - 1 : null; //
    const nextPage = page < totalPages ? page + 1 : null;

    const getData = await prisma.discount.findMany({
      skip: offset,
      take: limit,
      include: {
        product: {
          include: {
            store: true,
          },
        },
      },
      where: {
        status: true,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'data successfully retrieved',
      data: getData,
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
      message: 'Internal server error',
    });
  }
};
