import prisma from '@/prisma';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { generateReferral } from '@/utils/referral';
import { hash } from '@/utils/bcrypt';
// import { generateToken } from '@/utils/jwt';
// import { authorizationUrl } from '@/middleware/socialAuth.middleware';
// import { oauth2 } from 'googleapis/build/src/apis/oauth2';
// import { oAuth2Client } from '@/config';
// import { google } from 'googleapis';
import ejs from 'ejs';
import path from 'path';
import sendMail from '../utils/sendMail';
import generateVerificationLink from '@/utils/verificationLink';
import * as crypto from 'crypto';

export interface registrationPayload {
  email: string;
}

export interface verificationPayload {
  name: string;
  username: string;
  email: string;
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
      path.join(__dirname, '../mails/activation-mail.ejs'),
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

export const userVerification = async (req: Request, res: Response) => {
  try {
    const { name, username, password, refCode } =
      req.body as verificationPayload;

    const referral = generateReferral(username);
    const tokenEmail = getEmailFromToken(req.query.token as string);

    if (tokenEmail !== req.body.email) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: 'Email tidak valid',
      });
    }

    const hashedPassword = hash(password);

    if (!refCode) {
      const createUser = await prisma.user.create({
        data: {
          name,
          username,
          email: tokenEmail,
          password: hashedPassword,
        //   referral: referral,
        },
      });

      return res.status(200).json({
        code: 200,
        success: true,
        message: `Register berhasil`,
        data: {
          ...createUser,
          password: null,
        },
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

function getEmailFromToken(token: string): string {
  // Lakukan dekripsi token untuk mendapatkan email
  const secretKey = 'freshmart123';

  try {
    const decipher = crypto.createDecipher('sha256', secretKey);
    const decryptedEmail =
      decipher.update(token, 'hex', 'utf-8') + decipher.final('utf-8');
    return decryptedEmail;
  } catch (error) {
    console.error('Error decrypting email from token:', error);
    throw new Error('Invalid token');
  }
}
