import { addUserCurrentLocation } from '@/controllers/location/addUserCurrentLocation';
import { getNearestStore } from '@/controllers/location/getNearestStore';
import { Router } from 'express';

const locationRouter: Router = Router();

locationRouter.patch('/current/:id', addUserCurrentLocation);
locationRouter.get('/nearest-store', getNearestStore);

export default locationRouter;
