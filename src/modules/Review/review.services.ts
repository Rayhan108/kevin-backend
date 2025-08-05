// import AppError from '../../errors/AppError';

import { IServices} from "../Services/services.interface";
import ServiceModel from "../Services/services.model";
import { IReview } from "./review.interface";


// import httpStatus from 'http-status';


const getAllReviewFromDB = async()=>{
    const reviews = await ServiceModel.find().populate('contractorId');
    return reviews;
}

const addReviewIntoDB = async (payload: IReview) => {
  const serviceId = payload.serviceId;
// console.log("services id",payload.serviceId);
  const service = await ServiceModel.findById(serviceId);
  if (!service) {
    throw new Error('Service not found');
  }

  // Dynamically add the review field
  (service as IServices).review = payload;

  // Save the updated service with review
  await service.save();
 console.log("services is",service);
  return service;
};


export const ReviewServices = {
addReviewIntoDB,getAllReviewFromDB
};
