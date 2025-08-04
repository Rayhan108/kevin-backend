// import AppError from '../../errors/AppError';

import { IServices } from "./services.interface";
import ServiceModel from "./services.model";


// import httpStatus from 'http-status';


const getAllServicesFromDB = async()=>{
    const services = await ServiceModel.find().populate('contractorId');
    return services;
}

const addServicesIntoDB = async (payload:IServices) => {

// console.log("Pyload--->",payload);
  const result = (await ServiceModel.create(payload)).populate('contractorId')
  return result;
};

export const ServicesService = {
addServicesIntoDB,getAllServicesFromDB
};
