import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/errorHandler';
import prisma from '@/prisma';
import { generateToken } from '@/utils/updateEmailLink';
import sendMail from '@/utils/sendMail';

export interface updateAvatarPayload {
  avatar: string;
}

export interface updateProfilePayload {
  name: string;
  username: string;
  phone: string;
}

export interface updateEmailPayload {
  newEmail: string;
}

export interface updatePasswordPayload {
  password: string;
}

export const updateAvatarUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.body;

    const { avatar }: updateAvatarPayload = req.body;

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
        avatar,
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

export const updateProfileUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.body;
    const { name, username, phone }: updateProfilePayload = req.body;
    const parsedId = parseInt(id);

    const userWithId = await prisma.user.findFirst({
      where: {
        id: parsedId,
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
        name,
        username,
        phone,
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

export const updateEmailUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.body;
    const { newEmail }: updateEmailPayload = req.body;

    const existingUserWithNewEmail = await prisma.user.findFirst({
      where: {
        email: newEmail,
      },
    });

    if (existingUserWithNewEmail) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: 'Email sudah terpakai',
      });
    }

    // const verificationToken = generateToken({ userId: userUpdate.id, email: newEmail });
    // const verificationLink = `http://your-frontend-app/verify-email?token=${verificationToken}`;

    // await sendVerificationEmail(newEmail, verificationLink);

    try {
      // await sendMail({
      //   email: newEmail,
      //   subject: 'Verifikasi Penggantian email',
      //   template: 'change-mail.ejs',
      //   data,
      // });

      res.status(201).json({
        success: true,
        message: `Cek email anda di ${newEmail} untuk melakukan verifikasi email baru anda`,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }

    return res.status(200).json({
      code: 200,
      success: true,
      message: `Email updated successfully. Verification email sent to ${newEmail}.`,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

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
