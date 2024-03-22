import { jwtDecode } from 'jwt-decode';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '@/utils/errorHandler';
import prisma from '@/prisma';
import sendMail from '@/utils/sendMail';
import ejs from 'ejs';
import path from 'path';
import { generateEmailLink } from '@/utils/linkGenerator';

export interface changeEmailPayload {
  newEmail: string;
}

export interface jwtPayload {
  id: number;
}

interface TokenPayload {
  email: string;
  userId: number;
}

export const changeEmailUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { newEmail }: changeEmailPayload = req.body;
    const token = req.cookies['user-token'];
    const tokenPayload = jwtDecode<jwtPayload>(token);
    const userId = tokenPayload.id;

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

    const updateEmailLink = generateEmailLink(newEmail, userId);
    const data = { updateEmailLink, newEmail };
    const html = await ejs.renderFile(
      path.join(__dirname, '../../mails/change-mail.ejs'),
      data,
    );

    try {
      await sendMail({
        email: newEmail,
        subject: 'Verifikasi Penggantian email',
        template: 'change-mail.ejs',
        data,
      });

      res.status(201).json({
        success: true,
        message: `Cek email anda di ${newEmail} untuk melakukan verifikasi email baru anda`,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
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
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: 'Token not provided',
        });
      }

    const { email, userId } = getEmailAndIdFromToken(token);

    const updateEmail = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: email,
      },
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: `Update Email berhasil`,
      data: updateEmail,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

function getEmailAndIdFromToken(token: string): TokenPayload {
  const secretKey = 'freshmart12345678901234567890123';

  try {
    const decodedToken = jwt.verify(token, secretKey) as TokenPayload;

    console.log('Decoded token:', decodedToken);

    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
}
