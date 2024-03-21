import { Router } from 'express';
import authRouter from '@/router/auth.router';
import registerRouter from './register.router';
import productRouter from '@/routers/Product.And.Category.Management.Router';
import stockRouter from '@/routers/Stock.Management.Router';
import discountRouter from '@/routers/Discount.Management';
// import userRouter from '@/router/user.router';
// import transactionRouter from '@/router/transaction.router';
// import analyticsRouter from '@/router/analytics.router';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/register', registerRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/stock', stockRouter);
apiRouter.use('/discount', discountRouter);

// apiRouter.use('/user', userRouter);
// apiRouter.use('/transaction', transactionRouter);
// apiRouter.use('/analytics', analyticsRouter);

export default apiRouter;
