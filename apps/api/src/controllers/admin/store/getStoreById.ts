import prisma from '@/prisma';
import { Request, Response } from 'express';

interface Store {
  id: number;
  name: string;
  location: Location[];
//   admins: StoreAdmin[];
//   products: Product[];
//   orders: Order[];
}

interface Location {
  id: number;
  latitude: number;
  longitude: number;
  addressId: number | null;
  storeId: number | null;
}

interface StoreAdmin {
  // Definisikan sesuai dengan model StoreAdmin
}

interface Product {
  // Definisikan sesuai dengan model Product
}

interface Order {
  // Definisikan sesuai dengan model Order
}

export const getStoreById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const store = await prisma.store.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        location: true,
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

    const locations: Location[] = store.location.map((loc) => ({
      id: loc.id,
      latitude: loc.latitude,
      longitude: loc.longitude,
      addressId: loc.addressId,
      storeId: loc.storeId,
    }));

    const formattedStore: Store = {
      id: store.id,
      name: store.name,
      location: locations
    //   admins: store.admins,
    //   products: store.products,
    //   orders: store.orders,
    };

    return res.status(200).json({
      code: 200,
      message: 'Store data retrieved successfully',
      data: formattedStore,
    });
  } catch (error) {
    console.error('Error fetching store data:', error);
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
};
