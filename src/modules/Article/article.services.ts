// import AppError from '../../errors/AppError';

import QueryBuilder from '../../app/builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { getIO, getReceiverSocketId } from '../../socket';
import createAndSendNotification from '../../utils/sendNotification';

import { INotification } from '../Notification/notification.interface';
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
const getSingleUserArticleFromDB = async (id:string) => {

  // console.log("query----->",id);
 
    const queryBuilder = new QueryBuilder(ArticleModel.find({user:id}), {});
  queryBuilder.search(['title', 'content']).filter().sort().paginate();
  // const result = await ArticleModel.find({user:id}).populate('user');
    const result = await queryBuilder.modelQuery.populate('user');
   const meta = await queryBuilder.countTotal();

  return { meta, result };
};

const addArticleIntoDB = async (payload: IArticle) => {
  const userId = payload.user;
  // console.log("services id",payload.serviceId);
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const result = (await ArticleModel.create(payload)).populate('user');
  const receiverId = userId;
    const receiverSocketId = getReceiverSocketId(receiverId.toString());

  const ioInstance = getIO();
  const notificationData: INotification = {
    title: 'Article',
    message: 'New Article Posted',
    receiver: receiverId,

  };
  if (receiverSocketId && ioInstance) {
    await createAndSendNotification(
      ioInstance,
      notificationData,
      receiverSocketId,
    );
  }
  return result;
};
const deleteArticleFromDB = async (id: string) => {
  const article = await ArticleModel.findByIdAndDelete(id);

  if (!article) {
    throw new AppError(httpStatus.NOT_FOUND, 'Article not found!');
  }

  return article; // return deleted user if needed
};

const updateBlogApproveStatusFromDB = async (id:string,status:string)=>{

    // console.log("id----->", id);
    
    // Query the database to find all document verification entries for the given user ID
    const documents = await ArticleModel.findById(id)
  // If no service is found, throw an error
  if (!documents) {
    throw new AppError(httpStatus.NOT_FOUND, 'documents not found');
  }

  // Update projectStatus to "accepted"
documents.blogStatus = status as 'pending'| 'rejected'|'approved';

  // Save the updated service
  await documents.save();
    return documents;
  
}

export const ArticleServices = {
  getAllArticleFromDB,
  addArticleIntoDB,
  deleteArticleFromDB,
  getSingleArticleFromDB,
  getSingleUserArticleFromDB,
  updateBlogApproveStatusFromDB
};
