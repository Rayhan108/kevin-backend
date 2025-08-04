import { Router } from 'express';
import { AuthRoutes } from '../../modules/Auth/auth.routes';
import { UserRoutes } from '../../modules/User/user.routes';
import { quoteRoutes } from '../../modules/Quote/quote.routes';
import { reviewRoutes } from '../../modules/Review/review.routes';
import { servicesRoutes } from '../../modules/Services/services.routes';

;

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path:'/quotes',
    route: quoteRoutes,
  },
  {
    path:'/review',
    route: reviewRoutes,
  },
  {
    path:'/service',
    route: servicesRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
