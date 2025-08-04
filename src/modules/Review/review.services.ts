// import AppError from '../../errors/AppError';

import { TReview } from "../Services/services.interface";
import ServiceModel from "../Services/services.model";
import { IReview } from "./review.interface";
import ReviewModel from "./review.model";

// import httpStatus from 'http-status';


const getAllReviewFromDB = async()=>{
    const reviews = await ReviewModel.find().populate('user');
    return reviews;
}

const addReviewIntoDB = async (payload: IReview) => {
  const serviceId = payload.services;

  const service = await ServiceModel.findById(serviceId);
  if (!service) {
    throw new Error('Service not found');
  }

  const newReview: TReview = {
    user: payload.user,
    service: payload.service,
    behavior: payload.behavior,
    timeManagement: payload.timeManagement,
    price: payload.price,
    comment: payload.comment,
    date: payload.date,
  };

  if (!Array.isArray(service.review)) {
    service.review = [] as TReview[];
  }

  (services.review as TReview[]).push(newReview);

  const updatedService = await service.save();
  return updatedService;
};

export const ReviewServices = {
addReviewIntoDB,getAllReviewFromDB
};
