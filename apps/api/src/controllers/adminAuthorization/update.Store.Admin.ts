import prisma from '@/prisma';
import { Request, Response } from 'express';

const UpdateStoreAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, storeId } = req.body;
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

    await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        phone,
      },
    });

    if (storeId) {
      await prisma.storeAdmin.update({
        where: {
          userId: parseInt(id),
        },
        data: {
          store: {
            connect: {
              id: parseInt(storeId),
            },
          },
        },
      });
    }

    return res.status(200).json({
      code: 200,
      message: 'Store Admin Succesfully Updated',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export default UpdateStoreAdmin;
