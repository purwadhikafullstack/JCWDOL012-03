import { jwtDecode } from 'jwt-decode';
import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import ErrorHandler from '@/utils/errorHandler';

interface CreateStorePayload {
  name: string;
//   latitude: number;
//   longitude: number;
//   address: string;
//   userId: number;
}

export interface jwtPayload {
    id: number;
  }

export const createStore = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
    //   latitude,
    //   longitude,
    //   address,
    //   userId,
    }: CreateStorePayload = req.body;

    // Decode user token to get user ID
    // const getCookies = req.cookies['user-token'];
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    // const parsedId = Number(cookiesToDecode.id);

    // Find the user to ensure they exist and have rights to create a store
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: parsedId,
    //   },
    // });

    // if (!user) {
    //   return res.status(404).json({
    //     code: 404,
    //     success: false,
    //     message: `User with id ${parsedId} not found`,
    //   });
    // }

    // Check if the user is authorized to create a store (for example, if they are a super admin)
    // This logic should be adapted based on your specific authorization requirements

    // Create the store
    const newStore = await prisma.store.create({
      data: {
        name,
        // location: {
        //   create: {
        //     latitude,
        //     longitude,
        //     address: {
        //       create: {
        //         street: address,
        //         city: '', // Fill this according to your data model
        //         province: '', // Fill this according to your data model
        //         zipCode: '', // Fill this according to your data model
        //         notes: '', // Fill this according to your data model
        //         isPrimary: true, // Assuming the first address is always primary
        //       },
        //     },
        //   },
        // },
        // admins: {
        //   create: {
        //     userId,
        //     user: {
        //       connect: {
        //         id: userId,
        //       },
        //     },
        //   },
        // },
    //   },
    //   include: {
    //     location: true,
    //     admins: true,
      },
    });

    return res.status(201).json({
      code: 201,
      success: true,
      message: 'Store created successfully',
      data: newStore,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};