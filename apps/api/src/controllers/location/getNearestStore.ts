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
      const { latitude, longitude } = req.body;
  
      if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude dan Longitude diperlukan' });
      }
  
      const locations = await prisma.location.findMany({
        include: {
          store: true,
        },
      });
  
      let nearestStore = null;
      let minDistance = Infinity;
  
      for (const location of locations) {
        const distance = calculateDistance(latitude, longitude, location.latitude, location.longitude);
        if (distance < minDistance) {
          minDistance = distance;
          nearestStore = location.store;
        }
      }
  
      if (!nearestStore) {
        return res.status(404).json({ message: 'Tidak ada toko yang ditemukan' });
      }
  
      res.status(200).json(nearestStore);
    } catch (error) {
      console.error('Error finding nearest store:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mencari toko terdekat' });
    }
  };