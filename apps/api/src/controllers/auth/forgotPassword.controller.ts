import prisma from '@/prisma';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { hash } from '@/utils/bcrypt';
import ejs from 'ejs';
import path from 'path';
import sendMail from '@/utils/sendMail';
import { generateResetPasswordLink } from '@/utils/linkGenerator';
import { getEmailFromToken } from '@/middleware/decodeToken.middleware';

export interface resetPasswordPayload {
  email: string;
}

export interface changePasswordPayload {
  newPassword: string;
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as resetPasswordPayload;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user?.email !== email) {
      return res.status(400).send({
        code: 400,
        success: false,
        message: 'Email belum terdaftar',
      });
    }
    const resetPasswordLink = generateResetPasswordLink(email);
    const data = { resetPasswordLink };
    const html = await ejs.renderFile(
      path.join(__dirname, '../../mails/reset-password-mail.ejs'),
      data,
    );

    try {
      await sendMail({
        email: email,
        subject: 'Konfirmasi Reset Password Akun FreshMart',
        template: 'reset-password-mail.ejs',
        data,
      });

      res.status(201).json({
        success: true,
        message: `Cek email anda di ${email} untuk mengaktivasi akun anda`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        success: false,
        message: 'Internal server error',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Internal server error',
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body as changePasswordPayload;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: 'Token not provided',
      });
    }

    const tokenEmail = getEmailFromToken(token as string);
    const hashedPassword = hash(newPassword);
    console.log(tokenEmail);

    const userUpdate = await prisma.user.update({
      where: {
        email: tokenEmail,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: `Ganti password berhasil`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Internal server error',
    });
  }
};
