import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../app/utils/sendResponse';

import httpStatus from 'http-status';

import catchAsync from '../../app/utils/catchAsync';
import { ArticleServices } from './article.services';


const getAllArticle = catchAsync(async(req:Request,res:Response)=>{

  const result = await ArticleServices.getAllArticleFromDB(req?.query);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Article retrived succesfully!',
      data: result,
    });

})
const getSingleArticle = catchAsync(async(req:Request,res:Response)=>{
  const { id } = req.params;
  const result = await ArticleServices.getSingleArticleFromDB(id);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Article retrived succesfully!',
      data: result,
    });

})
const getSingleUserArticle = catchAsync(async(req:Request,res:Response)=>{
 const id = req?.user?.userId
  const result = await ArticleServices.getSingleUserArticleFromDB(id);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Article retrived succesfully!',
      data: result,
    });

})

const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
//   console.log("create revieew-->",req.body);
  const path = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`;
const payload = req.body
payload.image = path
  try {
    const result = await ArticleServices.addArticleIntoDB(payload);

    sendResponse(res, {
      success: true,
      message: 'Article Sent Successfull',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ArticleServices.deleteArticleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Article deleted successfully!',
    data: result,
  });
})


export const ArticleControllers = {
createArticle,getAllArticle,deleteArticle,getSingleArticle,getSingleUserArticle
};
