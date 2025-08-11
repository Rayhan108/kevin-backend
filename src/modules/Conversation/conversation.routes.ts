import express from 'express';
import { USER_ROLE } from '../Auth/auth.constant';
import auth from '../../app/middleware/auth';
import conversationController from './conversation.controller';

const router = express.Router();
router.use(auth(USER_ROLE.user,USER_ROLE.vipMember,USER_ROLE.contractor,USER_ROLE.vipContractor,USER_ROLE.admin),);

router.post('/create', conversationController.createConversation);
router.get('/retrieve/specific/:id', conversationController.getConversationById);
router.get('/retrieve/list/:userId', conversationController.getConversationListByUserId);


export const conversationRoutes = router;