import { Types } from 'mongoose';

export type TMessage = {
  _id: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  text?: string | null;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};
