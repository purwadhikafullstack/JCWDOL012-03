import UpdateProduct from '@/controllers/productManagement/updateProduct';
import UpdateStock from '@/controllers/stockManagement/updateStock';
import validateUpdateStockMiddleware from '@/middleware/updateStock.middleware';
import { Router } from 'express';

const stockRouter = Router();

stockRouter.post(
  '/updateStock/:id',
  validateUpdateStockMiddleware,
  UpdateStock,
);

export default stockRouter;
