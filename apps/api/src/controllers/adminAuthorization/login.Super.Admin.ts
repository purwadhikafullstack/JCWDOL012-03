import { compare } from '@/Common/helper/bcrypt.helper';
import { generateToken } from '@/Common/helper/jwt.helper';
import prisma from '@/prisma';
import { Request, Response } from 'express';
import dayjs, { Dayjs } from 'dayjs';

export const loginSuperAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // ambil data admin dari DB
    const adminWithEnail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // validasi apakah role super admin
    if (adminWithEnail?.role !== 'superadmin') {
      return res.status(401).json({
        code: 401,
        message: 'your are not authorized as Super Admin',
      });
    }

    // validasi apakah akunnya ada
    if (!adminWithEnail) {
      return res.status(401).json({
        code: 401,
        message: 'you account not registered',
      });
    }

    // validasi email
    if (adminWithEnail.email !== email) {
      return res.status(404).json({
        code: 404,
        message: 'your1 email or password is incorrect',
      });
    }

    // validasi password
    const isInvalidPassword = compare(password, adminWithEnail.password);
    console.log(typeof password);
    console.log(typeof adminWithEnail.password);
    if (isInvalidPassword) {
      return res.status(404).json({
        code: 404,
        message: 'your2 email or password is incorrect',
      });
    }

    // generate token untuk cookie
    const token = generateToken({
      email: adminWithEnail.email,
      password: adminWithEnail.password,
      role: adminWithEnail.role,
    });

    //generate cookie
    res.cookie('SuperAdminCookie', token, {
      secure: false,
      httpOnly: true,
      expires: dayjs().add(24, 'hours').toDate(),
    });

    return res.status(200).json({
      code: 200,
      message: 'successfully sign in as SuperAdmin',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};
