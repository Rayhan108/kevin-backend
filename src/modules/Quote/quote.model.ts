import { Schema, model } from 'mongoose';
import { IRequestQuoteModel, TREquestQuote } from './quote.interface';


const requestQuoteSchema = new Schema<TREquestQuote, IRequestQuoteModel>(
  {
    projectLocation: { type: String, required: true },
    projectDescription: { type: String, default: '' },
    services: { type: [String], required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    priceRange: { type: String, default: undefined },
  },
  {
    timestamps: true, // includes createdAt and updatedAt
  }
);

export const RequestQuoteModel = model<TREquestQuote, IRequestQuoteModel>('RequestQuote', requestQuoteSchema);
