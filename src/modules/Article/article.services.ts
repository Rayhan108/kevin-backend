// import AppError from '../../errors/AppError';

import AppError from "../../errors/AppError";
import { UserModel } from "../User/user.model";
import { IArticle } from "./article.interface";
import ArticleModel from "./article.model";



import httpStatus from 'http-status';


const getAllArticleFromDB = async()=>{
    const reviews = await ArticleModel.find().populate('user');
    return reviews;
}

const addArticleIntoDB = async (payload: IArticle) => {
  const userId = payload.user;
// console.log("services id",payload.serviceId);
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

const result = (await ArticleModel.create(payload)).populate('user')
return result
};
const deleteArticleFromDB = async (id: string) => {
  const article = await ArticleModel.findByIdAndDelete(id);

  if (!article) {
    throw new AppError(httpStatus.NOT_FOUND, 'Article not found!');
  }

  return article; // return deleted user if needed
};

export const ArticleServices = {
getAllArticleFromDB,addArticleIntoDB,deleteArticleFromDB
};
