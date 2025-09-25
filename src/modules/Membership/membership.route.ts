
import express from 'express';

import auth from '../../app/middleware/auth';

import { USER_ROLE } from '../Auth/auth.constant';
import { MembershipControllers } from './membership.controller';





const router = express.Router();

router.post('/addFee',

  auth(USER_ROLE.admin),
//   validateRequest(createFlagUserSchema),
MembershipControllers.addFee,

);
router.get('/getFees',

  auth(USER_ROLE.admin),
//   validateRequest(createFlagUserSchema),
MembershipControllers.getFees,

);

// router.get('/allUser',UserControllers.getAllUser)

export const MembershipRoutes = router;
