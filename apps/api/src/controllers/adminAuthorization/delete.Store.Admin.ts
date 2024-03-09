import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export interface jwtPayload {
  id: number;
  role: string;
}

export const DeleteStoreAdmin = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
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

    await prisma.storeAdmin.delete({
      where: {
        userId: parseInt(userId),
      },
    });

    await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'successfully delete user',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};
