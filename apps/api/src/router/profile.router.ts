import {
  getSessionUser,
  signinUser,
  signoutUser,
  socialAuth,
  socialAuthCallback,
} from '@/controllers/auth.controller';
import { updateAvatarUser, updateEmailUser, updatePasswordUser, updateProfileUser } from '@/controllers/profile.controller';
// import decodeTokenMiddleware from '@/middleware/decodeToken.middleware';
import upload from '@/middleware/storage.middleware';
import { Router } from 'express';
import authenticationMiddleware from '@/middleware/auth.middleware';

const profileRouter: Router = Router();

// profileRouter.put('/avatar', upload, updateAvatarUser);
profileRouter.put('/update-info', authenticationMiddleware, updateProfileUser);
profileRouter.put('/update-email', updateEmailUser);
profileRouter.put('/update-password', updatePasswordUser);
// profileRouter.post('/address', sss);


export default profileRouter;
