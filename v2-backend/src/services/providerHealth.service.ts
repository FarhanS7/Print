import { redisConnection } from '../config/redis.config.js';

const BREAKER_KEY = 'tryon:breaker:status';
const FAIL_COUNT_KEY = 'tryon:breaker:failures';
const SUCCESS_COUNT_KEY = 'tryon:breaker:successes';
const FAIL_THRESHOLD = 10;
const BREAKER_WINDOW_SEC = 300; // 5 minutes
const OPEN_DURATION_SEC = 120;  // 2 minutes

export class ProviderHealthService {
  /**
   * Checks if the circuit breaker is open.
   */
  static async isBreakerOpen(): Promise<boolean> {
    const status = await redisConnection.get(BREAKER_KEY);
    return status === 'open';
  }

  /**
   * Records a provider failure and checks if the breaker should be opened.
   */
  static async recordFailure() {
    const fails = await redisConnection.incr(FAIL_COUNT_KEY);
    if (fails === 1) {
      await redisConnection.expire(FAIL_COUNT_KEY, BREAKER_WINDOW_SEC);
    }

    const successes = parseInt(await redisConnection.get(SUCCESS_COUNT_KEY) || '0');
    const total = fails + successes;
    const successRate = total > 0 ? (successes / total) : 1;

    if (fails >= FAIL_THRESHOLD && successRate < 0.3) {
      await this.openBreaker();
    }
  }

  /**
   * Records a provider success.
   */
  static async recordSuccess() {
    const successes = await redisConnection.incr(SUCCESS_COUNT_KEY);
    if (successes === 1) {
      await redisConnection.expire(SUCCESS_COUNT_KEY, BREAKER_WINDOW_SEC);
    }
  }

  private static async openBreaker() {
    console.warn('[CircuitBreaker] Opening circuit due to high provider failure rate');
    await redisConnection.set(BREAKER_KEY, 'open', 'EX', OPEN_DURATION_SEC);
    // Reset counts when opening
    await redisConnection.del(FAIL_COUNT_KEY);
    await redisConnection.del(SUCCESS_COUNT_KEY);
  }
}
