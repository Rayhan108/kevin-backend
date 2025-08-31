import { Document, Types } from 'mongoose';

export interface IReferralClaim extends Document {
  rewardFor: Types.ObjectId;      
  referrer: Types.ObjectId;      
  referredUser: Types.ObjectId; 
  amountCents: number;            // $10 => 1000
  status: 'claimed' | 'revoked'; 
  claimedAt: Date;

}
