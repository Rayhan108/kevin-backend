/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReferralClaimModel } from './referclaim.model';
import { UserModel } from '../User/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const REWARD_AMOUNT = 1000; // $10

// Reward Claim
const claimReferralReward = async (
  meId: string,
  relatedUserId: string,
  type: 'referrer' | 'referred'
) => {
  const me = await UserModel.findById(meId);
  if (!me) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  if (type === 'referrer') {

    if (!me?.referrals?.map(id => String(id)).includes(relatedUserId)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid referral');
    }
  } else if (type === 'referred') {
    if (!me?.referredBy || String(me?.referredBy) !== relatedUserId) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid referred relation');
    }
  }

  // unique claim 
  const claim = await ReferralClaimModel.findOneAndUpdate(
    { rewardFor: meId, relatedUser: relatedUserId, type },
    { $setOnInsert: { amountCents: REWARD_AMOUNT, status: 'claimed', claimedAt: new Date() } },
    { new: true, upsert: true }
  );

  return claim;
};

const getReferralHistory = async (meId: string) => {
  const me = await UserModel.findById(meId).populate('referrals', 'firstName lastName email');
  if (!me) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const claims = await ReferralClaimModel.find({ rewardFor: meId }).populate('relatedUser', 'firstName lastName email').lean();

  const referrerItems = (me.referrals ?? []).map((u: any) => {
    const claimed = claims.find(c => String(c.relatedUser) === String(u._id) && c.type === 'referrer');
    return {
      relatedUser: u._id,
      name: `${u.firstName} ${u.lastName}`,
      type: 'referrer',
      amount: '$10',
      status: claimed ? 'claimed' : 'claim',
    };
  });

  let referredItem = null;
  if (me.referredBy) {
    const claimed = claims.find(
      c => String(c.relatedUser) === String(me.referredBy) && c.type === 'referred'
    );
    referredItem = {
      relatedUser: me.referredBy,
      type: 'referred',
      amount: '$10',
      status: claimed ? 'claimed' : 'claim',
    };
  }

  return { referrerItems, referredItem };
};

export const ReferClaimServices = {
  claimReferralReward,
  getReferralHistory,
};
