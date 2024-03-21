import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export const DeleteDiscountById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const getCookies = req.cookies['user-token'];
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    // if (!cookiesToDecode || cookiesToDecode.role !== 'superadmin' || cookiesToDecode.role !== "storeadmin") {
    //   return res.status(401).json({
    //     code: 401,
    //     message: "you're not authorized",
    //   });
    // }
    await prisma.discount.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: false,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'discount successfully deleted',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
};
