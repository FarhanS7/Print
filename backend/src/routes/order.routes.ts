import { Router } from "express";
import {
  checkoutController,
  getUserOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
  cancelOrderController,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// All order routes require authentication
router.use(authMiddleware);

router.post("/checkout", checkoutController);
router.get("/", getUserOrdersController);
router.get("/:orderId", getOrderByIdController);
router.put("/:orderId", updateOrderStatusController);
router.delete("/:orderId", cancelOrderController);

export default router;
