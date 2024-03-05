import {
    signupUser,
  } from '@/controllers/auth.controller';
import { userRegistration } from '@/controllers/register.controller';
  import authenticationMiddleware from '@/middleware/auth.middleware';
  import { verificationValidator, registerValidator } from '@/middleware/validator.middleware';
  import { Router } from 'express';
  
  const registerRouter: Router = Router();
  
  registerRouter.post('/email', registerValidator, userRegistration);
  registerRouter.post('/verification', verificationValidator, signupUser);

  
  export default registerRouter;
  