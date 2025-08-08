import mongoose, { Schema, model } from 'mongoose';
import { IVipMember } from './vipmember.interface';


const vipMemberSchema = new Schema<IVipMember>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export const VipMemberModel = model<IVipMember>('VipMember', vipMemberSchema);
