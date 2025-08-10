// import AppError from '../../errors/AppError';

import { TCategory } from "./category.interface";
import { CategoryModel } from "./category.model";


// import httpStatus from 'http-status';


const getAllCategoryFromDB = async()=>{
    const result = await CategoryModel.find();
    return result;
}

const addCategoryIntoDB = async (payload:TCategory) => {

// console.log("Pyload--->",payload);
  const result = await CategoryModel.create(payload)
  return result;
};

export const CategoryServices = {
addCategoryIntoDB,getAllCategoryFromDB
};
