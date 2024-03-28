import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import axios from 'axios';
require('dotenv').config();


export const addStoreOtherLocation = async (req: Request, res: Response) => {
    try {
    const { city, zipCode} = req.body;

    const { id } = req.params;

    const store = await prisma.store.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        // location: true,
        // admins: true,
        // products: true,
        // orders: true,
      },
    });

    if (!store) {
      return res.status(404).json({
        code: 404,
        message: 'Store not found',
      });
    }
    
    // Buat alamat dari city dan zipCode
    const address = `${city}, ${zipCode}, Indonesia`;

    // Forward Geocoding API endpoint
    const apiKey = process.env.OPENCAGE_API_KEY;
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    // Panggil API Forward Geocoding
    const response = await axios.get(apiUrl);
    const { lat, lng } = response.data.results[0].geometry;

    // Simpan data ke dalam database menggunakan Prisma
    const savedLocation = await prisma.location.create({
      data: {
        latitude: lat,
        longitude: lng,
        storeId: parseInt(id)
      }
    });

    res.status(200).json({ message: 'Data lokasi disimpan', data: savedLocation });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Gagal menyimpan data lokasi' });
  }
};