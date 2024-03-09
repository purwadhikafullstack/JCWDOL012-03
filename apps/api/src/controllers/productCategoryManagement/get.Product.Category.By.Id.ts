import { Request, Response } from 'express';
import prisma from '@/prisma';
import { jwtDecode } from 'jwt-decode';

export interface jwtPayload {
  id: number;
  role: string;
}

const GetProductCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const getCookies = req.cookies['user-token'];
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);

    if (!cookiesToDecode) {
      return res.status(401).json({
        code: 401,
        message: "you're not authorized",
      });
    }

    const getDataById = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      code: 200,
      data: getDataById,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export default GetProductCategoryById;
