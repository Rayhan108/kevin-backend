import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';

import { AuthControllers } from './auth.controller';

import auth from '../../app/middleware/auth';
import { AuthValidation } from './auth.validation';
import { USER_ROLE } from './auth.constant';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthControllers.registerUser,
);
router.post('/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.userLogin
);
router.post('/changePassword',
    auth(
        USER_ROLE.contractor,
        USER_ROLE.user,
      ),
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword
)
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
router.post(
  '/forgotPass',
  validateRequest(AuthValidation.forgotPasswordSchema),
  AuthControllers.forgotPassword,
);


export const AuthRoutes = router;
