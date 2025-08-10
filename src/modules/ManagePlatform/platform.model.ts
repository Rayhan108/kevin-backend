import mongoose, { Schema } from 'mongoose';

import { IPlatFormFeeModel } from './platform.interface';

// Define the schema for the model
const PlatformSchema: Schema = new Schema(
 {
    amount: { type: Number, required: true },
    type:  {
      type: String,
      enum: ['percentage', 'flat'],
      default: 'flat',
    },


  },
  {
    timestamps: true, 
  },
);

// Create and export the model
const PlatformModel = mongoose.model<IPlatFormFeeModel>(
  'Platform',
  PlatformSchema,
);

export default PlatformModel;
