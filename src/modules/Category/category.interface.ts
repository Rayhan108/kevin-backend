import { Model } from "mongoose";

export type TCategory ={
  category:string;
  subCategory: string[];

}

export type ICategoryModel = Model<TCategory>;