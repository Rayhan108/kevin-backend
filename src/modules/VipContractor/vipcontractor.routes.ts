/* eslint-disable @typescript-eslint/no-explicit-any */
import express  from 'express';
import { USER_ROLE } from '../Auth/auth.constant';
import { VipMemberControllers } from '../VipMember/vipmember.controller';
import auth from '../../app/middleware/auth';






const router = express.Router();


router.post('/checkout',auth(USER_ROLE.user,USER_ROLE.vipMember),VipMemberControllers.initiateOrderPayment)

// router.get('/allReview',ReviewControllers.getAllReview)

export const vipContractorRoutes = router;
