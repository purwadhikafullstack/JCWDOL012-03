import prisma from '@/prisma';
import { Request, Response } from 'express';

interface Store {
  id: number;
  name: string;
//   location: Location[];
//   admins: StoreAdmin[];
//   products: Product[];
//   orders: Order[];
}

interface Location {
  id: number;
  name: string;
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

    const formattedStore: Store = {
      id: store.id,
      name: store.name,
    //   location: store.location,
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
