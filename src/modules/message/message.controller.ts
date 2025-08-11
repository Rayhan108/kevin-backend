/* eslint-disable @typescript-eslint/no-explicit-any */
// controller for create new messages inside a conversation

import httpStatus from 'http-status';

import messageServices from './message.services';
import { Request, Response } from 'express';

import { FileArray } from 'express-fileupload';


import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import catchAsync from '../../app/utils/catchAsync';
import conversationServices from '../Conversation/conversation.services';
import fileUploader from '../../utils/fileUploader';
import AppError from '../../errors/AppError';
import sendResponse from '../../app/utils/sendResponse';

// Load your credentials from environment variables or config
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || '';
const AWS_SECRET = process.env.AWS_SECRET || '';
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || '';

// send message with rest..............
const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const messageData = req.body;
  const files = req.files  ;

  const conversation = await conversationServices.retriveConversationByConversationId(messageData.conversationId);
  if (!conversation) {
    throw new AppError(httpStatus.BAD_REQUEST,('Conversation not found'))
  }

  if (files) {
    const attachmentPath = await fileUploader(files as unknown as FileArray, `attachment`, 'attachment');
    messageData.attachment = attachmentPath as string;
  }

  console.log('wow light');

  messageData.seenBy = [{ user: messageData.senderId, seenAt: new Date() }];
  const newMessage = await messageServices.createMessage(messageData);

  if (!newMessage) {
    throw new AppError(httpStatus.BAD_REQUEST,('Failed to save message'));
  }

  conversation.updatedAt = new Date();
  await conversation.save();

  sendResponse(res, {
    statusCode:httpStatus.CREATED,
    success:true,
    message: `Message saved successfull`,
    data: newMessage,
  });
});

// send message function for socket................
const sendMessageHandler = async (data: any) => {
  const { text, attachment, senderId, conversationId, receiverId, isReceiverInsideChatRoom } = data;
  const conversation = await conversationServices.retriveConversationByConversationId(conversationId);
  if (!conversation) {
    throw new AppError(httpStatus.BAD_REQUEST,('Conversation not found'));
  }

  if (!isReceiverInsideChatRoom) {
    const message = await messageServices.createMessage({
      conversationId,
      senderId,
      text,
      attachment,
      seenBy: [],
    });

    conversation.latestmessage = text;
    conversation.unreadCounts.map((unread) => {
      if (unread.userId?.toString() == receiverId.toString()) {
        unread.count++;
      }
    });
    await conversation.save();
    return message;
  } else {
    const message = await messageServices.createMessage({
      conversationId,
      senderId,
      text,
      attachment,
      seenBy: [{ user: receiverId, seenAt: new Date() }],
    });
    conversation.latestmessage = text;
    await conversation.save();
    return message;
  }
};

const retrieveAllMessageByConversationId = catchAsync(async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const messages = await messageServices.retriveMessagesByConversationId(conversationId);

  messages.forEach(async (message) => {
    let isUserAddedToSeenBy = false;
    message.seenBy.forEach((seenBy) => {
      if (seenBy.user?.toString() === req.user!.id) {
        isUserAddedToSeenBy = true;
      }
    });

    if (!isUserAddedToSeenBy) {
      message.seenBy.push({ user: req.user!.id, seenAt: new Date() });
    }
    await message.save();
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Messages retrieved successfully',
    data: messages,
  });
});

const getPresignedUrl = async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const filetype = req.query.filetype as string;

  if (!filename || !filetype) {
    throw new AppError(httpStatus.BAD_REQUEST,('Filename and filetype are required in query'));
  }

  const validFileTypes: string[] = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/zip',
  ];

  if (!validFileTypes.includes(filetype)) {
    return res.status(400).json({ error: 'Invalid file type' });
  }

  const userId = req.user?.id;

  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST,('Unauthorized'));
  }

  const s3Client = new S3Client({
    credentials: {
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET,
    },
    region: 'ap-south-1',
  });

  try {
    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: AWS_BUCKET_NAME,
      Key: `conversations/${userId}/${Math.random()}/${filename}`,
      Conditions: [['content-length-range', 0, 5 * 1024 * 1024]],
      Fields: {
        success_action_status: '201',
      },
      Expires: 15 * 60, // 15 minutes
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Presigned URL generated successfully',
      data: { url, fields },
    });
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST,(error.message || 'Failed to generate URL'));
  }
};

export default {
  sendMessage,
  retrieveAllMessageByConversationId,
  sendMessageHandler,
  getPresignedUrl,
};
