import CreateProductCategory from '@/controllers/productCategoryManagement/create.Product.Category';
import DeleteProductCategory from '@/controllers/productCategoryManagement/delete.Product.Category';
import GetProductCategory from '@/controllers/productCategoryManagement/get.Product.Category';
import GetProductCategoryById from '@/controllers/productCategoryManagement/get.Product.Category.By.Id';
import UpdateProductCategory from '@/controllers/productCategoryManagement/update.Product.Category';
import CreateProduct from '@/controllers/productManagement/create.Product';
import cloudinaryUpload from '@/middleware/uploadProduct.middleware';
import { Router } from 'express';
import upload from '@/Common/helper/multer.helper';
import handleImageUpload from '@/middleware/uploadProduct.middleware';
import GetAllProduct from '@/controllers/productManagement/getAllProuduct';
import { deleteFileMiddleware } from '@/middleware/deleteProduct.middleware';
import deleteProduct from '@/controllers/productManagement/deleteProduct';
import { validateProductInput } from '@/middleware/validation.product.input';
import UpdateProduct from '@/controllers/productManagement/updateProduct';
import { validateProductUpdate } from '@/middleware/validation.Product.Update';
import GetProductById from '@/controllers/productManagement/getProductById';

const productRouter = Router();

// category
productRouter.post('/createProductCategory', CreateProductCategory);
productRouter.get('/getProductCategory', GetProductCategory);
productRouter.get('/getProductCategoryById/:id', GetProductCategoryById);
productRouter.patch('/updateProductCategory/:id', UpdateProductCategory);
productRouter.delete('/deleteProductCategory/:id', DeleteProductCategory);

// product
productRouter.post(
  '/createProduct',
  handleImageUpload,
  validateProductInput,
  CreateProduct,
);
productRouter.get('/getAllProduct', GetAllProduct);
productRouter.delete('/deleteProduct/:id', deleteFileMiddleware, deleteProduct);
productRouter.post('/updateProduct/:id', validateProductUpdate, UpdateProduct);
productRouter.get('/getProductById/:id', GetProductById);

export default productRouter;
