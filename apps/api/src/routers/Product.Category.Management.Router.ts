import CreateProductCategory from '@/controllers/create.Product.Category';
import DeleteProductCategory from '@/controllers/delete.Product.Category';
import { Router } from 'express';

const productRouter = Router();

productRouter.post('/createProductCategory', CreateProductCategory);
productRouter.delete('/deleteProductCategory/:id', DeleteProductCategory);

export default productRouter;
