/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';

import auth from '../../app/middleware/auth';
import validateRequest from '../../app/middleware/validateRequest';
import { changeStatusValidationSchema } from './user.validation';
import { USER_ROLE } from '../Auth/auth.constant';
import { UserControllers } from './user.controller';


const router = express.Router();

router.post(
  '/change-status/:id',
  auth(USER_ROLE.user),
  validateRequest(changeStatusValidationSchema),
  UserControllers.changeStatus,
);
router.get('/:userId',UserControllers.getSingleUser)
router.get('/allUser',UserControllers.getAllUser)

export const UserRoutes = router;
