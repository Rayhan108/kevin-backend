import { Schema, model} from 'mongoose';
import { IReferralClaim } from './referclaim.interface';



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


// ReferralClaimSchema.index({ rewardFor: 1, relatedUser: 1, type: 1 }, { unique: true });

export const ReferralClaimModel = model<IReferralClaim>('ReferralClaim', ReferralClaimSchema);
