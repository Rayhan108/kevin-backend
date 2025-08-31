import express from 'express';
import { ReferClaimControllers } from './referclaim.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../Auth/auth.constant';

const router = express.Router();


router.post('/claim',  auth(
    USER_ROLE.user,
    USER_ROLE.vipMember,
    USER_ROLE.contractor,
    USER_ROLE.vipContractor,
    USER_ROLE.admin,
  ), ReferClaimControllers.claimReferral);


router.get('/history',auth(
    USER_ROLE.user,
    USER_ROLE.vipMember,
    USER_ROLE.contractor,
    USER_ROLE.vipContractor,
    USER_ROLE.admin,
  ), ReferClaimControllers.getHistory);

export const ReferClaimRoutes = router;
