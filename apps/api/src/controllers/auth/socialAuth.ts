import prisma from '@/prisma';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { authorizationUrl } from '@/middleware/socialAuth.middleware';
import { oAuth2Client } from '@/config';
import { google } from 'googleapis';
import { generateToken } from '@/utils/jwt';

export const socialAuth = (req: Request, res: Response) => {
  return res.redirect(authorizationUrl);
};

export const socialAuthCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;

    const { tokens } = await oAuth2Client.getToken(code as string);

    oAuth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oAuth2Client,
      version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email || !data.name || !data.picture) {
      return res.json({
        data: data,
      });
    }

    let user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          avatar: data.picture,
          username: data.name,
          password: 'defaultPassword',
        },
      });
    }

    const jwtToken: string = generateToken({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
    });

    res.cookie('user-token', jwtToken, {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Cookie is only accessible via HTTP(S) requests
      expires: dayjs().add(7, 'days').toDate(), // Set cookie expiry
    });

    return res.redirect('http://localhost:3000/');
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Internal server error',
    });
  }
};
