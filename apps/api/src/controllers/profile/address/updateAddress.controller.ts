import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import ErrorHandler from '@/utils/errorHandler';

interface UpdateAddressPayload {
  id: number;
  street?: string;
  city?: string;
  province?: string;
  zipCode?: string;
  isPrimary?: boolean;
}

export const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      street,
      city,
      province,
      zipCode,
      isPrimary,
    }: UpdateAddressPayload = req.body;

    // Pastikan alamat dengan id yang diberikan ada
    const existingAddress = await prisma.address.findUnique({
      where: { id },
    });

    if (!existingAddress) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: `Address with id ${id} not found`,
      });
    }

    // Update alamat
    const updatedAddress = await prisma.address.update({
      where: { id },
      data: {
        street: street || existingAddress.street,
        city: city || existingAddress.city,
        province: province || existingAddress.province,
        zipCode: zipCode || existingAddress.zipCode,
        isPrimary: isPrimary !== undefined ? isPrimary : existingAddress.isPrimary,
      },
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: `Address with id ${id} updated successfully`,
      data: updatedAddress,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};