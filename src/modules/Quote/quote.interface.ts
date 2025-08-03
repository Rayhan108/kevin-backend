import { Model } from "mongoose";

export type TREquestQuote ={
  projectLocation:string;
  projectDescription: string;
  services: string[];
  date: Date; // or a more specific type if needed
  time: Date; // or a more specific type if needed
  priceRange?: string; // Optional, as it is undefined
}

export type IRequestQuoteModel = Model<TREquestQuote>;