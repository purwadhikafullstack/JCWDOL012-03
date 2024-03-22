import prisma from '@/prisma';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { compare } from '@/utils/bcrypt';
import { generateToken } from '@/utils/jwt';

export interface signinPayload {
  email: string;
  password: string;
}

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: signinPayload = req.body;

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userWithEmail) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: 'Email atau Password salah',
      });
    }

    const isValidPassword = compare(password, userWithEmail.password);

    if (!isValidPassword) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: 'Email atau Password salah',
      });
    }

    const jwtToken: string = generateToken({
      id: userWithEmail.id,
      username: userWithEmail.username,
      email: userWithEmail.email,
      role: userWithEmail.role,
    });

    res.cookie('user-token', jwtToken, {
      secure: false,
      httpOnly: true,
      expires: dayjs().add(7, 'days').toDate(),
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: 'Berhasil Sign In',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Error internal server',
    });
  }
};