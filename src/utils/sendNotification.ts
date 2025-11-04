
import { INotification } from '../modules/Notification/notification.interface';
import NotificationModel from '../modules/Notification/notification.model';

import getUserNotificationsWithUnReadCount from './getUserNotificationCount';


const createAndSendNotification = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ioInstance: any,
  notificationData: INotification,
  receiverSocketId: string,
) => {
  await NotificationModel.create(notificationData);

  const updatedNotification = await getUserNotificationsWithUnReadCount(
    notificationData.receiver.toString(),
  );

  ioInstance.to(receiverSocketId).emit('newNotification', updatedNotification);
};

export default createAndSendNotification;
