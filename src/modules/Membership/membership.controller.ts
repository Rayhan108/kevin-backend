import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../app/utils/sendResponse';

import httpStatus from 'http-status';
import { MembershipServices } from './membership.services';




const addFee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
//   console.log("create contractor-->",req.body);
  try {
    const result = await MembershipServices.addPlatformFeeIntoDB(req.body);

    sendResponse(res, {
      success: true,
      message: 'Succesfully added fee',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getFees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
// console.log("create contractor-->",req.body);
  try {
    const result = await MembershipServices.getPlatformFeeFromDB();

    sendResponse(res, {
      success: true,
      message: 'Succesfully retrived fees',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const MembershipControllers = {
addFee,getFees
};
