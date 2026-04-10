import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis.config.js';

export interface TryOnJobData {
  tryOnSessionId: string;
}

/**
 * BullMQ Queue definition for the Try-On generation jobs.
 */
export const tryOnQueue = new Queue<TryOnJobData>('tryon-generation', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 500 },
  }
});

export const addTryOnJob = async (sessionId: string) => {
  return await tryOnQueue.add('generate', { tryOnSessionId: sessionId });
};
