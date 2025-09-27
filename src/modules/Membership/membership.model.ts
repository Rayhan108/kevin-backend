import { Schema, model } from 'mongoose';

import { IFee } from './membership.interface';


const MembershipSchema = new Schema<IFee>(
  {
    label: {
      type: String,
      enum: ["VIP Member Fee" ,"Premium Member Fee","Premium Contractor Fee","VIP Contractor Fee"],
      required: true,
    },
    monthlyValue: { type: Number, required: true },
    yearlyValue: { type: Number, required: true },
    // monthlyPrice: { type: String, required: true },
    // annuallyPrice: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
)


export const MembershipModel = model<IFee>('membership', MembershipSchema);
