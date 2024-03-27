import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
require('dotenv').config();

export interface jwtPayload {
  id: number;
}

export const addUserCurrentLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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

    const { latitude, longitude } = req.body;
    const apiKey = process.env.OPENCAGE_API_KEY;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: 'Latitude dan Longitude diperlukan' });
    }

    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`;

    const response = await axios.get(apiUrl);

    if (response.status !== 200 || response.data.status.message !== 'OK') {
      throw new Error('Gagal mendapatkan alamat dari koordinat');
    }

    const results = response.data.results;
    if (results.length > 0) {
      const { city, state } = results[0].components;

      const { id } = req.params;
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

      console.log(existingAddress);

      if (existingAddress) {
        // Melakukan pembaruan alamat dengan data baru
        const updatedAddress = await prisma.address.update({
          where: {
            id: existingAddress.id,
          },
          data: {
            city,
            state,
          },
        });

        console.log('Address updated successfully:', updatedAddress);

        // Mendapatkan lokasi terkait dari alamat yang sudah ada
        const existingLocation = await prisma.location.findFirst({
          where: {
            addressId: existingAddress.id,
          },
        });

        if (existingLocation) {
          // Melakukan pembaruan lokasi dengan data baru
          const updatedLocation = await prisma.location.update({
            where: {
              id: existingLocation.id,
            },
            data: {
              latitude,
              longitude,
            },
          });

          console.log('Location updated successfully:', updatedLocation);
        } else {
          // Jika tidak ada lokasi yang terkait ditemukan, buat lokasi baru
          const createdLocation = await prisma.location.create({
            data: {
              latitude,
              longitude,
              addressId: existingAddress.id,
            },
          });

          console.log('Location created successfully:', createdLocation);
        }
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Terjadi kesalahan saat melakukan reverse geocoding' });
  }
};
