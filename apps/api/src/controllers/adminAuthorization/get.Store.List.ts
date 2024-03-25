import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export interface jwtPayload {
  id: number;
  role: string;
}

export const getStoreList = async (req: Request, res: Response) => {
  try {
    // validasi superadmin
    const getCookies = req.cookies['user-token'];
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);

    if (!cookiesToDecode) {
      return res.status(401).json({
        code: 401,
        message: "you're not authorized",
      });
    }

    const storeListData = await prisma.store.findMany({
      include: {
        location: true,
        admins: {
          include: {
            user: true,
          },
        },
        products: true,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'data succesfully retrieved',
      data: storeListData,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};
