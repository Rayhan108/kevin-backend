import mongoose, { Document } from 'mongoose';

// Define the interface for the document
export interface IDocumentVerification extends Document {
  contractor: mongoose.Types.ObjectId;
  documentType: string;
  licenseStatus?:'pending'| 'rejected'|'approved';
  frontLicense:string
  backLicense:string
}
