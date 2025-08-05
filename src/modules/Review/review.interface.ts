import mongoose, { Document } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId; 
  serviceId: mongoose.Types.ObjectId; 
  service: number;       
  behavior: number;     
  timeManagement: number; 
  price: number; 
  comment?: string;   
  date: Date;    
}
