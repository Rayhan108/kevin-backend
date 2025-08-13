import { Document, Types } from 'mongoose';

export interface IUnreadCount {
  userId: Types.ObjectId;
  count: number;
}

export interface IConversation extends Document {
  members: Types.ObjectId[];
  unreadCounts: Types.DocumentArray<IUnreadCount>;
  latestMessage: {
    content: string;
    senderId: Types.ObjectId;
    timestamp: Date;
  };
  allowedRoles: string[];
}
