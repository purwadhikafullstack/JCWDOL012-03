import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export const createDiscountById = async (req: Request, res: Response) => {
  try {
    const {
      discountName,
      discountType,
      discountValue,
      minPurchaseAmount,
      limit,
      maxDiscountValue,
    } = req.body;
    const { id } = req.params;

    // const getCookies = req.cookies['user-token'];
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    // if (!cookiesToDecode || cookiesToDecode.role !== 'superadmin' || cookiesToDecode.role !== "storeadmin") {
    //   return res.status(401).json({
    //     code: 401,
    //     message: "you're not authorized",
    //   });
    // }

    let discountValueChanged;
    if (discountType === 'percentage') {
      discountValueChanged = discountValue / 100;
    } else {
      discountValueChanged = discountValue;
    }

    const discount = await prisma.discount.create({
      data: {
        discountName,
        discountType,
        discountValue: parseFloat(discountValueChanged),
        minPurchaseAmount: parseFloat(minPurchaseAmount), // Menambahkan nilai minimal pembelian
        maxDiscountValue,
        usage: false,
        status: true,
        limit,
      },
    });

    return res.status(200).json({
      message: 'Discount successfully created',
      data: discount,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
};

export const createDiscountByCondition = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      discountName,
      discountType,
      discountValue,
      minPurchaseAmount,
      limit,
      maxDiscountValue,
    } = req.body;

    // const getCookies = req.cookies['user-token'];
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    // if (!cookiesToDecode || cookiesToDecode.role !== 'superadmin' || cookiesToDecode.role !== "storeadmin") {
    //   return res.status(401).json({
    //     code: 401,
    //     message: "you're not authorized",
    //   });
    // }

    let discountValueChanged;
    if (discountType === 'percentage') {
      discountValueChanged = discountValue / 100;
    } else {
      discountValueChanged = discountValue;
    }

    const discount = await prisma.discount.create({
      data: {
        discountName,
        discountType,
        discountValue: parseFloat(discountValueChanged),
        minPurchaseAmount: parseFloat(minPurchaseAmount), // Menambahkan nilai minimal pembelian
        maxDiscountValue,
        usage: false,
        status: true,
        limit,
      },
    });

    return res.status(200).json({
      message: 'Discount successfully created',
      data: discount,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
};

export const createDiscountBuyOneGetOne = async (
  req: Request,
  res: Response,
) => {
  try {
    const { discountName, discountType } = req.body;
    const { id } = req.params;

    // const getCookies = req.cookies['user-token'];
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    // if (!cookiesToDecode || cookiesToDecode.role !== 'superadmin' || cookiesToDecode.role !== "storeadmin") {
    //   return res.status(401).json({
    //     code: 401,
    //     message: "you're not authorized",
    //   });
    // }

    const discount = await prisma.discount.create({
      data: {
        productId: parseInt(id),
        discountName,
        discountType,
        discountValue: 0,
        usage: false,
        status: true,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'discount successfully created',
      data: discount,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
};
