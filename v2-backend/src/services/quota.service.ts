import { TryOnSession } from '../models/tryOnSession.model.js';
import dotenv from 'dotenv';
dotenv.config();

const DAILY_LIMIT = parseInt(process.env.TRYON_DAILY_LIMIT || '5');
const CONCURRENT_LIMIT = parseInt(process.env.TRYON_CONCURRENT_LIMIT || '2');
const COOLDOWN_SECONDS = parseInt(process.env.TRYON_COOLDOWN_SECONDS || '30');

export class QuotaService {
  /**
   * Checks if a user is within their generation limits and not in a cooldown period.
   */
  static async checkQuota(userId: string) {
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));

    // 1. Daily limit check
    const dailyUsed = await TryOnSession.countDocuments({
      userId,
      createdAt: { $gte: startOfToday },
      status: { $ne: 'cancelled' }
    });

    // 2. Concurrent jobs check
    const activeCount = await TryOnSession.countDocuments({
      userId,
      status: { $in: ['queued', 'validating', 'composing', 'generating', 'uploading_result'] }
    });

    // 3. Cooldown check
    const lastSession = await TryOnSession.findOne({ userId })
      .sort({ createdAt: -1 })
      .select('createdAt');

    let cooldownRemainingMs = 0;
    if (lastSession) {
      const elapsedMs = Date.now() - new Date(lastSession.createdAt).getTime();
      cooldownRemainingMs = Math.max(0, (COOLDOWN_SECONDS * 1000) - elapsedMs);
    }

    return {
      allowed: dailyUsed < DAILY_LIMIT && activeCount < CONCURRENT_LIMIT && cooldownRemainingMs === 0,
      dailyUsed,
      dailyLimit: DAILY_LIMIT,
      activeCount,
      concurrentLimit: CONCURRENT_LIMIT,
      cooldownRemainingMs
    };
  }
}
