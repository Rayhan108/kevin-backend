import mongoose, { Schema } from 'mongoose';
import { IDocumentVerification } from './verification.interface';

const documentVerificationSchema = new Schema<IDocumentVerification>(
  {
    contractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    documentType: { type: String, required: true },
    licenseStatus: {
      type: String,
      enum: ['pending', 'rejected', 'approved'],
      default: 'pending',
    },
    frontLicense: { type: String, required: true },
    backLicense: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// Create the model based on the schema
const DocumentVerification = mongoose.model<IDocumentVerification>(
  'DocumentVerification',
  documentVerificationSchema,
);

export default DocumentVerification;
