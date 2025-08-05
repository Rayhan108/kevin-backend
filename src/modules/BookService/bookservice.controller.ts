import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../app/utils/sendResponse';

import httpStatus from 'http-status';

import { BookServices } from './bookservice.services';
import catchAsync from '../../app/utils/catchAsync';




const getSpecUserBookService = catchAsync(async(req:Request,res:Response)=>{
  const {userId}=req.params;

  const result = await BookServices.getSpecUserBookServiceFromDB(userId);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrived succesfully!',
      data: result,
    });

})
const getAllBookedServices = catchAsync(async(req:Request,res:Response)=>{


  const result = await BookServices.getAllOrderedServiceFromDB();
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrived succesfully!',
      data: result,
    });

})

const createBookService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
//   console.log("create revieew-->",req.body);
  try {
    const result = await BookServices.addBookServicesIntoDB(req.body)

    sendResponse(res, {
      success: true,
      message: 'Service Booked Sucessfully',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const BookServicesControllers = {
createBookService,getSpecUserBookService,getAllBookedServices
};
