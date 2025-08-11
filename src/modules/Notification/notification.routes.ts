
import express from 'express';

import notificationController from './notification.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../Auth/auth.constant';

const router = express.Router();

router.get(
    '/get-notifications/:id',

    auth(USER_ROLE.user,USER_ROLE.vipMember,USER_ROLE.contractor,USER_ROLE.vipContractor,USER_ROLE.admin),
    notificationController.getNotifications
);
router.patch(
    '/mark-notification',
    auth(USER_ROLE.user,USER_ROLE.vipMember,USER_ROLE.contractor,USER_ROLE.vipContractor,USER_ROLE.admin),
    notificationController.markAsSeen
);
router.get(
    '/unseen-notification-count/:id',
    auth(USER_ROLE.user,USER_ROLE.vipMember,USER_ROLE.contractor,USER_ROLE.vipContractor,USER_ROLE.admin),
    notificationController.getUnseenNotificationCount
);


export const notificationRoutes = router;