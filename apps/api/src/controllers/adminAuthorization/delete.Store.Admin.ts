import prisma from '@/prisma';
import { Request, Response } from 'express';

export const DeleteStoreAdmin = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
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
