import authRouter from '@/routers/Admin.Authorization.router';
import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);

export default apiRouter;
