import express from 'express';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import messageController from './message.controller';


const router = express.Router();


// messageRouter.post('/send', messageControllers.sendMessage);
router.get('/retrieve/:conversationId', auth(USER_ROLE.user,USER_ROLE.vipMember,USER_ROLE.contractor,USER_ROLE.vipContractor), messageController.retrieveAllMessageByConversationId);

export const messageRoutes = router;
