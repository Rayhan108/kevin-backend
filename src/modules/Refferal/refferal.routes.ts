/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';

import auth from '../../app/middleware/auth';
import validateRequest from '../../app/middleware/validateRequest';

import { USER_ROLE } from '../Auth/auth.constant';
import { refferValidationSchema } from './refferal.validation';
import { ReferControllers } from './refferal.controller';



const router = express.Router();

router.post('/referal',

  auth(USER_ROLE.user,USER_ROLE.contractor,USER_ROLE.vipContractor,USER_ROLE.vipMember),
  validateRequest(refferValidationSchema),
 ReferControllers.createRefer,

);
//get reward


router.post('/send-referal',

 ReferControllers.sendReferCode,

);

// router.get('/allReview',ReviewControllers.getAllReview)

export const referRoutes = router;
