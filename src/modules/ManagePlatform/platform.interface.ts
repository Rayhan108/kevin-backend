import { Model } from "mongoose";

export type TPlatFormFee ={
  amount:number;
type: 'percentage' | 'flat'

}

export type IPlatFormFeeModel = Model<TPlatFormFee>;