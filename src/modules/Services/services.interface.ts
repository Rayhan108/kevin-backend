import mongoose, { Document, Types } from "mongoose";

interface SubCategory {
  label: string;
  value: string;
  parent: string; // The parent category
}

interface Category {
  label: string;
  value: string;
  subCategories: SubCategory[];
}


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
  categoryName:Category[];
  // subCategoryName?: string[];
  review?:TReview 
  price: number;
    projectStatus:'pending'| 'accepted' | 'rejected';
}
