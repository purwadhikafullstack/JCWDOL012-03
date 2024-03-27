import { Router } from 'express';
import authRouter from '@/router/auth.router';
import registerRouter from './register.router';
import profileRouter from './profile.router';
import adminRouter from './admin.router';
import locationRouter from './location.router';
// import userRouter from '@/router/user.router';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/register', registerRouter);
apiRouter.use('/profile', profileRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/location', locationRouter);
// apiRouter.use('/user', userRouter);
// apiRouter.use('/transaction', transactionRouter);
// apiRouter.use('/analytics', analyticsRouter);

export default apiRouter;
