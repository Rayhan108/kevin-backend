import { Request, Response } from 'express';


import httpStatus from 'http-status';
import notificationServices from './notification.services';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const data = await notificationServices.getAllNotifications(req.query, userId);
  sendResponse(res, {
        success: true,
          message: 'Notification seen successfully',
          statusCode:httpStatus.OK,
          data: data,
  });
});

const markAsSeen = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await notificationServices.markNotificationAsSeen(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification seen successfully',
    data: data,
  });
});

const getUnseenNotificationCount = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const count = await notificationServices.getAllUnseenNotificationCount(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unseen notification count fetched successfully',
    data: count,
  });
});

export default {
  getNotifications,
  markAsSeen,
  getUnseenNotificationCount,
};