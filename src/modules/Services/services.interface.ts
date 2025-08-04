import mongoose, { Document, Types } from "mongoose";


export interface IBookServices extends Document {
  user: mongoose.Types.ObjectId; 
  serviceName: string;       
  zip: string;     
  description?: string;   
  dateRange: string; 
  timeSlot:string;
  exactDate: Date;
  todoList:[];
  status:'booked'|'onTheWay'|'started'|'done';
  projectStatus:'accepted'|'rejected';
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
  image: string;
  title: string;
  details: string;
  categoryName: string;
  subCategoryName: string;
  review?:TReview 
  price: number;
}
