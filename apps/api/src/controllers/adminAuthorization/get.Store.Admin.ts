import prisma from '@/prisma';
import { Request, Response } from 'express';

export const GetStoreAdmin = async (req: Request, res: Response) => {
  try {
    //cek role dari cookies
    //validasi superadmin
    // const getCookies = req.cookies.SuperAdminCookie;
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    // const idSuperAdmin = cookiesToDecode.role;

    // if (idSuperAdmin.role !== 'superadmin') {
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

    const storeAdminData = await prisma.user.findMany({
      skip: offset,
      take: limit,
      include: {
        storeAdmin: {
          include: {
            store: true,
          },
        },
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'data succesfully retrieved',
      data: storeAdminData,
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
