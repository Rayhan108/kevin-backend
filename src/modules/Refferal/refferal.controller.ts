import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../app/utils/sendResponse';

import httpStatus from 'http-status';

import { ReferServices } from './refferal.services';


// const getAllReview = catchAsync(async(req:Request,res:Response)=>{

//   const result = await ReviewServices.getAllReviewFromDB();
//   sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Review retrived succesfully!',
//       data: result,
//     });

// })

const createRefer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("create refere-->",req.body);
  const code = req.query.code
//   console.log("code--->",req.query.code);
const data = {
    ...req.body,code
}
  try {
    const result = await ReferServices.addReferIntoDB(data);

    sendResponse(res, {
      success: true,
      message: 'Review Sent Successfull',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const ReferControllers = {
createRefer
};
