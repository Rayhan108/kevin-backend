// import AppError from '../../errors/AppError';

import { TPlatFormFee } from "./platform.interface";
import PlatformModel from "./platform.model";


// import httpStatus from 'http-status';


// const getAllUserFromDB = async()=>{
//     const result = await UserModel.find();
//     return result;
// }

const addPlatformFeeIntoDB = async (payload:TPlatFormFee) => {

// console.log("Pyload--->",payload);
  const result = await PlatformModel.create(payload)
  return result;
};

export const PlatformServices = {
addPlatformFeeIntoDB
};
