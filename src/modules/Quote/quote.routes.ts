/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';

import auth from '../../app/middleware/auth';
import validateRequest from '../../app/middleware/validateRequest';

import { USER_ROLE } from '../Auth/auth.constant';
import { requestQuoteValudation } from './quote.validation';
import { QuoteControllers } from './quote.controller';

const router = express.Router();

router.post(
  '/addQuotes',

  auth(USER_ROLE.user),
  validateRequest(requestQuoteValudation.requestQuoteZodSchema),
  QuoteControllers.createQuotes,
);
//dasshboard stats route
router.get(
  '/dashboardStats',

  auth(USER_ROLE.contractor, USER_ROLE.vipContractor),

  QuoteControllers.getDashStats,
);

router.get('/myQuotes',auth(USER_ROLE.contractor,USER_ROLE.vipContractor),QuoteControllers.getAllQuoteForSpecContctr)
router.get('/quote/:id',auth(USER_ROLE.contractor,USER_ROLE.vipContractor),QuoteControllers.getSingleQuote)
router.patch('/update-status/:id',auth(USER_ROLE.contractor,USER_ROLE.vipContractor),QuoteControllers.updateQuoteStatus)

export const quoteRoutes = router;
