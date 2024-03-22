import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export interface jwtPayload {
  id: number;
  role: string;
}

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, storeId, categoryId } = req.body;
    const imagesUrl = req.file?.path; // Mengambil gambar dari hasil middleware

    // const getCookies = req.cookies['user-token'];
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);

    // if (!cookiesToDecode || cookiesToDecode.role !== 'superadmin') {
    //   return res.status(401).json({
    //     code: 401,
    //     message: "you're not authorized",
    //   });
    // }

    const productExisting = await prisma.product.findMany({
      where: {
        storeId: parseInt(storeId),
        categories: {
          some: {
            id: parseInt(categoryId),
          },
        },
        name: name,
      },
    });

    if (productExisting?.length > 0) {
      return res.status(400).json({
        code: 400,
        message: 'product already exist',
      });
    }

    const product = await prisma.product.create({
      data: {
        status: true,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        storeId: parseInt(storeId),
        image: {
          createMany: {
            data: {
              url: imagesUrl || '',
            },
          },
        },
        categories: {
          connect: [
            {
              id: parseInt(categoryId),
            },
          ],
        },
        name,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'Product successfully created',
      data: product,
      another: req.file,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
};

export default createProduct;
