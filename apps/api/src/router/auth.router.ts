import {
  getSessionUser,
  signinUser,
  signoutUser,
  socialAuth,
  socialAuthCallback,
} from '@/controllers/auth.controller';
import { changePassword, resetPassword } from '@/controllers/auth/forgotPassword.controller';
import authenticationMiddleware from '@/middleware/auth.middleware';
import { registerValidator } from '@/middleware/validator.middleware';
import { Router } from 'express';

const authRouter: Router = Router();

authRouter.post('/login', signinUser);
authRouter.post('/logout', signoutUser);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/change-password', changePassword);
authRouter.get('/google', socialAuth);
authRouter.get('/google/callback', socialAuthCallback);
authRouter.get('/session', authenticationMiddleware, getSessionUser);

export default authRouter;
