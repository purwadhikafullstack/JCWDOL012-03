import { jwtDecode } from 'jwt-decode';
import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import ErrorHandler from '@/utils/errorHandler';
import { compare, hash } from '@/utils/bcrypt';

export interface updatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface jwtPayload {
  id: number;
}

export const updatePasswordUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { oldPassword, newPassword }: updatePasswordPayload = req.body;
    const getCookies = req.cookies['user-token'];
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    const parsedId = Number(cookiesToDecode.id);
    const hashedPassword = hash(newPassword);

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

    const isValidPassword = compare(oldPassword, userWithId.password);

    if (!isValidPassword) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: 'Password salah',
      });
    }

    const userUpdate = await prisma.user.update({
      where: {
        id: parsedId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: `Password berhasil diupdate`,
      data: userUpdate,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};
