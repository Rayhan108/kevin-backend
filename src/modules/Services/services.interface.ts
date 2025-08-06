import mongoose, { Document, Types } from "mongoose";




export type TReview ={
      user: mongoose.Types.ObjectId; 
      service: number;       
      behavior: number;     
      timeManagement: number; 
      price: number; 
      comment?: string;   
      date: Date;    
}


export interface IServices extends Document {
  contractorId: Types.ObjectId;
  image?: string;
  title: string;
  details: string;
  categoryName: string;
  subCategoryName: string;
  review?:TReview 
  price: number;
    projectStatus:'pending'| 'accepted' | 'rejected';
}
