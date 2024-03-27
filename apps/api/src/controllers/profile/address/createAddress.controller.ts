import { jwtDecode } from 'jwt-decode';
import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import ErrorHandler from '@/utils/errorHandler';

interface CreateAddressPayload {
  street: string;
  city: string;
  state: string;
  province: string;
  zipCode: string;
  notes: string;
  isPrimary: boolean;
}

export interface jwtPayload {
  id: number;
}

export const createAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      street,
      city,
      state,
      province,
      zipCode,
      notes,
      isPrimary,
    }: CreateAddressPayload = req.body;
    console.log(isPrimary);

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

    let newIsPrimary = isPrimary;

    const userAddresses = await prisma.address.findMany({
      where: {
        userId: parsedId,
      },
    });

    if (userAddresses.length === 0) {
      newIsPrimary = true;
    } else if (newIsPrimary) {
      const updatePromises = userAddresses.map((address) => {
        return prisma.address.update({
          where: { id: address.id },
          data: { isPrimary: false },
        });
      });
      await Promise.all(updatePromises);
    }

    const newAddress = await prisma.address.create({
      data: {
        userId: parsedId,
        street,
        city,
        state,
        province,
        zipCode,
        notes,
        isPrimary: newIsPrimary,
      },
    });

    return res.status(201).json({
      code: 201,
      success: true,
      message: 'Address created successfully',
      data: newAddress,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};
