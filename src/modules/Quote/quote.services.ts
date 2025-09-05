// import AppError from '../../errors/AppError';

// import httpStatus from 'http-status';
import { Types } from 'mongoose';
import ArticleModel from '../Article/article.model';
import ServiceModel from '../Services/services.model';
import { TREquestQuote } from './quote.interface';
import { RequestQuoteModel } from './quote.model';

const getAllQuoteForSpecContctrFromDB = async (id: string) => {
  if (!id || !Types.ObjectId.isValid(id)) {
    throw new Error('Invalid user id ');
  }
  const contractorId = new Types.ObjectId(id);

  const result = await RequestQuoteModel.find({ contractorId }).populate('contractorId').populate('user');
  // console.log("res------>",result);

  return result;
};

const addRequestQuoteIntoDB = async (payload: TREquestQuote) => {
  console.log("Pyload--->",payload);
  const result = await RequestQuoteModel.create(payload);
  return result;
};

// dashboard stats

const dashboardStatsFromDB = async (id: string) => {
  if (!id || !Types.ObjectId.isValid(id)) {
    throw new Error('Invalid user id ');
  }
  const contractorId = new Types.ObjectId(id);

  // Build filters
  const svcFilter = { contractorId };
  const quoteFilter = { contractorId };
  const articleFilter = { user: contractorId };

  // Parallelize all counts
  const [totalServices, totalQuotes, totalArticles, reviewAgg] =
    await Promise.all([
      ServiceModel.countDocuments(svcFilter),
      RequestQuoteModel.countDocuments(quoteFilter),
      ArticleModel.countDocuments(articleFilter),

      // Aggregate total reviews and calculate average rating
      ServiceModel.aggregate<{ totalReviews: number; totalRating: number }>([
        { $match: svcFilter },
        { $unwind: '$review' }, // Unwind review array to process each review
        {
          $group: {
            _id: null,
            totalReviews: { $sum: 1 }, // Count reviews
            totalRating: { $sum: '$review.rating' }, // Sum up all ratings
          },
        },
        {
          $project: {
            _id: 0,
            totalReviews: 1,
            totalRating: 1,
          },
        },
      ]),
    ]);

  const totalReviews = reviewAgg[0]?.totalReviews ?? 0;
  const totalRating = reviewAgg[0]?.totalRating ?? 0;

  // Calculate average rating
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  return {
    totalServices,
    totalQuotes,
    totalReviews,
    averageRating,
    totalArticles,
  };
};

export const QuoteServices = {
  addRequestQuoteIntoDB,
  dashboardStatsFromDB,
  getAllQuoteForSpecContctrFromDB,
};
