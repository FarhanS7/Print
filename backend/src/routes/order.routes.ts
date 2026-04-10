import { Router } from 'express';
import { checkoutController, getUserOrdersController } from '../controllers/order.controller.js';

const router = Router();

router.post('/checkout', checkoutController);
router.get('/', getUserOrdersController);

export default router;
