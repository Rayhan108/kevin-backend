import { Schema, model } from "mongoose";
import { IRefferal } from "./refferal.interface";

const RefferSchema = new Schema<IRefferal>(
  {
userID: {
      type: Schema.Types.ObjectId, 
      required: true,
      ref: "User", 
    },
  },
  {
    timestamps: true,
  }
);

export const RefferModel = model<IRefferal>("Reffer", RefferSchema);
