import mongoose, { Document, Types } from "mongoose";



export type TReview ={
  user: mongoose.Types.ObjectId; 
  serviceId: mongoose.Types.ObjectId; 
  rating: number;           
  comment?: string;    
}


export interface IServices extends Document {
  contractorId: Types.ObjectId;
  image?: string;
  title: string;
  details: string;
  categoryName:string[];
  // subCategoryName?: string[];
  review?:TReview[]
  price: number;
    projectStatus:'pending'| 'accepted' | 'rejected';
}
