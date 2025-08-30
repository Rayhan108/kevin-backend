import { Document, Types } from "mongoose";


export interface IReffer extends Document {
email:string ;
link?:string;  
code:string;
}
export type TRefferReward = {
  userId:string;
code:string;
}
export interface IRefferal {
  userID: Types.ObjectId; 
  createdAt?: Date; 
  updatedAt?: Date;
}