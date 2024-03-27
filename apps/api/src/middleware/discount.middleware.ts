import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

// Skema validasi menggunakan Yup
const discountSchema = yup.object({
  discountName: yup.string().required(),
  discountType: yup.string().oneOf(['percentage', 'fixed', 'bogo']),
  discountValue: yup.number().positive(),
});

// Middleware untuk memvalidasi input
export const validateDiscountInput = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { discountName, discountType, discountValue } = req.body;

    // Memvalidasi input menggunakan skema Yup
    await discountSchema.validate({
      discountName,
      discountType,
      discountValue,
    });

    // Lanjut ke middleware berikutnya jika validasi berhasil
    next();
  } catch (error) {
    // Tangani kesalahan validasi dengan mengirim tanggapan yang sesuai
    return res.status(400).json({
      code: 400,
      message: { error },
    });
  }
};
