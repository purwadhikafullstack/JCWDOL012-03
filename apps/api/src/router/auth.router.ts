import {
  getSessionUser,
  signinUser,
  signoutUser,
  signupUser,
  socialAuth,
  socialAuthCallback,
} from '@/controllers/auth.controller';
import authenticationMiddleware from '@/middleware/auth.middleware';
import { registerValidator } from '@/middleware/registerValidator.middleware';
import { Router } from 'express';

const authRouter: Router = Router();

authRouter.post('/signin', signinUser);
authRouter.post('/signup', registerValidator, signupUser);
authRouter.post('/signout', signoutUser);
authRouter.get('/google', socialAuth);
authRouter.get('/google/callback', socialAuthCallback);
authRouter.get('/session', authenticationMiddleware, getSessionUser);

export default authRouter;
