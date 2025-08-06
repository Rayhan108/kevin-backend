import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../app/utils/sendResponse';

import httpStatus from 'http-status';

import catchAsync from '../../app/utils/catchAsync';
import { ArticleServices } from './article.services';


const getAllArticle = catchAsync(async(req:Request,res:Response)=>{

  const result = await ArticleServices.getAllArticleFromDB();
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
const image = req.file?.path
const payload = req.body
payload.image = image
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

export const ArticleControllers = {
createArticle,getAllArticle
};
