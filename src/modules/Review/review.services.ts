// import AppError from '../../errors/AppError';

import mongoose, { Types } from "mongoose";
import QueryBuilder from "../../app/builder/QueryBuilder";
import AppError from "../../errors/AppError";
import ServiceModel from "../Services/services.model";
import {TReviewPayload } from "./review.interface";


import httpStatus from 'http-status';

const getAllReviewFromDB = async (query: Record<string, unknown>) => {
  // Type assertion for contractorId (ensure it's a string)
  const contractorId = query.contractorId as string;

  // Validate contractorId before proceeding
  if (!mongoose.Types.ObjectId.isValid(contractorId)) {
    throw new Error('Invalid contractorId');
  }

  // Convert contractorId to a mongoose ObjectId
  const contractorObjectId = new mongoose.Types.ObjectId(contractorId);

  // Create the query using the contractorId
  const queryBuilder = new QueryBuilder(ServiceModel.find({ "contractorId": contractorObjectId }), query);

  // Apply filters, sorting, and pagination for services
  queryBuilder
    .filter()
    .sort()
    .paginate();

  // Execute the query and populate the contractorId
  const result = await queryBuilder.modelQuery.populate('contractorId');
  // console.log("result------>", result);


  const reviews = result.flatMap(service => service.review || []);

  const totalReviews = reviews.length;

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  
  const paginatedReviews = reviews.slice((page - 1) * limit, page * limit);

  const reviewMeta = {
    page,
    limit,
    total: totalReviews,
    totalPage: Math.ceil(totalReviews / limit), 
  };

  return { meta: reviewMeta, reviews: paginatedReviews };
};

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


  const doc = await ServiceModel.findById(svcId).select("review").lean();
  if (!doc) throw new AppError(httpStatus.NOT_FOUND, "Service not found");

  if (!Array.isArray(doc.review)) {

    const normalized = doc.review && typeof doc.review === "object" ? [doc.review] : [];
    await ServiceModel.updateOne({ _id: svcId }, { $set: { review: normalized } });
  }

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
