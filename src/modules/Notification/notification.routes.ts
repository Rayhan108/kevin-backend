import express from 'express';

import notificationController from './notification.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../Auth/auth.constant';

const router = express.Router();

// getAllNotifications
router.get(
  '/:id',
  auth(
    USER_ROLE.user,
    USER_ROLE.vipMember,
    USER_ROLE.contractor,
    USER_ROLE.vipContractor,
    USER_ROLE.admin,
  ),
  notificationController.getAllNotifications,
);

// markANotificationAsRead
router.patch(
  '/mark/:id',
  auth(
    USER_ROLE.user,
    USER_ROLE.vipMember,
    USER_ROLE.contractor,
    USER_ROLE.vipContractor,
    USER_ROLE.admin,
  ),
  notificationController.markANotificationAsRead,
);

// markNotificationsAsRead
router.patch(
  '/mark-all/:id',
  auth(
    USER_ROLE.user,
    USER_ROLE.vipMember,
    USER_ROLE.contractor,
    USER_ROLE.vipContractor,
    USER_ROLE.admin,
  ),
  notificationController.markNotificationsAsRead,
);

// getUnseenNotificationCount
router.get(
  '/unseen/:id',
  auth(
    USER_ROLE.user,
    USER_ROLE.vipMember,
    USER_ROLE.contractor,
    USER_ROLE.vipContractor,
    USER_ROLE.admin,
  ),
  notificationController.getUnseenNotificationCount,
);

export const notificationRoutes = router;
