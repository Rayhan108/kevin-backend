// import AppError from '../../errors/AppError';

import QueryBuilder from "../../app/builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TCategory } from "./category.interface";
import { CategoryModel } from "./category.model";
import httpStatus from 'http-status';

// import httpStatus from 'http-status';


const getAllCategoryFromDB = async(query: Record<string, unknown>)=>{
    const queryBuilder = new QueryBuilder(CategoryModel.find(),query)
      queryBuilder
    .filter()
    .sort()
    .paginate();
    const result = await queryBuilder.modelQuery;
      const meta = await queryBuilder.countTotal();
    return {meta,result};
}

const addCategoryIntoDB = async (payload:TCategory) => {

// console.log("Pyload--->",payload);
  const result = await CategoryModel.create(payload)
  return result;
};
const addSubCategoryIntoDB = async (payload:TCategory) => {

// console.log("Pyload--->",payload);
  const result = await CategoryModel.create(payload)
  return result;
};
const editCategoryFromDB = async (payload:TCategory,id:string) => {
const category = await CategoryModel.findById(id)
if(!category){
  throw new AppError(httpStatus.NOT_FOUND,'Category Not Found')
}
  const result = await CategoryModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true } // new:true মানে updated data return করবে
  );

  return result;

};
const deleteCateFromDB = async (id: string) => {
  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  return category; // return deleted user if needed
};




export const CategoryServices = {
addCategoryIntoDB,getAllCategoryFromDB,addSubCategoryIntoDB,deleteCateFromDB,editCategoryFromDB
};
