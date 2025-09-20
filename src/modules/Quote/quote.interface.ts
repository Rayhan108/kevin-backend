import mongoose, { Model } from "mongoose";

export type TREquestQuote ={
    user: mongoose.Schema.Types.ObjectId;
    contractorId:mongoose.Schema.Types.ObjectId;
  projectLocation:string;
  projectDescription: string;
  services: string[];
  status:'pending' | 'accepted'|'rejected';
  date: Date; // or a more specific type if needed
  time: Date; // or a more specific type if needed
  priceRange?: string; // Optional, as it is undefined
}

export type IRequestQuoteModel = Model<TREquestQuote>;