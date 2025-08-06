import mongoose, { Document } from 'mongoose';

export interface IArticle extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  content: string;
  isPopular: boolean;
  isFeatured: boolean;
  image?:string;
}
