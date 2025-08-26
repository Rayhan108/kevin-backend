/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { UserServices } from './user.services';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TEditProfile, TProfilePictureUpdatePayload } from './user.constant';

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
   const path = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`;

    // 🧾 Prepare typed payload
    const payload: TProfilePictureUpdatePayload = {
      image: path,
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
  },
);
const updateProfile = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    // 🖼️ Get file path or filename from multer
    // const imageUrl = req?.file?.path || req?.file?.filename;

    const path = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`; //for local machine
    // console.log("image path--->",path);

    // 🧾 Prepare typed payload
    const payload: TEditProfile = {
      ...req.body,
      image: path,
    };

    // 🔁 Update user's image field
    const result = await UserServices.updateProfileFromDB(id, payload);

    // 📤 Send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile updated successfully',
      data: result,
    });
  },
);

const addReport = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  // console.log("request",req.body);
  const reportData = req.body.report;
const path = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`;
  reportData.image = path;
  // console.log("reported data--->",reportData);
  const result = await UserServices.addReportToContractor(userId, reportData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Report added to contractor successfully',
    data: result,
  });
});
const addFeedback = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  // console.log("request",req.file);
  const feedbackData = req.body.feedback;
const path = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`;
  // console.log("request iamge",image);
  feedbackData.image = path;
  // console.log("feedback data--->",feedbackData);

  const result = await UserServices.addFeedbackToContractor(
    userId,
    feedbackData,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Feedback  added to user ',
    data: result,
  });
});
const replyFeedback = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const message = req.body.message as string | undefined;
 const path = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`;

  if (!message && !path) {
    return res.status(400).json({ message: 'Nothing to update' });
  }

  const update: any = {};
  if (message !== undefined) update['feedback.reply.message'] = message;
  if (path) update['feedback.reply.image'] = path;
  update['feedback.reply.repliedAt'] = new Date();

  const result = UserServices.replyFeedbackByAdmin(userId, update);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin reply added to feedback',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrived succesfully!',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrived succesfully!',
    data: result,
  });
});
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
      message: 'Contractor role activated',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await UserServices.deleteUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  });
});

export const UserControllers = {
  changeStatus,
  getSingleUser,
  getAllUser,
  createContractor,
  changeProPic,
  addReport,
  addFeedback,
  updateProfile,
  deleteUser,
  replyFeedback,
};
