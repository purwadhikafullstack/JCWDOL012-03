import CreateProductCategory from '@/controllers/create.Product.Category';
import DeleteProductCategory from '@/controllers/delete.Product.Category';
import GetProductCategory from '@/controllers/get.Product.Category';
import GetProductCategoryById from '@/controllers/get.Product.Category.By.Id';
import UpdateProductCategory from '@/controllers/update.Product.Category';
import { Router } from 'express';

const productRouter = Router();

productRouter.post('/createProductCategory', CreateProductCategory);
productRouter.get('/getProductCategory', GetProductCategory);
productRouter.get('/getProductCategoryById/:id', GetProductCategoryById);
productRouter.patch('/updateProductCategory/:id', UpdateProductCategory);
productRouter.delete('/deleteProductCategory/:id', DeleteProductCategory);

export default productRouter;
