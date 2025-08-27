// import AppError from '../../errors/AppError';

import QueryBuilder from "../../app/builder/QueryBuilder";
import { IServices} from "../Services/services.interface";
import ServiceModel from "../Services/services.model";
import { IReview } from "./review.interface";


// import httpStatus from 'http-status';


const getAllReviewFromDB = async(query: Record<string, unknown>)=>{
  const queryBuilder = new QueryBuilder(ServiceModel.find(),query)
   queryBuilder
    .filter()
    .sort()
    .paginate();
    const result = await queryBuilder.modelQuery.populate('contractorId');
    const meta = await queryBuilder.countTotal();

  return { meta, result };
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
//  console.log("services is",service);
  return service;
};


export const ReviewServices = {
addReviewIntoDB,getAllReviewFromDB
};
