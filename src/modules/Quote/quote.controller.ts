import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../app/utils/sendResponse';

import httpStatus from 'http-status';
import { QuoteServices } from './quote.services';

// const getAllUser = catchAsync(async(req:Request,res:Response)=>{

//   const result = await UserServices.getAllUserFromDB();
//   sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User retrived succesfully!',
//       data: result,
//     });

// })

const createQuotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
//   console.log("create contractor-->",req.body);
  try {
    const result = await QuoteServices.addRequestQuoteIntoDB(req.body);

    sendResponse(res, {
      success: true,
      message: 'Succesfully send quotes',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const QuoteControllers = {
createQuotes
};
