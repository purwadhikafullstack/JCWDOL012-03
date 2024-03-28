import { CreateStoreAdmin } from '@/controllers/adminAuthorization/create.Store.Admin';
import { DeleteStoreAdmin } from '@/controllers/adminAuthorization/delete.Store.Admin';
import { GetStoreAdmin } from '@/controllers/adminAuthorization/get.Store.Admin';
import GetStoreAdminById from '@/controllers/adminAuthorization/get.Store.Admin.By.Id';
import { getStoreList } from '@/controllers/adminAuthorization/get.Store.List';
import { loginSuperAdmin } from '@/controllers/adminAuthorization/login.Super.Admin';
import { logoutSuperAdmin } from '@/controllers/adminAuthorization/logout.Super.Admin';
import UpdateStoreAdmin from '@/controllers/adminAuthorization/update.Store.Admin';
import { validateStoreAdminInput } from '@/middleware/validation.Store.Admin.Input';
import { Router } from 'express';

const authRouter = Router();

// authRouter.post('/loginSuperAdmin', loginSuperAdmin);
// authRouter.post('/logoutSuperAdmin', logoutSuperAdmin);
authRouter.get('/getStoreList', getStoreList);
authRouter.get('/getStoreAdmin', GetStoreAdmin);
authRouter.post('/createStoreAdmin', validateStoreAdminInput, CreateStoreAdmin);
authRouter.delete('/deleteStoreAdmin/:userId', DeleteStoreAdmin);
authRouter.get('/getStoreAdminById/:id', GetStoreAdminById);
authRouter.post('/editStoreAdmin/:id', UpdateStoreAdmin);

export default authRouter;
