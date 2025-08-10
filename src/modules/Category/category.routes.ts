/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';

import auth from '../../app/middleware/auth';


import { USER_ROLE } from '../Auth/auth.constant';

import { CategoryControllers } from './category.controller';



const router = express.Router();

router.post('/add-category',

  auth(USER_ROLE.admin),
//   validateRequest(createFlagUserSchema),
CategoryControllers.createCategory,

);

router.get('/all-category',CategoryControllers.getAllCategory)

export const CategoryRoutes = router;
