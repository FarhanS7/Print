import crypto from 'crypto';
import { TryOnSession } from '../models/tryOnSession.model.js';

/**
 * Service to handle idempotency and fingerprinting of try-on requests.
 */
export class IdempotencyService {
  /**
   * Finds an existing session based on userId and idempotencyKey.
   * Prevents double-billing and duplicate job creation.
   */
  static async findExistingSession(userId: string, idempotencyKey: string) {
    return await TryOnSession.findOne({ userId, idempotencyKey });
  }

  /**
   * Computes a unique fingerprint for the request based on input parameters and file content.
   * This helps detect if a user is submitting the exact same images and design again.
   */
  static computeFingerprint(params: {
    userId: string;
    designId: string;
    tryOnType: string;
    fileHashes: string[];
  }): string {
    const sortedHashes = [...params.fileHashes].sort();
    const payload = `${params.userId}|${params.designId}|${params.tryOnType}|${sortedHashes.join(',')}`;
    
    return crypto.createHash('sha256').update(payload).digest('hex');
  }

  /**
   * Utility to hash file buffers.
   */
  static hashBuffer(buffer: Buffer): string {
    return crypto.createHash('md5').update(buffer).digest('hex');
  }
}
