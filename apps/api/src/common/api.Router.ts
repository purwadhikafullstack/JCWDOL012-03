import productRouter from '@/routers/Product.Category.Management.Router';
import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/product', productRouter);

export default apiRouter;
