import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { calculateDistance } from '@/utils/calculateDistance';

interface Location {
  id: number;
  latitude: number;
  longitude: number;
}

export const getNearestStore = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { latitude, longitude } = req.query;

    const latitudeNum = parseFloat(latitude as string);
    const longitudeNum = parseFloat(longitude as string);

    const storesLocation = await prisma.location.findMany({
      where: {
        storeId: {
          not: null,
        },
      },
      include: {
        store: true,
      },
    });

    console.log(storesLocation);

    let nearestStore: any = null;
    let minDistance = Infinity;

    for (const location of storesLocation) {
      const distance = calculateDistance(
        latitudeNum,
        longitudeNum,
        location.latitude,
        location.longitude,
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestStore = location.store;
      }
    }

    if (minDistance > 25 || (!latitude || !longitude)) {
      nearestStore = await prisma.store.findUnique({
        where: {
          id: 1, // Ubah dengan ID toko yang diinginkan
        },
      });
    }

    console.log(nearestStore);

    if (!nearestStore) {
      return res.status(404).json({ message: 'Tidak ada toko yang ditemukan' });
    }

    res.status(200).json({
      message: 'Toko terdekat ditemukan',
      nearestStore: nearestStore,
    });
  } catch (error) {
    console.error('Error finding nearest store:', error);
    res
      .status(500)
      .json({ message: 'Terjadi kesalahan saat mencari toko terdekat' });
  }
};
