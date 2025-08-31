/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import { ReferClaimServices } from './referclaim.services';

// POST /api/referclaim/claim
const claimReferral = catchAsync(async (req: Request, res: Response) => {
    const meId =req?.user?.userId; 
    // console.log("req-------->",req?.user?.userId);
    // console.log("me id-------->",meId);
  const { relatedUserId, type } = req.body; // type: 'referrer' | 'referred'
  // console.log("relatedUserId, type-------->",relatedUserId, type);
  const claim = await ReferClaimServices.claimReferralReward(meId, relatedUserId, type);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reward claimed',
    data: claim,
  });
});

// GET /api/referclaim/history
const getHistory = catchAsync(async (req: Request, res: Response) => {
    const meId =req?.user?.userId; 

  const history = await ReferClaimServices.getReferralHistory(meId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Referral history',
    data: history,
  });
});

export const ReferClaimControllers = {
  claimReferral,
  getHistory,
};
