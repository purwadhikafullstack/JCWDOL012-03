import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export const updateDiscountById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
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
    const discount = await prisma.discount.update({
      where: { id: parseInt(id) },
      data: {
        discountName,
        discountType,
        discountValue: parseFloat(discountValueChanged),
        minPurchaseAmount: parseFloat(minPurchaseAmount), // Memperbarui nilai minimal pembelian
        maxDiscountValue,
        limit,
      },
    });

    return res.status(200).json({
      message: 'Discount successfully updated',
      data: discount,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
};
