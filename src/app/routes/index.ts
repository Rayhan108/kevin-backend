// import { Router } from 'express';


// const router = Router();

// const moduleRoutes = [
//   {
//     path: '/auth',
//     route:"",
//   },

// ];

// moduleRoutes.forEach((route) => router.use(route.path,route.route ));

// export default router;
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Auth route working');
});

export default router;
