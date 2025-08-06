import { model, Schema } from "mongoose";
import { IServices, TReview } from "./services.interface";

const ReviewSchema = new Schema<TReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: Number, required: true },
    behavior: { type: Number, required: true },
    timeManagement: { type: Number, required: true },
    price: { type: Number, required: true },
    comment: { type: String },
    date: { type: Date, required: true },
  },
  { _id: false } // prevents automatic _id for embedded subdocument
);

// Main Service Schema
const ServiceSchema = new Schema<IServices>(
  {
    contractorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    details: { type: String, required: true },
    categoryName: { type: String, required: true },
    subCategoryName: { type: String, required: true },
    review: { type: ReviewSchema, required: false },
    price: { type: Number, required: true },
       projectStatus: {
      type: String,
      enum: ['accepted', 'rejected','pending'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Export Model
const ServiceModel = model<IServices>('Service', ServiceSchema);
export default ServiceModel;