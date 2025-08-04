// import AppError from '../../errors/AppError';

import { UserModel } from "../User/user.model";
import { IServices } from "./services.interface";
import ServiceModel from "./services.model";


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

export const ServicesService = {
addServicesIntoDB,getAllServicesFromDB
};
