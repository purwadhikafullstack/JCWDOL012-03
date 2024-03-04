import { Router } from 'express';
import authRouter from '@/router/auth.router';
// import userRouter from '@/router/user.router';
// import transactionRouter from '@/router/transaction.router';
// import analyticsRouter from '@/router/analytics.router';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
// apiRouter.use('/user', userRouter);
// apiRouter.use('/transaction', transactionRouter);
// apiRouter.use('/analytics', analyticsRouter);

export default apiRouter;
