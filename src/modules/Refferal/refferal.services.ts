// import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import AppError from "../../errors/AppError";
import { UserModel } from "../User/user.model";
import { IReffer } from "./refferal.interface";
import mongoose from 'mongoose';



// import httpStatus from 'http-status';


// const getAllReviewFromDB = async()=>{
//     const reviews = await ServiceModel.find().populate('contractorId');
//     return reviews;
// }

const addReferIntoDB = async (payload: IReffer) => {
  const { email, code } = payload;

  // 1. Find the user who owns this referral code
  const referrer = await UserModel.findOne({ refercode: code });

  if (!referrer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid referral code');
  }

  const referByUserId = referrer._id.toString();

  // 2. Find the new user by email
  const newUser = await UserModel.findOne({ email });

  if (!newUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'New user not found');
  }

  // ❌ Prevent self-referral
  if (referrer._id.toString() === newUser._id.toString()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You cannot refer yourself.');
  }

  // 3. If already referred, skip or throw
  if (newUser.referredBy) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user has already been referred');
  }

  // 4. Set referredBy field and save
  newUser.referredBy = new mongoose.Types.ObjectId(referByUserId);
  await newUser.save();

  // 5. Add newUser to referrer's referrals list (only if not already present)
  const newUserId = new mongoose.Types.ObjectId(newUser._id);
  referrer.referrals = referrer.referrals ?? [];

  if (!referrer.referrals.includes(newUserId)) {
    referrer.referrals.push(newUserId);
    await referrer.save();
  }

  return {
    // message: 'Referral linked successfully',
    // referredBy: referrer.email,
    // newUser: newUser.email,
    referrer
  };
};


export const ReferServices = {
addReferIntoDB,
};
