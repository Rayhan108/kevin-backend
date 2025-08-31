import mongoose, { Document } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

export type TReviewPayload = {
  user: string;
  serviceId: string;
  rating: number;
  comment?: string;
};
