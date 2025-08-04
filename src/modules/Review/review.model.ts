import mongoose, { Schema } from 'mongoose';
import { IReview } from './review.interface';


// Define the Review Schema with validation rules
const ReviewSchema: Schema = new Schema<IReview>({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User reference is required'] 
  },
services: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', 
    required: [true, 'Service reference is required'] 
  },
  
  service: { 
    type: Number, 
    required: [true, 'Service rating is required'], 
    min: [1, 'Service rating must be at least 1'],
    max: [5, 'Service rating cannot be more than 5']
  },
  
  behavior: { 
    type: Number, 
    required: [true, 'Behavior rating is required'],
    min: [1, 'Behavior rating must be at least 1'],
    max: [5, 'Behavior rating cannot be more than 5']
  },
  
  timeManagement: { 
    type: Number, 
    required: [true, 'Time management rating is required'], 
    min: [1, 'Time management rating must be at least 1'],
    max: [5, 'Time management rating cannot be more than 5']
  },
  
  price: { 
    type: Number, 
    required: [true, 'Price rating is required'], 
    min: [1, 'Price rating must be at least 1'],
    max: [5, 'Price rating cannot be more than 5']
  },
  
  comment: { 
    type: String, 
    required: false,
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  
  date: { 
    type: Date, 
    default: Date.now 
  },
});

// Create and export the model
const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema);

export default ReviewModel;
