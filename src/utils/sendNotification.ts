import { INotification } from '../modules/Notification/notification.interface';
import NotificationModel from '../modules/Notification/notification.model';
import { getIO } from '../socket';
import getUserNotificationCount from './getUserNotificationCount';

const sendNotification = async (notificationData: INotification) => {
  const io = getIO();
  await NotificationModel.create(notificationData);

  const updatedNotification = await getUserNotificationCount(
    notificationData.receiver.toString(),
  );

  io.to(notificationData.receiver.toString()).emit(
    'notification',
    updatedNotification,
  );
};

export default sendNotification;
