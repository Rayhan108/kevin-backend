// import AppError from '../../errors/AppError';

import AppError from "../../errors/AppError";
import { UserModel } from "../User/user.model";
import { IServices } from "./services.interface";
import ServiceModel from "./services.model";
import httpStatus from 'http-status';

// import httpStatus from 'http-status';


const getAllServicesFromDB = async()=>{
    const services = await ServiceModel.find().populate('contractorId');
    return services;
}

const addServicesIntoDB = async (payload:IServices) => {
const  userId = payload.contractorId

  // ✅ Step 1: Check if user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error('User (contractor) not found');
  }

  // ✅ Step 2: Check if user is actually a contractor (optional but safe)
  if (user.role !== 'contractor') {
    throw new Error('Only contractors can create services');
  }
// console.log("Pyload--->",payload);
  const result = (await ServiceModel.create(payload)).populate('contractorId')
  return result;
};

const acceptProject = async (serviceId: string) => {
  // Find the service by its _id
  const service = await ServiceModel.findById(serviceId);

  // If no service is found, throw an error
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Update projectStatus to "accepted"
  service.projectStatus = 'accepted';

  // Save the updated service
  await service.save();

  return service;  // Return the updated service
};
const rejectProject = async (serviceId: string) => {
  // Find the service by its _id
  const service = await ServiceModel.findById(serviceId);

  // If no service is found, throw an error
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Update projectStatus to "accepted"
  service.projectStatus = 'rejected';

  // Save the updated service
  await service.save();

  return service;  // Return the updated service
};


export const ServicesService = {
addServicesIntoDB,getAllServicesFromDB,acceptProject,rejectProject
};
