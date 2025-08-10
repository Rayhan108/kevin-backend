// import AppError from '../../errors/AppError';

import { TFlagUser } from "./flag.interface";
import { FlagModel } from "./flag.model";

// import httpStatus from 'http-status';


// const getAllUserFromDB = async()=>{
//     const result = await UserModel.find();
//     return result;
// }

const addFlagIntoDB = async (payload:TFlagUser) => {

// console.log("Pyload--->",payload);
  const result = await FlagModel.create(payload)
  return result;
};

export const FlagServices = {
addFlagIntoDB
};
