import prisma from '@/prisma';
import { Request, Response } from 'express';
import { generateReferral } from '@/utils/referral';
import { hash } from '@/utils/bcrypt';
import { getEmailFromToken } from '@/middleware/decodeToken.middleware';

export interface verificationPayload {
  name: string;
  username: string;
  password: string;
  refCode?: string | undefined;
}

export const userVerification = async (req: Request, res: Response) => {
  try {
    const { name, username, password, refCode } =
      req.body as verificationPayload;
    const token = req.headers.authorization?.split(' ')[1];
    const tokenEmail = getEmailFromToken(token as string);
    const hashedPassword = hash(password);
    // const referral = generateReferral(username);

    if (!refCode) {
      const createUser = await prisma.user.create({
        data: {
          name,
          username,
          email: tokenEmail,
          password: hashedPassword,
        //   referral,
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

