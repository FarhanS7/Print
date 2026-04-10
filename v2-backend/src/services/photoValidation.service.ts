import { TryOnErrorCode, NonRetryableError } from '../modules/tryon/tryon.errors.js';

/**
 * Service for technical validation of uploaded photos.
 * Ensures files are readable and meet basic format/size requirements.
 */
export class PhotoValidationService {
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  private static readonly MIN_DIMENSION = 512;
  private static readonly MAX_DIMENSION = 4096;

  /**
   * Performs technical checks on an uploaded file.
   * Throws NonRetryableError if validation fails.
   */
  static validate(file: Express.Multer.File) {
    // 1. Check MIME type
    if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new NonRetryableError(
        TryOnErrorCode.VALIDATION_ERROR,
        `Unsupported image format: ${file.mimetype}. Please use JPEG, PNG, or WebP.`
      );
    }

    // 2. Check File Size
    if (file.size > this.MAX_FILE_SIZE) {
      throw new NonRetryableError(
        TryOnErrorCode.VALIDATION_ERROR,
        `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max size is 10MB.`
      );
    }

    // Note: Dimension checks usually require an image processing library like 'sharp'.
    // For now, we'll assume basic file checks are enough for MVP technical validation
    // or rely on Cloudinary's behavior during upload.
    return true;
  }
}
