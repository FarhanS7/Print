import { Router } from 'express';
import multer from 'multer';
import { TryOnController } from './tryon.controller.js';
import { enforceIdempotency } from '../../middlewares/idempotency.middleware.js';
import { enforceTryOnLimits } from '../../middlewares/rateLimit.middleware.js';
import { requireConsent } from '../../middlewares/requireConsent.middleware.js';

const router = Router();

// Configure Multer for in-memory storage (to be uploaded to Cloudinary in service)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Primary creation route with full safety stack
router.post(
  '/',
  upload.fields([
    { name: 'front', maxCount: 1 },
    { name: 'side', maxCount: 1 },
    { name: 'back', maxCount: 1 }
  ]),
  requireConsent,
  enforceIdempotency,
  enforceTryOnLimits,
  TryOnController.create
);

// Management & Polling routes
router.get('/:sessionId/status', TryOnController.getStatus);
router.get('/:sessionId/result', TryOnController.getResult);
router.post('/:sessionId/regenerate', enforceTryOnLimits, TryOnController.regenerate);
router.get('/history', TryOnController.getHistory);

export default router;
