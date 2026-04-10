import { TryOnErrorCode, RetryableError, NonRetryableError } from '../modules/tryon/tryon.errors.js';

/**
 * Service to determine if a failed job should be retried based on error type.
 */
export class RetryPolicyService {
  /**
   * Classifies an error and returns whether it is retryable.
   */
  static isRetryable(error: any): boolean {
    if (error instanceof RetryableError) return true;
    if (error instanceof NonRetryableError) return false;

    // Default classification for unknown errors
    const code = error.code || error.response?.data?.error?.code;
    
    const retryableCodes = [
      TryOnErrorCode.PROVIDER_TIMEOUT,
      TryOnErrorCode.PROVIDER_FAILURE,
      TryOnErrorCode.PROVIDER_UNAVAILABLE,
      TryOnErrorCode.UPLOAD_FAILED,
      'ECONNRESET',
      'ETIMEDOUT'
    ];

    if (retryableCodes.includes(code)) return true;

    return false;
  }
}
