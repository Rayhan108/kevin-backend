import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { UserServices } from './user.services';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProfilePictureUpdatePayload } from './user.constant';

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});
const changeProPic = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    // 🔍 Check if file is uploaded
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Image file is required');
    }

    // 🖼️ Get file path or filename from multer
    const imageUrl = req.file.path || req.file.filename;

    // 🧾 Prepare typed payload
    const payload: TProfilePictureUpdatePayload = {
      image: imageUrl,
    };

    // 🔁 Update user's image field
    const result = await UserServices.changeProfilePicture(id, payload);

    // 📤 Send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile picture updated successfully',
      data: result,
    });
  }
);

const addReport = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  // console.log("request",req.body);
  const reportData = req.body.report;
const image = req.file?.path
reportData.image=image
// console.log("reported data--->",reportData);
  const result = await UserServices.addReportToContractor(userId, reportData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Report added to contractor successfully',
    data: result,
  });
});




const getAllUser = catchAsync(async(req:Request,res:Response)=>{

  const result = await UserServices.getAllUserFromDB();
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrived succesfully!',
      data: result,
    });

})
const getSingleUser = catchAsync(async(req:Request,res:Response)=>{

  const {userId}=req.params;
  const result = await UserServices.getSingleUserFromDB(userId);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrived succesfully!',
      data: result,
    });

})
const createContractor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
//   console.log("create contractor-->",req.body);
  try {
    const result = await UserServices.updateUserToContractor(req.body);

    sendResponse(res, {
      success: true,
      message: 'User registered successfully',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  changeStatus,getSingleUser,getAllUser,createContractor,changeProPic,addReport
};
