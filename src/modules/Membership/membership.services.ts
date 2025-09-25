// import AppError from '../../errors/AppError';

import { IFee } from "./membership.interface";
import { MembershipModel } from "./membership.model";



// import httpStatus from 'http-status';


const addPlatformFeeIntoDB = async (payload:IFee) => {

// console.log("Pyload--->",payload);
  const result = await MembershipModel.findOneAndUpdate(
      { label: payload.label }, 
      { $set: payload },     
      { new: true, upsert: true } 
                              
    );
  return result;
};
const getPlatformFeeFromDB = async () => {

// console.log("Pyload--->",payload);
  const result = await MembershipModel.find()
  return result;
};

export const MembershipServices = {
addPlatformFeeIntoDB,getPlatformFeeFromDB
};
