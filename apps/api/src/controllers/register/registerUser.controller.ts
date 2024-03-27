import prisma from '@/prisma';
import { Request, Response } from 'express';
import ejs from 'ejs';
import path from 'path';
import sendMail from '@/utils/sendMail';
import { generateVerificationLink } from '@/utils/linkGenerator';


export interface registrationPayload {
  email: string;
}

export interface verificationPayload {
  name: string;
  username: string;
  password: string;
  refCode?: string | undefined;
}

export const userRegistration = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as registrationPayload;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user?.email === email) {
      return res.status(400).send({
        code: 400,
        success: false,
        message: 'Email sudah terpakai',
      });
    }
    const verificationLink = generateVerificationLink(email);
    const data = { verificationLink };
    const html = await ejs.renderFile(
      path.join(__dirname, '../../mails/activation-mail.ejs'),
      data,
    );

    try {
      await sendMail({
        email: email,
        subject: 'Aktivasi Akun FreshMart',
        template: 'activation-mail.ejs',
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

