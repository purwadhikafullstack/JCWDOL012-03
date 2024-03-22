import { jwtDecode } from 'jwt-decode';
import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '@/utils/errorHandler';
import prisma from '@/prisma';
import path from 'path';
import cloudinary from '@/cloudinaryConfig';
const fs = require('fs');

export interface jwtPayload {
  id: number;
}

export const updateAvatarUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const avatarFile = req.file;

    if (!avatarFile) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: 'No avatar file uploaded',
      });
    }

    const { path: avatarPath } = avatarFile;

    const getCookies = req.cookies['user-token'];
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    const parsedId = Number(cookiesToDecode.id);

    const userWithId = await prisma.user.findFirst({
      where: {
        id: parsedId,
      },
    });

    if (!userWithId) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: `User with id ${parsedId} not found`,
      });
    }

    // Simpan gambar ke direktori lokal
    const targetPath = `uploads/${avatarFile.originalname}`;

    fs.renameSync(avatarPath, targetPath); // Pindahkan file ke direktori tujuan

    const userUpdate = await prisma.user.update({
      where: {
        id: parsedId,
      },
      data: {
        avatar: targetPath, // Simpan path file lokal ke database
      },
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: `User with id ${parsedId} updated successfully`,
      data: userUpdate,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};