// import AppError from '../../errors/AppError';

import QueryBuilder from '../../app/builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UserModel } from '../User/user.model';
import { IArticle } from './article.interface';
import ArticleModel from './article.model';

import httpStatus from 'http-status';

const getAllArticleFromDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(ArticleModel.find(), query);
  queryBuilder.search(['title', 'content']).filter().sort().paginate();
  const result = await queryBuilder.modelQuery.populate('user');
  const meta = await queryBuilder.countTotal();

  return { meta, result };
};
const getSingleArticleFromDB = async (id: string) => {
  const result = await ArticleModel.findById(id).populate('user');
  return result;
};

const addArticleIntoDB = async (payload: IArticle) => {
  const userId = payload.user;
  // console.log("services id",payload.serviceId);
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const result = (await ArticleModel.create(payload)).populate('user');
  return result;
};
const deleteArticleFromDB = async (id: string) => {
  const article = await ArticleModel.findByIdAndDelete(id);

  if (!article) {
    throw new AppError(httpStatus.NOT_FOUND, 'Article not found!');
  }

  return article; // return deleted user if needed
};

export const ArticleServices = {
  getAllArticleFromDB,
  addArticleIntoDB,
  deleteArticleFromDB,
  getSingleArticleFromDB,
};
