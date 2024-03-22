import { Router } from 'express';
import { createStore } from '@/controllers/admin/store/createStore';
import { getStoreList } from '@/controllers/admin/store/getStoreList';
import { getStoreAdminList } from '@/controllers/admin/store-admin/getStoreAdminList';

const adminRouter: Router = Router();

adminRouter.post('/create-store', createStore);
adminRouter.get('/getStoreList', getStoreList);
adminRouter.get('/getStoreAdmin', getStoreAdminList);

export default adminRouter;
