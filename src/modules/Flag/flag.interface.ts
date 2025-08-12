import mongoose, { Model } from "mongoose";

export type TFlagUser ={
   user: mongoose.Types.ObjectId; 
  notice:string;
  message: string;

  image?: string;
}

export type IFlagUserModel = Model<TFlagUser>;