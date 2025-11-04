/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from 'mongoose';
import QueryBuilder from '../../app/builder/QueryBuilder';
import AppError from '../../errors/AppError';
import {
  FeedbackReplyUpdate,
  TEditContractorProfile,
  TEditProfile,
} from './user.constant';
import { TBecomeContractorInput, TReviewsPayload } from './user.interface';
import { UserModel } from './user.model';
import httpStatus from 'http-status';
const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const changeProfilePicture = async (
  id: string,
  payload: { image: string }, // ✅ changed from status to image
) => {
  // console.log('payload--->', payload);

  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};
const updateProfileFromDB = async (id: string, payload: TEditProfile) => {


  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};
const updateContractorProfileFromDB = async (
  id: string,
  payload: TEditContractorProfile,
) => {
  // console.log('payload--->', payload);

  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
console.log("result----->",result);
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};
const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(UserModel.find(), query);
  queryBuilder
    .search([
      'phone',
      'email',
      'lastName',
      'firstName',
      'servicesYouProvide',
      'subServices',
    ])
    .filter()
    .sort()
    .paginate();

      queryBuilder.modelQuery = queryBuilder.modelQuery.populate({
    path: 'review.reviewBy',
    model: 'User',
    select: 'firstName lastName image email', // optional
    options: { /* you can add limit/sort on populated docs if needed */ },
  }); 
  const result = await queryBuilder.modelQuery.lean();
  const meta = await queryBuilder.countTotal();
  return { meta, result };
};

const updateUserToContractor = async (payload: TBecomeContractorInput) => {
  const user = await UserModel.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user.role === 'contractor') {
    throw new AppError(
      httpStatus.CONFLICT,
      'This user is already a contractor!',
    );
  }

  // Update fields
  const updatedUser = await UserModel.findOneAndUpdate(
    { email: payload.email },
    {
      role: 'contractor',
      location: payload.location,
      zip: payload.zip,
      companyName: payload.companyName,
      servicesYouProvide: payload.servicesYouProvide,
      subServices: payload.subServices || [],
    },
    { new: true }, // return the updated document
  );

  return updatedUser;
};
const addReportToContractor = async (
  userId: string,
  report: {
    reason?: string;
    feedback?: string;
    image?: string;
  },
) => {
  // console.log("report--->",report);
  // console.log("id--->",userId);
  // First, find the user and check role
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role == 'user') {
    throw new AppError(httpStatus.CONFLICT, 'Only users can be reported');
  }

  // Update the report field only
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        report, // this will overwrite any existing report object
      },
    },
    { new: true },
  );

  return updatedUser;
};
const addFeedbackToContractor = async (
  userId: string,
  feedback: {
    reason?: string;
    feedback?: string;
    image?: string;
  },
) => {
  // console.log("report--->",report);
  // console.log("id--->",userId);
  // First, find the user and check role
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role == 'admin') {
    throw new AppError(httpStatus.CONFLICT, 'Only admin can gave feedback');
  }

  // Update the report field only
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        feedback, // this will overwrite any existing report object
      },
    },
    { new: true },
  );

  return updatedUser;
};

const getAllFeedbackFromDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(UserModel.find(), query);
  queryBuilder.filter().sort();

  const users = await queryBuilder.modelQuery;

  // Step 1: Collect all feedbacks
  const allFeedbacks: any[] = [];

  users.forEach((user) => {
    if (user.feedback) {
      const feedbackObj = {
        userId: user._id,
        name: user.firstName,
        userImg: user.image,
        email: user.email,
        role: user.role,
        message: user.feedback.message || null,
        image: user.feedback.image || null,
        reply: user.feedback.reply || null,
      };

      // ✅ Check if this feedback has any actual data
      const hasMessage = !!feedbackObj.message;
      const hasImage = !!feedbackObj.image;
      const hasReplyMessage = !!feedbackObj.reply?.message;
      const hasReplyImage = !!feedbackObj.reply?.image;

      if (hasMessage || hasImage || hasReplyMessage || hasReplyImage) {
        allFeedbacks.push(feedbackObj);
      }
    }
  });

  // Step 2: Pagination logic
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const paginatedFeedbacks = allFeedbacks.slice(skip, skip + limit);

  // Step 3: Meta info
  const meta = {
    total: allFeedbacks.length,
    page,
    limit,
    totalPages: Math.ceil(allFeedbacks.length / limit),
  };

  return { meta, data: paginatedFeedbacks };
};

export const replyFeedbackByAdmin = async (
  userId: string,
  update: FeedbackReplyUpdate,
) => {
  if (!update || Object.keys(update).length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Nothing to update');
  }

  const user = await UserModel.findById(userId).select('_id');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { $set: update },
    { new: true, runValidators: true, projection: { feedback: 1 } },
  );

  return updatedUser;
};

const getSpecificUserByCustomerId = async (id: string) => {
  const result = await UserModel.findOne({ stripeCustomerId: id })
    .populate({
      path: 'survey',
      select: '',
    })
    .select('-password -verification');
  return result;
};
const deleteUserFromDB = async (id: string) => {
  const user = await UserModel.findByIdAndDelete(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  return user; // return deleted user if needed
};




const getDashboardStatsFromDB = async () => {
  const users = await UserModel.find();

  // total user count
  const totalUsers = users.length;

  // role-wise stats
  const stats = users.reduce(
    (acc, user) => {
      if (user.role === "user") acc.totalClient++;
      if (user.role === "contractor") acc.totalContractor++;
      if (user.role === "vipContractor") acc.totalVipContractor++;
      if (user.role === "vipMember") acc.totalVipMember++;
      if (user.role === "admin") acc.totalAdmin++;
      return acc;
    },
    {
      totalClient: 0,
      totalContractor: 0,
      totalVipContractor: 0,
      totalVipMember: 0,
      totalAdmin: 0,
    }
  );

  const finalStats = {
    totalUsers,
    ...stats,
  };

  // console.log("Dashboard Stats ---->", finalStats);
  return finalStats;
};



 const updateUserStatusService = async (userId: string, status: string) => {
  // console.log(userId,status);
  const user = await UserModel.findById(userId)
  const role = user?.role
  let newRole = ''
  // console.log("user role----->",role);
  if(role === 'contractor'){
     newRole = 'vipContractor'
  }else{
    newRole = 'vipMember'
  }
  // console.log("new role",newRole);
  try {
    // Find the user and update the status
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
     { 'subscription.status': status,role:newRole}, 

      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (error) {
    throw new Error('Error updating user status: ');
  }
};

export const addReviewIntoDB = async (payload: TReviewsPayload) => {
  const { reviewBy, userId, rating, comment } = payload;

  // Basic validation
  if (!Types.ObjectId.isValid(userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid userId');
  }
  if (!Types.ObjectId.isValid(reviewBy)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid reviewBy');
  }

  const userObjId = new Types.ObjectId(userId);
  const reviewerObjId = new Types.ObjectId(reviewBy);

  // Ensure doc exists & normalize review field if needed (one-time guard)
  const doc = await UserModel.findById(userObjId).select('review').lean();
  if (!doc) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  if (!Array.isArray(doc.review)) {
    const normalized = doc.review && typeof doc.review === 'object' ? [doc.review] : [];
    await UserModel.updateOne({ _id: userObjId }, { $set: { review: normalized } });
  }

  // Easy: always push (multiple reviews allowed)
  const reviewDoc = {
    reviewBy: reviewerObjId,  
    userId: userObjId,     
    rating,
    comment: comment ?? '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const pushed = await UserModel.findByIdAndUpdate(
    userObjId,
    { $push: { review: reviewDoc } },
    { new: true, runValidators: true },
  );

  if (!pushed) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  return pushed;
};

const getAllReviewFromDB = async (query: Record<string, unknown>) => {
  const userId = query.userId as string;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId');
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);

  //  Fix: fetch by _id (not userId)
  const user = await UserModel.findById(userObjectId)
    .populate({ path: 'review.reviewBy', model: 'User' })
    .lean();

  if (!user) {
    return { meta: { page: 1, limit: 10, total: 0, totalPage: 0 }, reviews: [] };
  }

  const reviews = Array.isArray(user.review) ? user.review : [];

  // simple pagination (in-memory)
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const total = reviews.length;
  const totalPage = Math.ceil(total / limit);

  const paginated = reviews.slice((page - 1) * limit, page * limit);

  return {
    meta: { page, limit, total, totalPage },
    reviews: paginated,
  };
};






export const UserServices = {
  changeStatus,
  getSingleUserFromDB,
  getAllUserFromDB,
  updateUserToContractor,
  changeProfilePicture,
  addReportToContractor,
  addFeedbackToContractor,
  updateProfileFromDB,
  deleteUserFromDB,
  replyFeedbackByAdmin,
  getSpecificUserByCustomerId,
  updateContractorProfileFromDB,
  getAllFeedbackFromDB,
  getDashboardStatsFromDB,
  updateUserStatusService,addReviewIntoDB,getAllReviewFromDB
};
