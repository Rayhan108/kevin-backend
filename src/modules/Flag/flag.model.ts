import { Schema, model } from 'mongoose';
import { IFlagUserModel, TFlagUser } from './flag.interface';



const flagUserSchema = new Schema<TFlagUser, IFlagUserModel>(
  {
    notice: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String},

  },
  {
    timestamps: true, // includes createdAt and updatedAt
  }
);

export const FlagModel = model<TFlagUser, IFlagUserModel>('Flags', flagUserSchema);
