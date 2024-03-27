import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export interface jwtPayload {
  id: number;
  role: string;
}

const GetStoreAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //cek role dari cookies
    //validasi superadmin
    const getCookies = req.cookies['user-token'];
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);

    if (!cookiesToDecode) {
      return res.status(401).json({
        code: 401,
        message: "you're not authorized",
      });
    }

    const getDataById = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        StoreAdmin: true,
      },
    });

    if (!getDataById) {
      return res.status(404).json({
        code: 404,
        message: 'data not found',
      });
    }

    return res.status(200).json({
      code: 200,
      message: 'data succesfully retrieved',
      data: getDataById,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export default GetStoreAdminById;
