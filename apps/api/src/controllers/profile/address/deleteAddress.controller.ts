import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import ErrorHandler from '@/utils/errorHandler';

export const deleteAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Pastikan alamat dengan id yang diberikan ada
    const existingAddress = await prisma.address.findUnique({
      where: { id: Number(id) },
    });

    if (!existingAddress) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: `Address with id ${id} not found`,
      });
    }

    // Hapus alamat
    await prisma.address.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: `Address with id ${id} deleted successfully`,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};