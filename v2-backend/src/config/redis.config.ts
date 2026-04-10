import IORedis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

export const redisConnection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,  // Required by BullMQ
});

redisConnection.on('error', (err) => {
  console.error('[Redis] Connection error:', err.message);
});

redisConnection.on('connect', () => {
  console.log('[Redis] Connected to Redis successfully');
});
