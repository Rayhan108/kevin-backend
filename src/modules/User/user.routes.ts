/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';

import auth from '../../app/middleware/auth';
import validateRequest from '../../app/middleware/validateRequest';
import { userValidation } from './user.validation';
import { USER_ROLE } from '../Auth/auth.constant';
import { UserControllers } from './user.controller';
import { upload } from '../../app/middleware/upload';


const router = express.Router();

router.post(
  '/change-status/:id',
  auth(USER_ROLE.user),
  validateRequest(userValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);
router.patch(
  '/change-profilePic/:id',
       upload.single('image'),
  
  auth(USER_ROLE.user,USER_ROLE.contractor),
  // validateRequest(userValidation.changeStatusValidationSchema),
  UserControllers.changeProPic,
);
router.post(
  '/create-contractor',
  auth(USER_ROLE.user),
  validateRequest(userValidation.becomeContractorValidationSchema),
  UserControllers.createContractor,
);
router.get('/retrive/:userId',UserControllers.getSingleUser)

router.patch('/report/:userId',
    upload.single('image'),
       (req: Request, res: Response, next: NextFunction) => {
      // console.log("req--->",req.body);
   if(req.body.data){
         req.body = JSON.parse(req.body.data);
   }
        next();
    },
  UserControllers.addReport)

router.patch('/feedback/:userId',
    upload.single('image'),
       (req: Request, res: Response, next: NextFunction) => {
      // console.log("req--->",req.body);
   if(req.body.data){
         req.body = JSON.parse(req.body.data);
   }
        next();
    },
      auth(USER_ROLE.admin),
  UserControllers.addFeedback)

router.get('/allUser',UserControllers.getAllUser)

export const UserRoutes = router;
