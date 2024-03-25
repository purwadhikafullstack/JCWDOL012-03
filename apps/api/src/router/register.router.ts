import { userRegistration } from '@/controllers/register/registerUser.controller';
import { userVerification } from '@/controllers/register/registerVerification.controller';
import {
  verificationValidator,
  registerValidator,
} from '@/middleware/validator.middleware';
import { Router } from 'express';

const registerRouter: Router = Router();

registerRouter.post('/email', registerValidator, userRegistration);
registerRouter.post('/verification', verificationValidator, userVerification);


export default registerRouter;
