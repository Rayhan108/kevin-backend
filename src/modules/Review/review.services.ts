// import AppError from '../../errors/AppError';

import { Types } from "mongoose";
import QueryBuilder from "../../app/builder/QueryBuilder";
import AppError from "../../errors/AppError";
import ServiceModel from "../Services/services.model";
import {TReviewPayload } from "./review.interface";


import httpStatus from 'http-status';


const getAllReviewFromDB = async(query: Record<string, unknown>)=>{
  const queryBuilder = new QueryBuilder(ServiceModel.find(),query)
   queryBuilder
    .search(['email'])
    .filter()
    .sort()
    .paginate();
    const result = await queryBuilder.modelQuery.populate('contractorId');
    const meta = await queryBuilder.countTotal();

  return { meta, result };
}

export const addReviewIntoDB = async (payload: TReviewPayload) => {
  const { user, serviceId } = payload;
// console.log(payload);
  if (!Types.ObjectId.isValid(serviceId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid serviceId");
  }
  if (!Types.ObjectId.isValid(user)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user id");
  }

  const svcId = new Types.ObjectId(serviceId);
  const userId = new Types.ObjectId(user);

  // 1) read once & normalize shape of `review`
  const doc = await ServiceModel.findById(svcId).select("review").lean();
  if (!doc) throw new AppError(httpStatus.NOT_FOUND, "Service not found");

  if (!Array.isArray(doc.review)) {

    const normalized = doc.review && typeof doc.review === "object" ? [doc.review] : [];
    await ServiceModel.updateOne({ _id: svcId }, { $set: { review: normalized } });
  }

  // prepare review object (server-side date default)
  const reviewDoc = {
    user: userId,
  serviceId:svcId,
 
    rating: payload.rating,
    comment: payload.comment,

  };
  const updated = await ServiceModel.findOneAndUpdate(
    { _id: svcId, "review.user": userId },
    {
      $set: {
        "review.$[r].rating": reviewDoc.rating,
        "review.$[r].comment": reviewDoc.comment,
      
      },
    },
    {
      new: true,
      runValidators: true,
      arrayFilters: [{ "r.user": userId }],
    }
  );

  if (updated) return updated;

  // 3) no existing review by this user -> PUSH new
  const pushed = await ServiceModel.findByIdAndUpdate(
    svcId,
    { $push: { review: reviewDoc } },
    { new: true, runValidators: true }
  );

  if (!pushed) throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  return pushed;
};


export const ReviewServices = {
addReviewIntoDB,getAllReviewFromDB
};
