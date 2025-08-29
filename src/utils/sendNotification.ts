import { INotification } from '../modules/Notification/notification.interface';
import NotificationModel from '../modules/Notification/notification.model';
import { getIO } from '../socket';
import getUserNotificationsWithUnReadCount from './getUserNotificationCount';

const createAndSendNotification = async (
  notificationData: INotification,
  receiverSocketId: string,
) => {
  const ioInstance = getIO();

  await NotificationModel.create(notificationData);

  const updatedNotification = await getUserNotificationsWithUnReadCount(
    notificationData.receiver.toString(),
  );

  ioInstance.to(receiverSocketId).emit('newNotification', updatedNotification);
};

export default createAndSendNotification;
