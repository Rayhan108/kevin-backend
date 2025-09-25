/* eslint-disable @typescript-eslint/no-explicit-any */

import { Types } from 'mongoose';
import Notification from './notification.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { getIO, getReceiverSocketId } from '../../socket';

// getAllNotificationsFromDB
const getAllNotificationsFromDB = async (
  query: Record<string, any>,
  userId: string,
) => {
  const baseQuery = Notification.find({ receiver: userId });

  const builder = new QueryBuilder(baseQuery, query);

  builder.search(['title', 'message']).filter().sort().paginate().fields();

  const result = await builder.modelQuery.exec();
  const meta = await builder.countTotal();

  return {
    meta,
    result,
  };
};

// markANotificationAsReadIntoDB
const markANotificationAsReadIntoDB = async (notificationId: string) => {
  const result = await Notification.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true },
  );

  // eslint-disable-next-line @typescript-eslint/no-extra-non-null-assertion
  const receiverSocketId = getReceiverSocketId(result!?.receiver.toString());
  const ioInstance = getIO();

  if (receiverSocketId && ioInstance) {
    ioInstance.to(receiverSocketId).emit('newNotification', { unReadMinus: 1 });
  }

  return result;
};

// markNotificationsAsReadIntoDB
const markNotificationsAsReadIntoDB = async (userId: string) => {
  const result = await Notification.updateMany(
    { receiver: userId, isRead: false },
    { $set: { isRead: true } },
  );

  const receiverSocketId = getReceiverSocketId(userId);

  const ioInstance = getIO();

  if (receiverSocketId && ioInstance) {
    ioInstance.to(receiverSocketId).emit('newNotification', { unReadCount: 0 });
  }

  return result;
};

// getAllUnseenNotificationCountFromDB
const getAllUnseenNotificationCountFromDB = async (userId: string) => {
  const result = await Notification.aggregate([
    {
      $match: {
        receiver: new Types.ObjectId(userId),
        isRead: false,
      },
    },
    {
      $count: 'unReadCount',
    },
  ]);

  return result[0]?.unReadCount || 0;
};

export default {
  getAllNotificationsFromDB,
  markANotificationAsReadIntoDB,
  markNotificationsAsReadIntoDB,
  getAllUnseenNotificationCountFromDB,
};
