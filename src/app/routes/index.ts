import { Router } from 'express';
import { AuthRoutes } from '../../modules/Auth/auth.routes';
import { UserRoutes } from '../../modules/User/user.routes';
import { quoteRoutes } from '../../modules/Quote/quote.routes';
import { reviewRoutes } from '../../modules/Review/review.routes';
import { servicesRoutes } from '../../modules/Services/services.routes';
import { BookServicesRoutes } from '../../modules/BookService/bookservice.routes';
import { ArticleRoutes } from '../../modules/Article/article.routes';
import { referRoutes } from '../../modules/Refferal/refferal.routes';
import { vipMemberRoutes } from '../../modules/VipMember/vipmember.routes';
import { FlagRoutes } from '../../modules/Flag/flag.routes';
import { PlatformRoutes } from '../../modules/ManagePlatform/platform.routes';
import { CategoryRoutes } from '../../modules/Category/category.routes';
import { notificationRoutes } from '../../modules/Notification/notification.routes';


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
  {
    path:'/book',
    route: BookServicesRoutes,
  },
  {
    path:'/article',
    route: ArticleRoutes,
  },
  {
    path:'/refer',
    route:referRoutes,
  },
  {
    path:'/vipMember',
    route:vipMemberRoutes,
  },
  {
    path:'/flag',
    route:FlagRoutes,
  },
  {
    path:'/platform',
    route:PlatformRoutes,
  },
  {
    path:'/category',
    route:CategoryRoutes,
  },
  {
    path:'/notification',
    route:notificationRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
