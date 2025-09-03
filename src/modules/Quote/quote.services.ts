// import AppError from '../../errors/AppError';

// import httpStatus from 'http-status';
import { Types } from 'mongoose';
import ArticleModel from '../Article/article.model';
import ServiceModel from '../Services/services.model';
import { TREquestQuote } from './quote.interface';
import { RequestQuoteModel } from './quote.model';

// const getAllUserFromDB = async()=>{
//     const result = await UserModel.find();
//     return result;
// }

const addRequestQuoteIntoDB = async (payload:TREquestQuote) => {

// console.log("Pyload--->",payload);
  const result = await RequestQuoteModel.create(payload)
  return result;
};

// dashboard stats

const dashboardStatsFromDB = async(id:string)=>{
 if (!id || !Types.ObjectId.isValid(id)) {
    throw new Error("Invalid user id ");
  }
  const contractorId = new Types.ObjectId(id);

  // Build filters
  const svcFilter = { contractorId };
  const quoteFilter = { contractorId };
  const articleFilter = { user: contractorId };

  // Parallelize all counts
  const [totalServices, totalQuotes, totalArticles, reviewAgg] = await Promise.all([
    ServiceModel.countDocuments(svcFilter),
    RequestQuoteModel.countDocuments(quoteFilter),
    ArticleModel.countDocuments(articleFilter),
    // Efficient review count:
    // For each matching service, compute size(review || []) then sum up.
    ServiceModel.aggregate<{ _id: null; totalReviews: number }>([
      { $match: svcFilter },
      { $project: { reviewsCount: { $size: { $ifNull: ["$review", []] } } } },
      { $group: { _id: null, totalReviews: { $sum: "$reviewsCount" } } },
      { $project: { _id: 0, totalReviews: 1 } },
    ]),
  ]);

  const totalReviews = reviewAgg[0]?.totalReviews ?? 0;

  return {
    totalServices,
    totalQuotes,
    totalReviews,
    totalArticles,
  };

}










export const QuoteServices = {
addRequestQuoteIntoDB,dashboardStatsFromDB
};
