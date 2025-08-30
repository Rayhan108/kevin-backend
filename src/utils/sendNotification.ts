import { Server } from 'http';
import { INotification } from '../modules/Notification/notification.interface';
import NotificationModel from '../modules/Notification/notification.model';
import { getIO } from '../socket';
import getUserNotificationsWithUnReadCount from './getUserNotificationCount';
import { DefaultEventsMap } from 'socket.io';

const createAndSendNotification = async (
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
