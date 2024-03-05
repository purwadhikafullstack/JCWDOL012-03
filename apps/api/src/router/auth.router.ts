import {
  getSessionUser,
  signinUser,
  signoutUser,
  signupUser,
  socialAuth,
  socialAuthCallback,
} from '@/controllers/auth.controller';
import authenticationMiddleware from '@/middleware/auth.middleware';
import { registerValidator } from '@/middleware/validator.middleware';
import { Router } from 'express';

const authRouter: Router = Router();

// authRouter.post('/register', registerValidator, userRegistration);
// authRouter.post('/activation', activationValidator, signupUser);
authRouter.post('/login', signinUser);
authRouter.post('/logout', signoutUser);
authRouter.get('/google', socialAuth);
authRouter.get('/google/callback', socialAuthCallback);
authRouter.get('/session', authenticationMiddleware, getSessionUser);

export default authRouter;
