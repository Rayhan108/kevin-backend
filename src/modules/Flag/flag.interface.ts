import { Model } from "mongoose";

export type TFlagUser ={
  notice:string;
  message: string;

  image?: string;
}

export type IFlagUserModel = Model<TFlagUser>;