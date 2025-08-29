import { JwtPayload } from 'jsonwebtoken';
import { Message } from './message.model';
import { TMessage } from './message.interface';
import { UserModel } from '../User/user.model';
import { getIO, getReceiverSocketId } from '../../socket';
import { Types } from 'mongoose';
import { INotification } from '../Notification/notification.interface';
import { ENUM_NOTIFICATION_TYPE } from '../Notification/notification.constant';
import createAndSendNotification from '../../utils/sendNotification';

// get Users For Sidebar From DB
// const getUsersForSidebarFromDB = async (userData: JwtPayload) => {
//   const filteredUsers = await UserModel.find({
//     _id: { $ne: userData.userId },
//   }).select('-password');

//   return filteredUsers;
// };

const getUsersForSidebarFromDB = async (userData: JwtPayload) => {
  const userId = new Types.ObjectId(userData.userId);

  // 1. my messaged users
  const recentMessages = await Message.aggregate([
    {
      $match: {
        $or: [{ senderId: userId }, { receiverId: userId }],
      },
    },
    {
      $project: {
        otherUserId: {
          $cond: [{ $eq: ['$senderId', userId] }, '$receiverId', '$senderId'],
        },
        text: 1,
        image: 1,
        createdAt: 1,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: '$otherUserId',
        lastMessage: { $first: '$$ROOT' },
      },
    },
    {
      $lookup: {
        from: UserModel.collection.name, // ensure correct collection name
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: '$user._id',
        firstName: '$user.firstName',
        lastName: '$user.lastName',
        image: '$user.image',
        lastMessage: 1,
      },
    },
  ]);

  // 2. rest users
  const messagedUserIds = recentMessages.map((u) => u._id);

  const otherUsers = await UserModel.find({
    _id: { $ne: userId, $nin: messagedUserIds },
  }).select('-password');

  // 3. Combine & messaged users first
  return [
    ...recentMessages,
    ...otherUsers.map((u) => ({ ...u.toObject(), lastMessage: null })),
  ];
};

// get Messages From DB
const getMessagesFromDB = async (
  userToChatId: string,
  userData: JwtPayload,
) => {
  const myId = userData.userId;

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });

  return messages;
};

// send Message Into DB
const sendMessageIntoDB = async (
  receiverId: string,
  payload: Pick<TMessage, 'text' | 'image'>,
  userData: JwtPayload,
) => {
  const { text, image } = payload;
  const senderId = userData.userId;

  if (!text && !image) {
    throw new Error('Message must contain either text or image');
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text: text || null,
    image: image || null,
  });

  await newMessage.save();

  const receiverSocketId = getReceiverSocketId(receiverId);

  const ioInstance = getIO();
  if (receiverSocketId && ioInstance) {
    ioInstance.to(receiverSocketId).emit('newMessage', newMessage);

    const notificationData: INotification = {
      title: 'New message.',
      message: 'You Have a new message.',
      receiver: newMessage.receiverId,
      type: ENUM_NOTIFICATION_TYPE.USER,
    };

    await createAndSendNotification(notificationData, receiverSocketId);
  }

  return newMessage;
};

export const messageService = {
  getUsersForSidebarFromDB,
  getMessagesFromDB,
  sendMessageIntoDB,
};
