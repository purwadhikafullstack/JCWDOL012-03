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

profileRouter.post('/update-avatar', authenticationMiddleware,upload.single('avatar'), updateAvatarUser);
profileRouter.put('/update-info', authenticationMiddleware, updateProfileUser);
profileRouter.post('/change-email', authenticationMiddleware, changeEmailUser);
profileRouter.put('/update-email', authenticationMiddleware, updateEmailUser);
profileRouter.put('/update-password', authenticationMiddleware, updatePasswordUser);
profileRouter.post('/create-address', authenticationMiddleware, createAddress);
profileRouter.put('/update-address/:id', authenticationMiddleware, updateAddress);
profileRouter.put('/default-address/:id', authenticationMiddleware, defaultAddress);
profileRouter.delete('/delete-address/:id', authenticationMiddleware, deleteAddress);


export default profileRouter;
