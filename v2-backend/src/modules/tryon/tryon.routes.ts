import { Router } from "express";
import multer from "multer";
import { TryOnController } from "./tryon.controller.js";
import { enforceIdempotency } from "../../middlewares/idempotency.middleware.js";
import { enforceTryOnLimits } from "../../middlewares/rateLimit.middleware.js";
import { requireConsent } from "../../middlewares/requireConsent.middleware.js";
import {
  authMiddleware,
  validateDesignOwnership,
} from "../../middlewares/auth.middleware.js";

const router = Router();

// Configure Multer for in-memory storage (to be uploaded to Cloudinary in service)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Primary creation route with full safety stack
router.post(
  "/",
  upload.fields([
    { name: "front", maxCount: 1 },
    { name: "side", maxCount: 1 },
    { name: "back", maxCount: 1 },
  ]),
  authMiddleware,
  validateDesignOwnership,
  requireConsent,
  enforceIdempotency,
  enforceTryOnLimits,
  TryOnController.create,
);

// Management & Polling routes
router.get("/:sessionId/status", authMiddleware, TryOnController.getStatus);
router.get("/:sessionId/result", authMiddleware, TryOnController.getResult);
router.post(
  "/:sessionId/regenerate",
  authMiddleware,
  enforceTryOnLimits,
  TryOnController.regenerate,
);
router.get("/history", authMiddleware, TryOnController.getHistory);

export default router;
