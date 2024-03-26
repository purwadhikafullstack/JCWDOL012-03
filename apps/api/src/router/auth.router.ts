import { CreateStoreAdmin } from '@/controllers/adminAuthorization/create.Store.Admin';
import { DeleteStoreAdmin } from '@/controllers/adminAuthorization/delete.Store.Admin';
import { GetStoreAdmin } from '@/controllers/adminAuthorization/get.Store.Admin';
import GetStoreAdminById from '@/controllers/adminAuthorization/get.Store.Admin.By.Id';
import { getStoreList } from '@/controllers/adminAuthorization/get.Store.List';
import UpdateStoreAdmin from '@/controllers/adminAuthorization/update.Store.Admin';
import {
  getSessionUser,
  signinUser,
  signoutUser
} from '@/controllers/auth.controller';
import { changePassword, resetPassword } from '@/controllers/auth/forgotPassword.controller';
import { socialAuth, socialAuthCallback } from '@/controllers/auth/socialAuth';
import authenticationMiddleware from '@/middleware/auth.middleware';
import { validateStoreAdminInput } from '@/middleware/validation.Store.Admin.Input';
import { registerValidator } from '@/middleware/validator.middleware';
import { Router } from 'express';

const authRouter: Router = Router();

authRouter.post('/login', signinUser);
authRouter.post('/logout', signoutUser);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/change-password', authenticationMiddleware, changePassword);
authRouter.get('/google', socialAuth);
authRouter.get('/google/callback', socialAuthCallback);
authRouter.get('/session', authenticationMiddleware, getSessionUser);

authRouter.get('/getStoreList', getStoreList);
authRouter.get('/getStoreAdmin', GetStoreAdmin);
authRouter.post('/createStoreAdmin', validateStoreAdminInput, CreateStoreAdmin);
authRouter.delete('/deleteStoreAdmin/:userId', DeleteStoreAdmin);
authRouter.get('/getStoreAdminById/:id', GetStoreAdminById);
authRouter.post('/editStoreAdmin/:id', UpdateStoreAdmin);

export default authRouter;
