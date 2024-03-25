import { createStore } from '@/controllers/admin/store/createStore';
import { getStoreById } from '@/controllers/admin/store/getStoreById';
import { getStoreList } from '@/controllers/admin/store/getStoreList';
import { Router } from 'express';
// import { getStoreAdminList } from '@/controllers/admin/store-admin/getStoreAdminList';

const adminRouter: Router = Router();

adminRouter.post('/create-store', createStore);
adminRouter.get('/store-list', getStoreList);
adminRouter.get('/store/:id', getStoreById);
// adminRouter.get('/store-admin-list', getStoreAdminList);

export default adminRouter;
