import mongoose, { model, Schema } from 'mongoose';
import { INotification } from './notification.interface';
import { ENUM_NOTIFICATION_TYPE } from './notification.constant';


const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false, // default
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ENUM_NOTIFICATION_TYPE),
      required: true,
    },
    redirectURL: {
      type: String,
      default: '', // default
    },
  },
  { timestamps: true, versionKey: false },
);

notificationSchema.index({ receiver: 1, isRead: 1 });

const NotificationModel = model<INotification>(
  'Notification',
  notificationSchema,
);

export default NotificationModel;
