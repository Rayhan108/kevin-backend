import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../app/utils/sendResponse';

import httpStatus from 'http-status';
import { VipMemberServices } from './vipmember.services';




// const getAllReview = catchAsync(async(req:Request,res:Response)=>{

//   const result = await ReviewServices.getAllReviewFromDB();
//   sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Review retrived succesfully!',
//       data: result,
//     });

// })

const askAProQues = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
const userId = req.params.id
const imageUrl = req.file?.path
const payload = {
    ...req.body,
    user:userId,
    image:imageUrl
}

  try {
    const result = await VipMemberServices.askingQues(payload)

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

export const VipMemberControllers = {
askAProQues
};
