import UpdateProduct from '@/controllers/productManagement/updateProduct';
import UpdateStock from '@/controllers/stockManagement/updateStock';
import { Router } from 'express';

const stockRouter = Router();

stockRouter.post('/updateStock/:id', UpdateStock);

export default stockRouter;
