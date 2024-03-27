import {
  createDiscountBuyOneGetOne,
  createDiscountByCondition,
  createDiscountById,
} from '@/controllers/discountManagement/createDiscount';
import { DeleteDiscountById } from '@/controllers/discountManagement/deleteDiscount';
import { GetAllDiscount } from '@/controllers/discountManagement/getAllDiscount';
import { updateDiscountById } from '@/controllers/discountManagement/updateDiscount';
import { validateDiscountInput } from '@/middleware/discount.middleware';
import { Router } from 'express';

const discountRouter = Router();

discountRouter.get('/getAllDiscount', GetAllDiscount);
discountRouter.post(
  '/createDiscountById/:id',
  validateDiscountInput,
  createDiscountById,
);
discountRouter.post(
  '/createDiscountByCondition',
  validateDiscountInput,
  createDiscountByCondition,
);
discountRouter.post(
  '/createDiscountBuyOneGetOne/:id',
  validateDiscountInput,
  createDiscountBuyOneGetOne,
);
discountRouter.patch('/updateDiscountById/:id', updateDiscountById);
discountRouter.patch('/deleteDiscountById/:id', DeleteDiscountById);

export default discountRouter;
