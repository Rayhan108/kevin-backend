import { Schema, model, Document, Types } from 'mongoose';

export interface IReferralClaim extends Document {
  rewardFor: Types.ObjectId;     
  relatedUser: Types.ObjectId;   
  type: 'referrer' | 'referred';
  amountCents: number;
  status: 'claimed';
  claimedAt: Date;
}

const ReferralClaimSchema = new Schema<IReferralClaim>(
  {
    rewardFor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    relatedUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['referrer', 'referred'], required: true },
    amountCents: { type: Number, default: 1000 },
    status: { type: String, enum: ['claimed'], default: 'claimed' },
    claimedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);


ReferralClaimSchema.index({ rewardFor: 1, relatedUser: 1, type: 1 }, { unique: true });

export const ReferralClaimModel = model<IReferralClaim>('ReferralClaim', ReferralClaimSchema);
