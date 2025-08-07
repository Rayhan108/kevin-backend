import { Schema, model } from "mongoose";
import { IReffer } from "./refferal.interface";
const RefferSchema = new Schema<IReffer>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RefferModel = model<IReffer>("Reffer", RefferSchema);
