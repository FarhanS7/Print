import { Router } from "express";
import {
  createDesignController,
  getUserDesignsController,
  getDesignByIdController,
  updateDesignController,
  deleteDesignController,
} from "../controllers/design.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// All design routes require authentication
router.use(authMiddleware);

router.post("/", createDesignController);
router.get("/", getUserDesignsController);
router.get("/:designId", getDesignByIdController);
router.put("/:designId", updateDesignController);
router.delete("/:designId", deleteDesignController);

export default router;
