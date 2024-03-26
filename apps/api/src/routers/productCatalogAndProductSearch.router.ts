import SearchProduct from '@/controllers/productCatalogAndSearchProduct/searchProduct';
import { Router } from 'express';

const productCatalogAndSearchProductRouter = Router();

productCatalogAndSearchProductRouter.get('/:id/search', SearchProduct);

export default productCatalogAndSearchProductRouter;
