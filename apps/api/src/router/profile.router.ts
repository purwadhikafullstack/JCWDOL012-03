import {
  getSessionUser,
  signinUser,
  signoutUser,
  socialAuth,
  socialAuthCallback,
} from '@/controllers/auth.controller';
import { updatePasswordUser } from '@/controllers/profile.controller';
import upload from '@/middleware/storage.middleware';
import { Router } from 'express';
import authenticationMiddleware from '@/middleware/auth.middleware';
import { updateProfileUser } from '@/controllers/profile/updateInfo.controller';
import { changeEmailUser, updateEmailUser } from '@/controllers/profile/updateEmail.controller';
import { updateAvatarUser } from '@/controllers/profile/updateAvatar.controller';

const profileRouter: Router = Router();

profileRouter.post('/update-avatar', upload.single('avatar'), updateAvatarUser);
profileRouter.put('/update-info', authenticationMiddleware, updateProfileUser);
profileRouter.post('/change-email', changeEmailUser);
profileRouter.put('/update-email', updateEmailUser);
profileRouter.put('/update-password', updatePasswordUser);
// profileRouter.post('/address', sss);


export default profileRouter;
