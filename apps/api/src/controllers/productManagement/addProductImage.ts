import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export interface jwtPayload {
  id: number;
  role: string;
}

const AddProductImage = async (req: Request, res: Response) => {
  try {
    const imagesUrl = req.file?.path;
    const { id } = req.params;

    // const getCookies = req.cookies['user-token'];
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);

    // if (!cookiesToDecode || cookiesToDecode.role !== 'superadmin') {
    //   return res.status(401).json({
    //     code: 401,
    //     message: "you're not authorized",
    //   });
    // }

    const createImage = await prisma.image.create({
      data: {
        url: imagesUrl || '',
        productId: parseInt(id),
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'successfully add image',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
};

export default AddProductImage;
