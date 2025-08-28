import mongoose, { model, Schema } from "mongoose";
import { IServices, TReview} from "./services.interface";


const ReviewSchema: Schema = new Schema<TReview>({
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

// Main Service Schema
const ServiceSchema = new Schema<IServices>(
  {
    contractorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String},
    title: { type: String, required: true },
    details: { type: String, required: true },
    // categoryName: { type: [String], required: true },
        categoryName: { type: [String], required: true },
    // subCategoryName: { type:[ String]},
review: { type: [ReviewSchema], default: [] },
    price: { type: Number, required: true },
       projectStatus: {
      type: String,
      enum: ['accepted', 'rejected','pending'],
      default: 'pending',
    },
       type: {
      type: String,
      enum: ['indoor', 'outdoor','garden'],
      required:true
    },
  },
  { timestamps: true }
);

// Export Model
const ServiceModel = model<IServices>('Service', ServiceSchema);
export default ServiceModel;