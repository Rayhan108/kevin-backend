import { Schema, model } from 'mongoose';

import { IFee } from './membership.interface';


const MembershipSchema = new Schema<IFee>(
  {
    label: {
      type: String,
      enum: ["VIP Member Fee" , "Premium Member Fee","Premium Contractor Fee","VIP Contractor Fee"],
      required: true,
    },
    monthlyPrice: { type: Number, required: true },
    annuallyPrice: { type: Number, required: true },

  },
  {
    timestamps: true, 
  }
)


export const MembershipModel = model<IFee>('membership', MembershipSchema);
