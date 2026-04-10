import { mongoose } from 'mongoose';
import { TryOnSession } from '../../models/tryOnSession.model.js';
import { TryOnAsset } from '../../models/tryOnAsset.model.js';
import { IdempotencyService } from '../../services/idempotency.service.js';
import { PhotoValidationService } from '../../services/photoValidation.service.js';
import { addTryOnJob } from '../../queues/tryon.queue.js';
import { TryOnErrorCode, NonRetryableError } from './tryon.errors.js';

/**
 * Orchestrator service for coordinating try-on business processes.
 */
export class TryOnService {

  /**
   * Creates a new try-on session and enqueues a generation job.
   */
  static async createSession(data: {
    userId: string;
    designId: string;
    idempotencyKey: string;
    consentGiven: boolean;
    files: { [fieldname: string]: Express.Multer.File[] };
  }) {
    const frontFile = data.files['front']?.[0];
    if (!frontFile) {
      throw new NonRetryableError(TryOnErrorCode.VALIDATION_ERROR, 'A front-facing photo is required.');
    }

    // 1. Technical Validation
    PhotoValidationService.validate(frontFile);
    if (data.files['side']?.[0]) PhotoValidationService.validate(data.files['side'][0]);
    if (data.files['back']?.[0]) PhotoValidationService.validate(data.files['back'][0]);

    // 2. Compute Fingerprint
    const fileHashes = [IdempotencyService.hashBuffer(frontFile.buffer)];
    if (data.files['side']?.[0]) fileHashes.push(IdempotencyService.hashBuffer(data.files['side'][0].buffer));
    if (data.files['back']?.[0]) fileHashes.push(IdempotencyService.hashBuffer(data.files['back'][0].buffer));

    const fingerprint = IdempotencyService.computeFingerprint({
      userId: data.userId,
      designId: data.designId,
      tryOnType: 'upper',
      fileHashes
    });

    // 3. Create Session Record
    // (In Phase B, we will handle actual Cloudinary upload of inputs)
    // For now, we create the session record in 'queued' status.
    const session = await TryOnSession.create({
      userId: data.userId,
      designId: data.designId,
      idempotencyKey: data.idempotencyKey,
      fingerprintHash: fingerprint,
      consentGiven: data.consentGiven,
      status: 'queued'
    });

    // 4. Enqueue Job
    await addTryOnJob((session._id as any).toString());

    return session;
  }

  /**
   * Status and Result retrieval logic...
   */
  static async getStatus(sessionId: string) {
    return await TryOnSession.findById(sessionId).select('status failureStage userVisibleError updatedAt');
  }

  static async getResult(sessionId: string) {
    const session = await TryOnSession.findById(sessionId);
    if (!session || session.status !== 'completed') return null;

    const assets = await TryOnAsset.find({ 
      tryOnSessionId: sessionId, 
      assetType: { $in: ['output_preview', 'output_hd'] } 
    });

    return {
      sessionId: session._id,
      status: session.status,
      previewUrl: assets.find(a => a.assetType === 'output_preview')?.url || null,
      hdUrl: assets.find(a => a.assetType === 'output_hd')?.url || null
    };
  }
}
