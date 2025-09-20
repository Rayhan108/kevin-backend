/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';

import auth from '../../app/middleware/auth';
import validateRequest from '../../app/middleware/validateRequest';

import { USER_ROLE } from '../Auth/auth.constant';
import { ReviewValidationSchema } from './review.validation';
import { ReviewControllers } from './review.controller';


const router = express.Router();

router.post('/addReview',

  auth(USER_ROLE.user),
  validateRequest(ReviewValidationSchema),
  ReviewControllers.createReview,

);

router.get('/allReview',auth(
    USER_ROLE.contractor,
    USER_ROLE.vipContractor,
  ),ReviewControllers.getAllReview)

export const reviewRoutes = router;
