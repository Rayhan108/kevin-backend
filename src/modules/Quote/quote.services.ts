// import AppError from '../../errors/AppError';

// import httpStatus from 'http-status';
import { TREquestQuote } from './quote.interface';
import { RequestQuoteModel } from './quote.model';

// const getAllUserFromDB = async()=>{
//     const result = await UserModel.find();
//     return result;
// }

const addRequestQuoteIntoDB = async (payload:TREquestQuote) => {

// console.log("Pyload--->",payload);
  const result = await RequestQuoteModel.create(payload)
  return result;
};

export const QuoteServices = {
addRequestQuoteIntoDB
};
