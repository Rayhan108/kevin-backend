import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../app/utils/sendResponse';

import httpStatus from 'http-status';
import { FlagServices } from './flag.services';


// const getAllUser = catchAsync(async(req:Request,res:Response)=>{

//   const result = await UserServices.getAllUserFromDB();
//   sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User retrived succesfully!',
//       data: result,
//     });

// })

const createFlag = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
//   console.log("create contractor-->",req.body);

const flagData = req?.body
const path = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`;
flagData.image=path
  try {
    const result = await FlagServices.addFlagIntoDB(flagData);

    sendResponse(res, {
      success: true,
      message: 'Succesfully send flag',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const FlagControllers = {
createFlag
};
