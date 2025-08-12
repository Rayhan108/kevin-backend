// import AppError from '../../errors/AppError';

import sendNotification from "../../utils/sendNotification";
import { ENUM_NOTIFICATION_TYPE } from "../Notification/notification.constant";
import { INotification } from "../Notification/notification.interface";
import { TFlagUser } from "./flag.interface";
import { FlagModel } from "./flag.model";

// import httpStatus from 'http-status';


// const getAllUserFromDB = async()=>{
//     const result = await UserModel.find();
//     return result;
// }

const addFlagIntoDB = async (payload: TFlagUser) => {
  const result = await (await FlagModel.create(payload)).populate('user');
  
  // Create an Admin notification for the flagged user
  const notificationData: INotification = {
    title: "Admin Role Assigned",
    message: "You have been flagged as an admin.",
    isRead: false,
    receiver: result.user._id,
    type: ENUM_NOTIFICATION_TYPE.ADMIN, // Admin-specific notification
    // redirectId: "admin-dashboard", // Optional redirect
  };

  await sendNotification(notificationData);
  
  return result;
};

export const FlagServices = {
addFlagIntoDB
};
