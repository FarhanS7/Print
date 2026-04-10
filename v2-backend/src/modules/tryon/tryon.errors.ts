/**
 * Canonical Error Codes for the Try-On Service.
 * Matches the senior architecture specification (Patch 12).
 */
export enum TryOnErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  POLICY_REJECTED = 'POLICY_REJECTED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  COOLDOWN_ACTIVE = 'COOLDOWN_ACTIVE',
  CONCURRENT_LIMIT_REACHED = 'CONCURRENT_LIMIT_REACHED',
  IDEMPOTENCY_REPLAY = 'IDEMPOTENCY_REPLAY',
  QUEUE_OVERLOADED = 'QUEUE_OVERLOADED',
  PROVIDER_TIMEOUT = 'PROVIDER_TIMEOUT',
  PROVIDER_FAILURE = 'PROVIDER_FAILURE',
  PROVIDER_UNAVAILABLE = 'PROVIDER_UNAVAILABLE',
  COMPOSITION_FAILED = 'COMPOSITION_FAILED',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  SOURCE_IMAGES_EXPIRED = 'SOURCE_IMAGES_EXPIRED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class TryOnError extends Error {
  public code: TryOnErrorCode;
  public details?: any;

  constructor(code: TryOnErrorCode, message: string, details?: any) {
    super(message);
    this.name = 'TryOnError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Specifically for the worker to differentiate retryable vs non-retryable errors
 */
export class RetryableError extends TryOnError {
  constructor(code: TryOnErrorCode, message: string, details?: any) {
    super(code, message, details);
    this.name = 'RetryableError';
  }
}

export class NonRetryableError extends TryOnError {
  constructor(code: TryOnErrorCode, message: string, details?: any) {
    super(code, message, details);
    this.name = 'NonRetryableError';
  }
}
