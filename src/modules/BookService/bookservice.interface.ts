import mongoose, { Document } from 'mongoose';

// Define the interface for the document
export interface IBookServices extends Document {
  user: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  serviceType: string;
  location: string;
  zip: string;
  projectDescription?: string;
  // dateRange: string;
  // timeSlot: string;
  date: string;
  time: string;
  todoList: string[];
  status: 'booked' | 'onTheWay' | 'started' | 'done';
  projectStatus:'pending'| 'rejected'|'accepted';
  paymentStatus:'unpaid'| 'paid';
  image?:string[]
}
export type TUpdateTask={
  bookedService:mongoose.Types.ObjectId,
  todoList: string[];
  image:string[]
}