import CreateProductCategory from '@/controllers/create.Product.Category';
import DeleteProductCategory from '@/controllers/delete.Product.Category';
import GetProductCategory from '@/controllers/get.Product.Category';
import { Router } from 'express';

const productRouter = Router();

productRouter.post('/createProductCategory', CreateProductCategory);
productRouter.get('/getProductCategory', GetProductCategory);
productRouter.delete('/deleteProductCategory/:id', DeleteProductCategory);

export default productRouter;
