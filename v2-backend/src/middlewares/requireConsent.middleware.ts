import { Request, Response, NextFunction } from 'express';
import { TryOnErrorCode } from '../modules/tryon/tryon.errors.js';

/**
 * Middleware to ensure the user has explicitly given consent for AI photo processing.
 */
export const requireConsent = (req: Request, res: Response, next: NextFunction) => {
  const { consentGiven } = req.body;

  if (consentGiven !== true && consentGiven !== 'true') {
     res.status(400).json({
      success: false,
      error: {
        code: TryOnErrorCode.VALIDATION_ERROR,
        message: 'Explicit consent is required for AI processing of personal photos.'
      }
    });
    return;
  }

  next();
};
