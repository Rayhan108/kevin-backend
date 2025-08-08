import mongoose, { Document } from 'mongoose';

export interface IVipMember extends Document {
  user: mongoose.Types.ObjectId;

  subject: string;
  question: string;
  image: string;
}
