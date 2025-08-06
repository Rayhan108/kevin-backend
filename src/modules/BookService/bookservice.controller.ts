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


const updateStatusAsBooked = catchAsync(async(req:Request,res:Response)=>{
  const {serviceId}=req.params;

  const result = await BookServices.updateProjectStatusAsBooked(serviceId);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service is Booked succesfully!',
      data: result,
    });

})
const updateStatusAsOnTheWay = catchAsync(async(req:Request,res:Response)=>{
  const {serviceId}=req.params;

  const result = await BookServices.updateProjectStatusOnTheWay(serviceId);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Contractor is on the way',
      data: result,
    });

})
const updateStatusAsStarted = catchAsync(async(req:Request,res:Response)=>{
  const {serviceId}=req.params;

  const result = await BookServices.updateProjectStatusStarted(serviceId);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Contractor is started his work',
      data: result,
    });

})
const updateStatusAsFinished = catchAsync(async(req:Request,res:Response)=>{
  const {serviceId}=req.params;

  const result = await BookServices.updateProjectStatusDone(serviceId);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Contractor is finished his work',
      data: result,
    });

})
const updateAssignTask = catchAsync(async(req:Request,res:Response)=>{
  const payload=req.body;

  const result = await BookServices.updateAssignedTaskInDB(payload);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task is updated',
      data: result,
    });

})
const rejectSingleProject = catchAsync(async(req:Request,res:Response)=>{
  const {serviceId}=req.params;

  const result = await BookServices.rejectProject(serviceId);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book Service is rejected succesfully!',
      data: result,
    });

})


export const BookServicesControllers = {
createBookService,getSpecUserBookService,getAllBookedServices,rejectSingleProject,updateStatusAsBooked,updateStatusAsOnTheWay,updateStatusAsStarted,updateStatusAsFinished,updateAssignTask
};
