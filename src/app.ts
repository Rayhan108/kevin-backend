import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';

// import globalErrorHandler from './app/middleware/globalErrorHandler';
// import notFound from './app/middleware/notFound';
import router from './routes';
const app: Application = express();
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://10.10.10.83:5000'], credentials: true }));
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Kevin Server is Running...');
});
// app.use(globalErrorHandler);
// app.use(notFound);
export default app;
