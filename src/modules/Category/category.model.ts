import { Schema, model } from 'mongoose';
import { ICategoryModel, TCategory } from './category.interface';




const categorySchema = new Schema<TCategory, ICategoryModel>(
  {
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
  

  },
  {
    timestamps: true, // includes createdAt and updatedAt
  }
);

export const CategoryModel = model<TCategory, ICategoryModel>('Category', categorySchema);
