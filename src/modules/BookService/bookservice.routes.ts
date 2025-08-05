/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';

import auth from '../../app/middleware/auth';
import validateRequest from '../../app/middleware/validateRequest';

import { USER_ROLE } from '../Auth/auth.constant';


import { IBookServicesSchema } from './bookservice.validation';
import { BookServicesControllers } from './bookservice.controller';



const router = express.Router();

router.post('/bookServices',
 
  auth(USER_ROLE.user),
  validateRequest(IBookServicesSchema),
  BookServicesControllers.createBookService,

);

router.get('/specUserBookServices/:userId',BookServicesControllers.getSpecUserBookService)

export const BookServicesRoutes = router;
