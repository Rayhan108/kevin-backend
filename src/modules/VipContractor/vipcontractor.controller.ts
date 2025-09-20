// import { NextFunction, Request, Response } from 'express';

// import sendResponse from '../../app/utils/sendResponse';

// import httpStatus from 'http-status';
// import { CURRENCY_ENUM } from '../Services/service.const';
// import AppError from '../../errors/AppError';
// import catchAsync from '../../app/utils/catchAsync';
// import config from '../../app/config';
// import { stripe } from '../../utils/stripeClient';






// const initiateOrderPayment = catchAsync(async (req: Request, res: Response) => {
//   const { item, customerEmail } = req.body; // use item, not items
// const {id}=req.params
// console.log("book service id--->",id);
//   if (!item) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'No item in the order.');
//   }

//   const service = await ServiceModel.findById(item.serviceId);
//   if (!service) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Service not found.');
//   }

//   const basePrice = service.price;

//   const lineItem = {
//     price_data: {
//       currency: CURRENCY_ENUM.USD,
//       product_data: {
//         name: service.title,
//       },
//       unit_amount: Math.round(basePrice * 100),
//     },
//     quantity: item.hour,
  
//   };

//   const baseUrl = (config.frontend_url || '').replace(/\/+$/, '');
//   if (!baseUrl) throw new Error('FRONTEND_URL not configured');

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [lineItem], // wrap single item into array for Stripe
//     mode: 'payment',
//     customer_email: customerEmail,
//     success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${baseUrl}/cancel`,
//          metadata: {
//         bookServiceId: String(id),
//       },
//   });

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Order created successfully',
//     data: { url: session.url },
//   });
// });

// export const VipContractorControllers = {
// initiateOrderPayment
// };
