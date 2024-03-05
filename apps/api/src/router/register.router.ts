import {
  // getEmailFromToken,
  userRegistration,
  userVerification,
} from '@/controllers/register.controller';
import {
  verificationValidator,
  registerValidator,
} from '@/middleware/validator.middleware';
import { Router } from 'express';

const registerRouter: Router = Router();

registerRouter.post('/email', registerValidator, userRegistration);
registerRouter.post('/verification', verificationValidator, userVerification);


export default registerRouter;
