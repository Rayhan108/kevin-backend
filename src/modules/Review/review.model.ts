import mongoose, { Schema } from 'mongoose';
import { IReview } from './review.interface';


// Define the Review Schema with validation rules
const ReviewSchema: Schema = new Schema<IReview>({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref:'User', 
    required: [true, 'User reference is required'] 
  },
serviceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', 
    required: [true, 'Service reference is required'] 
  },
  
  rating: { 
    type: Number, 
    required: [true, 'Rating is required'], 
    min: [1, 'Rating must be at least 1'], 
    max: [5, 'Rating cannot be more than 5'] 
  },
  comment: { 
    type: String, 
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
},
 {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  },
);

// Create and export the model
const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema);

export default ReviewModel;
