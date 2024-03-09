import {
    getUserId,
    getVoucher,
    updateUser,
    getAllProfileUser,
  } from '@/controllers/user.controller';
  import authenticationMiddleware from '@/middleware/auth.middleware';
  import { Router } from 'express';
  
  const userRouter: Router = Router();
  
  userRouter.get('/data', authenticationMiddleware, getAllProfileUser);
  userRouter.get('/:id', getUserId);
  userRouter.patch('/', authenticationMiddleware, updateUser);
  userRouter.get('/voucher', authenticationMiddleware, getVoucher);
  
  export default userRouter;
  