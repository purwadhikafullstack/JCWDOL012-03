import { jwtDecode } from 'jwt-decode';
import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import ErrorHandler from '@/utils/errorHandler';

export interface updateProfilePayload {
  name?: string;
  username?: string;
  phone?: string;
}

export interface jwtPayload {
  id: number;
}

export const updateProfileUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, username, phone }: updateProfilePayload = req.body;
    const getCookies = req.cookies['user-token'];
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    const parsedId = Number(cookiesToDecode.id);

    const userWithId = await prisma.user.findFirst({
      where: {
        id: parsedId,
      },
    });

    if (!userWithId) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: `User with id ${parsedId} not found`,
      });
    }

    const userUpdate = await prisma.user.update({
      where: {
        id: parsedId,
      },
      data: {
        name,
        username,
        phone,
      },
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: `User with id ${parsedId} updated successfully`,
      data: userUpdate,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};
