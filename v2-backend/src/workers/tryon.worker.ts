import { Worker, Job } from 'bullmq';
import { redisConnection } from '../config/redis.config.js';
import connectDB from '../config/db.config.js';
import { TryOnSession } from '../models/tryOnSession.model.js';
import { TryOnAsset } from '../models/tryOnAsset.model.js';
import { type TryOnJobData } from '../queues/tryon.queue.js';
import { FalTryOnProvider } from '../providers/tryon/falTryon.provider.js';
import { GarmentComposerService } from '../services/garmentComposer.service.js';
import { PhotoPolicyService } from '../services/photoPolicy.service.js';
import { CloudinaryService } from '../services/cloudinary.service.js';
import { AssetRollbackService } from '../services/assetRollback.service.js';
import { MetricsService } from '../services/metrics.service.js';
import { RetryPolicyService } from '../services/retryPolicy.service.js';
import { TryOnErrorCode, RetryableError, NonRetryableError } from '../modules/tryon/tryon.errors.js';

// Connect to MongoDB
connectDB();

const tryOnProvider = new FalTryOnProvider();

/**
 * BullMQ Worker for processing Try-On generation jobs.
 * Implements the 6-stage lifecycle and processing lock as per architecture spec.
 */
const worker = new Worker<TryOnJobData>('tryon-generation', async (job: Job<TryOnJobData>) => {
  const { tryOnSessionId } = job.data;
  const startTime = Date.now();
  const workerInstanceId = `worker-${process.pid}`;

  console.log(`[Worker] Starting job for session ${tryOnSessionId}`);

  // STAGE 1 — LOAD & LOCK
  const session = await TryOnSession.findOneAndUpdate(
    {
      _id: tryOnSessionId,
      status: 'queued',
      processingLock: false
    },
    {
      $set: {
        processingLock: true,
        lockedAt: new Date(),
        lockExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min lock
        workerId: workerInstanceId,
        queueStartedAt: new Date()
      }
    },
    { new: true }
  );

  if (!session) {
    console.warn(`[Worker] Failed to acquire lock for session ${tryOnSessionId}. Job may already be processing.`);
    return;
  }

  try {
    // STAGE 2 — VALIDATE PHOTOS
    await session.updateOne({ status: 'validating' });
    const frontAsset = await TryOnAsset.findOne({ tryOnSessionId, assetType: 'input_front' });
    if (!frontAsset) throw new NonRetryableError(TryOnErrorCode.VALIDATION_ERROR, 'Input assets not found.');

    const policyResult = await PhotoPolicyService.evaluate(frontAsset.url);
    if (!PhotoPolicyService.isAcceptable(policyResult)) {
      throw new NonRetryableError(TryOnErrorCode.POLICY_REJECTED, policyResult.rejectionReasons.join(', '));
    }

    // STAGE 3 — COMPOSED GARMENT
    await session.updateOne({ status: 'composing' });
    const stageStartTime = Date.now();
    
    // In a real app, we'd fetch product/design here. Assuming session has design info
    // (Actual logic would call an internal DesignService or similar)
    // For MVP, we use the designId to retrieve placement (to be implemented)
    
    // Mocking composition for flow completeness:
    // await GarmentComposerService.compose(...)

    MetricsService.logStage({
      sessionId: tryOnSessionId,
      userId: session.userId.toString(),
      stage: 'composition',
      durationMs: Date.now() - stageStartTime,
      outcome: 'success'
    });

    // STAGE 4 — PROVIDER GENERATION
    await session.updateOne({ status: 'generating', generationStartedAt: new Date() });
    const genStartTime = Date.now();

    const providerResult = await tryOnProvider.generate({
      frontImageUrl: frontAsset.url,
      garmentImageUrl: (session as any).composedGarmentUrl || frontAsset.url, // Placeholder
      tryOnType: 'upper'
    });

    await session.updateOne({ falRequestId: providerResult.requestId });

    MetricsService.logStage({
      sessionId: tryOnSessionId,
      userId: session.userId.toString(),
      stage: 'generation',
      durationMs: Date.now() - genStartTime,
      provider: tryOnProvider.name,
      outcome: 'success'
    });

    // STAGE 5 — INGEST RESULT
    await session.updateOne({ status: 'uploading_result' });
    const uploadResult: any = await CloudinaryService.uploadFromUrl(providerResult.outputImageUrl, 'printify-custom/tryon/outputs');
    
    await TryOnAsset.create({
      tryOnSessionId,
      userId: session.userId,
      assetType: 'output_preview',
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      isTemporary: false
    });

    // STAGE 6 — FINALIZE
    const totalDuration = Date.now() - startTime;
    await session.updateOne({
      status: 'completed',
      completedAt: new Date(),
      processingLock: false,
      $set: {
        'metadata.totalLatencyMs': totalDuration,
        'metadata.modelVersion': providerResult.modelVersion
      }
    });

    console.log(`[Worker] Job completed for session ${tryOnSessionId} in ${totalDuration}ms`);

  } catch (error: any) {
    console.error(`[Worker] Job failed for session ${tryOnSessionId}:`, error.message);

    const isRetryable = RetryPolicyService.isRetryable(error);
    const failureStage = (session as any).status || 'unknown';

    await session.updateOne({
      status: 'failed',
      processingLock: false,
      failureStage: failureStage,
      failureCode: error.code || TryOnErrorCode.UNKNOWN_ERROR,
      userVisibleError: error.message || 'An unexpected error occurred.',
      internalError: error.stack
    });

    // Rollback partial assets
    await AssetRollbackService.rollback(tryOnSessionId);

    MetricsService.logStage({
      sessionId: tryOnSessionId,
      userId: session.userId.toString(),
      stage: failureStage,
      durationMs: Date.now() - startTime,
      outcome: 'failure',
      errorCode: error.code
    });

    if (isRetryable) {
      throw error; // Re-throw to BullMQ for retry
    }
  }
}, { connection: redisConnection });

worker.on('failed', (job, err) => {
  console.error(`[Worker] Permanent job failure: ${job?.id}`, err);
});

console.log('[Worker] Try-On worker is running...');
export default worker;
