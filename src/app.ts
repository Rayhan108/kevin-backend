import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';

import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import { stripeWebhookHandler } from './app/webhook/webhook.stripe';
const app: Application = express();
//parsers
app.use(express.json());
app.use(cookieParser());

// stripe webhook
app.post('/webhook/stripe', express.raw({type: 'application/json'}), stripeWebhookHandler);

app.use(cors({ origin: ['http://localhost:3000','http://10.10.20.13:5000','http://10.10.20.13:3000'], credentials: true }));
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Kevin Server is Running...');
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
