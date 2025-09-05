import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../app/utils/sendResponse';

import httpStatus from 'http-status';
import { QuoteServices } from './quote.services';
import catchAsync from '../../app/utils/catchAsync';

const getAllQuoteForSpecContctr = catchAsync(async(req:Request,res:Response)=>{
  const meId = req?.user?.userId;
  const result = await QuoteServices.getAllQuoteForSpecContctrFromDB(meId);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Quotes retrived succesfully!',
      data: result,
    });

})

const createQuotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //   console.log("create contractor-->",req.body);
    const userId = req?.user?.userId;
    const data= req?.body
    const payload={
...data,user:userId
    }
  try {
    const result = await QuoteServices.addRequestQuoteIntoDB(payload);

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

// dashboard stats
const getDashStats = catchAsync(async (req: Request, res: Response) => {
  const meId = req?.user?.userId;

  const result = await QuoteServices.dashboardStatsFromDB(meId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboard stats retrive successfully',
    data: result,
  });
});

export const QuoteControllers = {
  createQuotes,
  getDashStats,
  getAllQuoteForSpecContctr,
};
