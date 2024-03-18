import prisma from '@/prisma';
import { Request, Response } from 'express';

const UpdateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    // const getCookies = req.cookies['user-token'];
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);

    // if (!cookiesToDecode || cookiesToDecode.role !== 'superadmin') {
    //   return res.status(401).json({
    //     code: 401,
    //     message: "you're not authorized",
    //   });
    // }

    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) || -1 },
    });
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        description: description,
        price: price,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'Product successfully updated',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
};

export default UpdateProduct;
