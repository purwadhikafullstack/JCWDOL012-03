import { NextFunction, Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import prisma from '@/prisma';
import ErrorHandler from '@/utils/errorHandler';

export interface jwtPayload {
  id: number;
}

export const defaultAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const getCookies = req.cookies['user-token'];
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    const parsedId = Number(cookiesToDecode.id);
    const addressId = parseInt(id, 10);
    console.log(addressId);

    const userAddresses = await prisma.address.findMany({
      where: { userId: parsedId },
    });

    const targetAddress = userAddresses.find(
      (address) => address.id === addressId,
    );

    if (!targetAddress) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: 'Address not found for the user.',
      });
    }

    const updatePromises = userAddresses.map((address) => {
      if (address.id === addressId) {
        return prisma.address.update({
          where: { id: addressId },
          data: { isPrimary: true },
        });
      } else {
        return prisma.address.update({
          where: { id: address.id },
          data: { isPrimary: false },
        });
      }
    });

    await Promise.all(updatePromises);

    return res.status(200).json({
      code: 200,
      success: true,
      message: 'Default address set successfully.',
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};
