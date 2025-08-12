import { Types } from 'mongoose';
import { ENUM_NOTIFICATION_TYPE } from './notification.constant';



export interface INotification {
    title: string;
    message: string;
    isRead: boolean;
    receiver: Types.ObjectId;
    type: (typeof ENUM_NOTIFICATION_TYPE)[keyof typeof ENUM_NOTIFICATION_TYPE];
    redirectId?: string;

}
