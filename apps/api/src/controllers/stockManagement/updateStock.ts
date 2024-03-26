import prisma from '@/prisma';
import { Request, Response } from 'express';

const UpdateStock = async (req: Request, res: Response) => {
  try {
    const { quantity, type } = req.body;
    const { id } = req.params;
    // const getCookies = req.cookies['user-token'];
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    // if (!cookiesToDecode || cookiesToDecode.role !== 'superadmin') {
    //   return res.status(401).json({
    //     code: 401,
    //     message: "you're not authorized",
    //   });
    // }

    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let quantityBefore: number;
    if (type === 'IN') {
      quantityBefore = product.stock; // Jumlah stok sebelum penambahan
      product.stock += quantity; // Menambah stok barang
    } else {
      if (product.stock === 0) {
        return res.status(400).json({
          code: 400,
          message: 'you must add stock!!',
        });
      }
      quantityBefore = product.stock; // Jumlah stok sebelum pengurangan
      product.stock -= quantity; // Mengurangi stok barang
    }

    await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        stock: product.stock,
      },
    });

    // Membuat jurnal perubahan stok
    const stockJournal = await prisma.stockJournal.create({
      data: {
        productId: parseInt(id),
        quantityBefore,
        quantityAfter: product.stock,
        type,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'stock succesfully updated',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
};

export default UpdateStock;
