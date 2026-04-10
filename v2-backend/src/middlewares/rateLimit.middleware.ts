import { Request, Response, NextFunction } from 'express';
import { QuotaService } from '../services/quota.service.js';
import { ProviderHealthService } from '../services/providerHealth.service.js';
import { QueueHealthService } from '../services/queueHealth.service.js';
import { TryOnErrorCode } from '../modules/tryon/tryon.errors.js';

/**
 * Advanced rate-limiting and quota enforcement middleware.
 * Orchestrates quota checks, circuit breakers, and queue backpressure.
 */
export const enforceTryOnLimits = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user?.id || (req as any).auth?.userId || req.body.userId;

  if (!userId) {
     res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Authentication required' }
    });
    return;
  }

  try {
    // 1. Check Circuit Breaker (Provider Health)
    if (await ProviderHealthService.isBreakerOpen()) {
       res.status(503).json({
        success: false,
        error: { 
          code: TryOnErrorCode.PROVIDER_UNAVAILABLE, 
          message: 'AI try-on is temporarily busy. Please try again shortly.' 
        }
      });
      return;
    }

    // 2. Check Queue Health (Backpressure)
    const queueHealth = await QueueHealthService.checkHealth();
    if (queueHealth.overloaded) {
       res.status(429).json({
        success: false,
        error: { 
          code: TryOnErrorCode.QUEUE_OVERLOADED, 
          message: queueHealth.reason || 'High demand. Please try again in a few minutes.' 
        }
      });
      return;
    }

    // 3. Check User Quota
    const quota = await QuotaService.checkQuota(userId);
    
    if (!quota.allowed) {
      if (quota.dailyUsed >= quota.dailyLimit) {
         res.status(403).json({
          success: false,
          error: { code: TryOnErrorCode.QUOTA_EXCEEDED, message: 'Daily try-on limit reached. Come back tomorrow!' }
        });
        return;
      }

      if (quota.activeCount >= quota.concurrentLimit) {
         res.status(429).json({
          success: false,
          error: { code: TryOnErrorCode.CONCURRENT_LIMIT_REACHED, message: 'You have too many active try-on generations. Wait for one to finish.' }
        });
        return;
      }

      if (quota.cooldownRemainingMs > 0) {
         res.status(429).json({
          success: false,
          error: { 
            code: TryOnErrorCode.COOLDOWN_ACTIVE, 
            message: `Please wait ${Math.ceil(quota.cooldownRemainingMs / 1000)}s before your next try-on.`,
            retryAfter: Math.ceil(quota.cooldownRemainingMs / 1000)
          }
        });
        return;
      }
    }

    next();
  } catch (error) {
    console.error('[RateLimitMiddleware] Error:', error);
    res.status(500).json({ success: false, error: { code: TryOnErrorCode.UNKNOWN_ERROR, message: 'Internal limit check error' } });
  }
};
