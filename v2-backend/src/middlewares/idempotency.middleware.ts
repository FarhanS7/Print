import { Request, Response, NextFunction } from 'express';
import { IdempotencyService } from '../services/idempotency.service.js';
import { TryOnErrorCode } from '../modules/tryon/tryon.errors.js';

/**
 * Middleware to enforce idempotency on try-on creation.
 * Requires 'Idempotency-Key' header.
 * Returns existing session if a duplicate is detected.
 */
export const enforceIdempotency = async (req: Request, res: Response, next: NextFunction) => {
  const idempotencyKey = req.headers['idempotency-key'] as string;
  const userId = (req as any).user?.id || (req as any).auth?.userId || req.body.userId;

  if (!idempotencyKey) {
     res.status(400).json({
      success: false,
      error: { 
        code: TryOnErrorCode.VALIDATION_ERROR, 
        message: 'Idempotency-Key header is required for this operation.' 
      }
    });
    return;
  }

  if (!userId) {
     res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Authentication required' }
    });
    return;
  }

  try {
    const existingSession = await IdempotencyService.findExistingSession(userId, idempotencyKey);
    
    if (existingSession) {
      // Replay the original response (the session info)
      console.log(`[Idempotency] Replaying response for session ${existingSession._id}`);
       res.status(200).json({
        success: true,
        data: {
          sessionId: existingSession._id,
          status: existingSession.status,
          isReplay: true
        }
      });
      return;
    }

    next();
  } catch (error) {
    console.error('[IdempotencyMiddleware] Error:', error);
    res.status(500).json({ success: false, error: { code: TryOnErrorCode.UNKNOWN_ERROR, message: 'Internal idempotency check error' } });
  }
};
