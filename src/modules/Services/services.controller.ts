import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../app/utils/sendResponse';

import httpStatus from 'http-status';

import catchAsync from '../../app/utils/catchAsync';
import { ServicesService } from './services.service';


const getAllServices = catchAsync(async(req:Request,res:Response)=>{

  const result = await ServicesService.getAllServicesFromDB();
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Services retrived succesfully!',
      data: result,
    });

})
const getAllServicesForSpecUser = catchAsync(async(req:Request,res:Response)=>{
const contractorId = req.params.id
  const result = await ServicesService.getAllServicesForSpecUserFromDB(contractorId);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Services retrived succesfully!',
      data: result,
    });

})

const createServices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const image = req.file?.path
  // console.log("create revieew-->",req.file.path);
  try {
    const result = await ServicesService.addServicesIntoDB(req.body,image as string);

    sendResponse(res, {
      success: true,
      message: 'Service Added Sucessfully',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const acceptSingleProject = catchAsync(async(req:Request,res:Response)=>{
  const {serviceId}=req.params;

  const result = await ServicesService.acceptProject(serviceId);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service accepted succesfully!',
      data: result,
    });

})

const rejectSingleProject = catchAsync(async(req:Request,res:Response)=>{
  const {serviceId}=req.params;

  const result = await ServicesService.rejectProject(serviceId);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service rejected succesfully!',
      data: result,
    });

})


export const servicesControllers = {
createServices,getAllServices,acceptSingleProject,rejectSingleProject,getAllServicesForSpecUser
};
