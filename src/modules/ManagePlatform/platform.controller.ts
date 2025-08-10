import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../app/utils/sendResponse';

import httpStatus from 'http-status';
import { PlatformServices } from './platform.services';



// const getAllUser = catchAsync(async(req:Request,res:Response)=>{

//   const result = await UserServices.getAllUserFromDB();
//   sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User retrived succesfully!',
//       data: result,
//     });

// })

const addFee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
//   console.log("create contractor-->",req.body);
  try {
    const result = await PlatformServices.addPlatformFeeIntoDB(req.body);

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

export const PlatformControllers = {
addFee
};
