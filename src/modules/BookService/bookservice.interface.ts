import mongoose, { Document } from 'mongoose';

// Define the interface for the document
export interface IBookServices extends Document {
  user: mongoose.Types.ObjectId;
  serviceType: string;
  location: string;
  zip: string;
  projectDescription?: string;
  dateRange: string;
  timeSlot: string;
  exactDate: string;
  exactTime: string;
  todoList: string[];
  status: 'booked' | 'onTheWay' | 'started' | 'done';
  projectStatus:'pending'| 'rejected'|'accepted';
}
export type TUpdateTask={
  bookedService:mongoose.Types.ObjectId,
  todoList: string[];
}