import mongoose, { Schema } from 'mongoose';
import { IArticle } from './article.interface';

// Define the Article Schema with validation rules
const ArticleSchema: Schema = new Schema<IArticle>({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Reference to User model (you should have a 'User' model)
    required: [true, 'User reference is required'],
  },
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    maxlength: [255, 'Title cannot exceed 255 characters'], // Optional: max length validation
  },
  content: { 
    type: String, 
    required: [true, 'Content is required'], // Content is required
    maxlength: [5000, 'Content cannot exceed 5000 characters'], // Optional: max length validation
  },
  isPopular: { 
    type: Boolean, 
    default: false,
  },
  image: { type:String },
  isFeatured: { 
    type: Boolean, 
    default: false,
  },

}  ,{
    timestamps: true, 
  },);

// Create and export the model
const ArticleModel = mongoose.model<IArticle>('Article', ArticleSchema);

export default ArticleModel;
