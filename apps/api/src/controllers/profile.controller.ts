import { jwtDecode } from "jwt-decode";
import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/errorHandler';
import prisma from '@/prisma';
import generateVerificationLink from '@/utils/verificationLink';
import sendMail from '@/utils/sendMail';
import ejs from 'ejs';
import path from 'path';

export interface changeEmailPayload {
  newEmail: string;
}

export interface updatePasswordPayload {
  password: string;
}


export const updatePasswordUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.body;

    const { password }: updatePasswordPayload = req.body;

    const userWithId = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!userWithId) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: `User with id ${id} not found`,
      });
    }

    const userUpdate = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: `User with id ${id} updated successfully`,
      data: userUpdate,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};
