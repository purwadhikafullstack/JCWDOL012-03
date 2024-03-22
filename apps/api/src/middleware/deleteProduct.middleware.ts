import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';

const deleteImageFile = (imagePath: string) => {
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error('Error deleting image file:', err);
    } else {
      console.log('Image file deleted successfully');
    }
  });
};

// Middleware to handle file deletion
export const deleteFileMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        image: {
          select: {
            url: true,
          },
        },
      },
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete image file from filesystem
    const imagePath = path.join(__dirname, '..', product.image[0].url);
    deleteImageFile(imagePath);
    // product.image.forEach((image) => {
    //   const imagePath = path.join(__dirname, '..', image.url);
    //   deleteImageFile(imagePath);
    // });

    next();
  } catch (error) {
    console.error('Error deleting file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
