import * as yup from 'yup';
import { NextFunction, Request, Response } from 'express';

const updateStockSchema = yup.object().shape({
  quantity: yup.number().required().positive().integer(),
  type: yup.string().required().oneOf(['IN', 'OUT']),
});

const validateUpdateStockMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await updateStockSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: 'Validation error',
    });
  }
};

export default validateUpdateStockMiddleware;
