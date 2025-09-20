/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReferralClaimModel } from './referclaim.model';
import { UserModel } from '../User/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const REWARD_AMOUNT = 1000; // $10
const toId = (v: any): string => {
  if (!v) return '';
  // populated document: { _id, ... }
  if (typeof v === 'object' && ('_id' in v)) return String((v as any)._id);
  // raw ObjectId or string
  return String(v);
};

// Reward Claim
const claimReferralReward = async (
  meId: string,
  relatedUserId: string,
  type: 'referrer' | 'referred',
) => {
  const me = await UserModel.findById(meId);
  if (!me) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  if (type === 'referrer') {
    if (!me?.referrals?.map((id) => String(id)).includes(relatedUserId)) {
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
    {
      $setOnInsert: {
        amountCents: REWARD_AMOUNT,
        status: 'claimed',
        claimedAt: new Date(),
      },
    },
    { new: true, upsert: true },
  );

  return claim;
};

export const getReferralHistory = async (meId: string) => {
  // Read-only: use lean() for perf
  const me = await UserModel.findById(meId)
    .populate('referrals', 'firstName lastName email')
    .lean();

  if (!me) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  // Keep claims lean. You don't need populate() for comparison.
  const claims = await ReferralClaimModel.find({ rewardFor: meId })
    .select('relatedUser type status')
    .lean();

  const referrerItems = (me.referrals ?? []).map((u: any) => {
    const isClaimed = claims.some(
      (c) => toId(c.relatedUser) === toId(u._id) && c.type === 'referrer'
    );

    return {
      relatedUser: u._id,
      name: `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim(),
      type: 'referrer' as const,
      amount: '$10',
      status: isClaimed ? 'claimed' : 'claim',
    };
  });

  let referredItem: null | {
    relatedUser: string;
    name: string;
    type: 'referred';
    amount: string;
    status: 'claimed' | 'claim';
  } = null;

  if (me.referredBy) {
    const isClaimed = claims.some(
      (c) => toId(c.relatedUser) === toId(me.referredBy) && c.type === 'referred'
    );

    referredItem = {
      relatedUser: toId(me.referredBy),
      name: `${me.firstName ?? ''} ${me.lastName ?? ''}`.trim(),
      type: 'referred',
      amount: '$10',
      status: isClaimed ? 'claimed' : 'claim',
    };
  }

  return { referrerItems, referredItem };
};





const getAllReferClaimedFromDB = async (userId: string) => {
  // console.log("userId----->",userId);
  const result = await ReferralClaimModel.find({ rewardFor: userId }).lean();
  // console.log("result-------->",result);

  return result;
};

export const ReferClaimServices = {
  claimReferralReward,
  getReferralHistory,
  getAllReferClaimedFromDB,
};
