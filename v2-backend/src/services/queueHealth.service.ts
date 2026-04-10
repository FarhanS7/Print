import { tryOnQueue } from '../queues/tryon.queue.js';

const WAITING_THRESHOLD = 100;
const ACTIVE_THRESHOLD = 20;

export class QueueHealthService {
  /**
   * Checks if the queue is overloaded to prevent UX degradation and provider saturation.
   */
  static async checkHealth(): Promise<{
    overloaded: boolean;
    waitingCount: number;
    activeCount: number;
    reason?: string;
  }> {
    const jobCounts = await tryOnQueue.getJobCounts('waiting', 'active', 'delayed');
    
    const isOverloaded = jobCounts.waiting > WAITING_THRESHOLD || jobCounts.active > ACTIVE_THRESHOLD;
    
    let reason = undefined;
    if (jobCounts.waiting > WAITING_THRESHOLD) {
      reason = 'System is experiencing high demand. Generation queue is full.';
    } else if (jobCounts.active > ACTIVE_THRESHOLD) {
      reason = 'System is at maximum processing capacity.';
    }

    return {
      overloaded: isOverloaded,
      waitingCount: jobCounts.waiting,
      activeCount: jobCounts.active,
      reason
    };
  }
}
