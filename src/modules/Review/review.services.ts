// import AppError from '../../errors/AppError';

import { IReview } from "./review.interface";
import ReviewModel from "./review.model";

// import httpStatus from 'http-status';


const getAllReviewFromDB = async()=>{
    const reviews = await ReviewModel.find().populate('user');
    return reviews;
}

const addReviewIntoDB = async (payload:IReview) => {

// console.log("Pyload--->",payload);
  const result = (await ReviewModel.create(payload)).populate('user')
  return result;
};

export const ReviewServices = {
addReviewIntoDB,getAllReviewFromDB
};
