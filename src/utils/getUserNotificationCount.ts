import NotificationModel from '../modules/Notification/notification.model';

const getUserNotificationsWithUnReadCount = async (receiver: string) => {
  const unseenCount = await NotificationModel.countDocuments({
    isRead: false,
    receiver: receiver,
  });

  const latestNotification = await NotificationModel.findOne({
    receiver: receiver,
  })
    .sort({ createdAt: -1 })
    .lean();

  // return { unseenCount, latestNotification };
  return latestNotification;
};

export default getUserNotificationsWithUnReadCount;
