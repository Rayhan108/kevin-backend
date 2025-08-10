
import express from 'express';

import auth from '../../app/middleware/auth';

import { USER_ROLE } from '../Auth/auth.constant';

import { PlatformControllers } from './platform.controller';



const router = express.Router();

router.post('/addFee',

  auth(USER_ROLE.admin),
//   validateRequest(createFlagUserSchema),
PlatformControllers.addFee,

);

// router.get('/allUser',UserControllers.getAllUser)

export const PlatformRoutes = router;
