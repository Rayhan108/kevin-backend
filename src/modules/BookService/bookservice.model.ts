import mongoose, { Schema } from 'mongoose';
import { IBookServices } from './bookservice.interface';

// Define the schema for the model
const BookServicesSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    serviceType: { type: String, required: true },
    location: { type: String, required: true },
    zip: { type: String, required: true },
    projectDescription: { type: String },
    // dateRange: { type: String, required: true },
    // timeSlot: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    todoList: { type: [String], default: [] },
    status: {
      type: String,
      enum: ['booked', 'onTheWay', 'started', 'done'],
      default: 'booked',
    },
    projectStatus: {
      type: String,
      enum: ['accepted', 'rejected', 'pending'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
    image: { type: [String], default: [] },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  },
);

// Create and export the model
const BookServiceModel = mongoose.model<IBookServices>(
  'BookServices',
  BookServicesSchema,
);

export default BookServiceModel;
