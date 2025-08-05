// import AppError from '../../errors/AppError';

import AppError from "../../errors/AppError";
import { UserModel } from "../User/user.model";
import { IBookServices } from "./bookservice.interface";


import httpStatus from 'http-status';
import BookServiceModel from "./bookservice.model";


// const getAllServicesFromDB = async()=>{
//     const services = await ServiceModel.find().populate('contractorId');
//     return services;
// }

const addBookServicesIntoDB = async (payload:IBookServices) => {
    // console.log("Services---------->",payload);
 
const  userId = payload.user

  // ✅ Step 1: Check if user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND,'User  not found');
  }

// console.log("Pyload--->",payload);
  const result = (await BookServiceModel.create(payload)).populate('user')
  return result;
};

export const BookServices = {
addBookServicesIntoDB,
};
