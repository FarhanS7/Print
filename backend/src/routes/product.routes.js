import { Router } from 'express';
import { getProductsController, getProductByIdController } from '../controllers/product.controller';
const router = Router();
router.get('/', getProductsController);
router.get('/:id', getProductByIdController);
export default router;
//# sourceMappingURL=product.routes.js.map