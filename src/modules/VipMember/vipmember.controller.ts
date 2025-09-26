import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../app/utils/sendResponse';

import httpStatus from 'http-status';
import { VipMemberServices } from './vipmember.services';
import config from '../../app/config';
import { stripe } from '../../utils/stripeClient';
import { CURRENCY_ENUM } from '../Services/service.const';
import AppError from '../../errors/AppError';
import catchAsync from '../../app/utils/catchAsync';
import { MembershipModel } from '../Membership/membership.model';
import { UserModel } from '../User/user.model';




// const getAllReview = catchAsync(async(req:Request,res:Response)=>{

//   const result = await ReviewServices.getAllReviewFromDB();
//   sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Review retrived succesfully!',
//       data: result,
//     });

// })

const askAProQues = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
const userId = req.params.id
const path = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`;
const payload = {
    ...req.body,
    user:userId,
    image:path
}

  try {
    const result = await VipMemberServices.askingQues(payload)

    sendResponse(res, {
      success: true,
      message: 'Review Sent Successfull',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// initiate payment 
const initiateOrderPayment = catchAsync(async (req: Request, res: Response) => {
  const meId = req?.user?.userId
  const user = await UserModel.findById(meId);
  // console.log("user------>",user?.email);
  const email = user?.email
  const { item } = req.body; // use item, not items

  if (!item) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No item in the order.');
  }

  const membersip = await MembershipModel.findById(item.pricingId);
  if (!membersip) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service not found.');
  }

  const basePrice = item.price;
  const plan: 'monthly' | 'yearly' = item.plan === 'yearly' ? 'yearly' : 'monthly';
  const lineItem = {
    price_data: {
      currency: CURRENCY_ENUM.USD,
      product_data: {
        name: membersip.label,
      },
      unit_amount: Math.round(basePrice * 100),
    },
    quantity: 1,
  };

  const baseUrl = (config.frontend_url || '').replace(/\/+$/, '');
  if (!baseUrl) throw new Error('FRONTEND_URL not configured');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [lineItem], // wrap single item into array for Stripe
    mode: 'payment',
    customer_email:email,
    success_url: `${baseUrl}/subscriptionSuccess?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/subscriptionCancel`,
    metadata: {
     membershipId: String(membersip._id),
      plan,
      price: String(basePrice),
      userId: String(meId),
    },
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscription Purchase successfull',
    data: { url: session.url },
  });
});















export const VipMemberControllers = {
askAProQues,initiateOrderPayment
};
