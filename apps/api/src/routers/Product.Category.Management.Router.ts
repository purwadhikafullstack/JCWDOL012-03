import CreateProductCategory from '@/controllers/create.Product.Category';
import { Router } from 'express';

const productRouter = Router();

productRouter.get('/test', CreateProductCategory);

export default productRouter;
