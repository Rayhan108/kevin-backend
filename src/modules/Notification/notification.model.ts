import mongoose, { model, Schema} from 'mongoose';

import { INotification } from './notification.interface';
import { ENUM_NOTIFICATION_TYPE } from './notification.constant';

const notificationSchema = new Schema<INotification>(
  {
    title:{
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ENUM_NOTIFICATION_TYPE),
      required: true,
    },
    redirectId: {
      type: String,
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

const NotificationModel = model<INotification>('Notification', notificationSchema);

export default NotificationModel;
