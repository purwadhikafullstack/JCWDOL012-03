import {
  getSessionUser,
  signinUser,
  signoutUser,
  socialAuth,
  socialAuthCallback,
} from '@/controllers/auth.controller';
import upload from '@/middleware/storage.middleware';
import { Router } from 'express';
import authenticationMiddleware from '@/middleware/auth.middleware';
import { updateProfileUser } from '@/controllers/profile/updateInfo.controller';
import { changeEmailUser, updateEmailUser } from '@/controllers/profile/updateEmail.controller';
import { updateAvatarUser } from '@/controllers/profile/updateAvatar.controller';
import { updatePasswordUser } from '@/controllers/profile/updatePassword.controller';
import { createAddress } from '@/controllers//profile/address/createAddress.controller';
import { updateAddress } from '@/controllers/profile/address/updateAddress.controller';
import { deleteAddress } from '@/controllers/profile/address/deleteAddress.controller';
import { defaultAddress } from '@/controllers/profile/address/defaultAddress.controller';

const profileRouter: Router = Router();

profileRouter.post('/update-avatar', upload.single('avatar'), updateAvatarUser);
profileRouter.put('/update-info', authenticationMiddleware, updateProfileUser);
profileRouter.post('/change-email', changeEmailUser);
profileRouter.put('/update-email', updateEmailUser);
profileRouter.put('/update-password', updatePasswordUser);
profileRouter.post('/create-address', createAddress);
profileRouter.put('/update-address/:id', updateAddress);
profileRouter.put('/default-address/:id', defaultAddress);
profileRouter.delete('/delete-address/:id', deleteAddress);


export default profileRouter;
