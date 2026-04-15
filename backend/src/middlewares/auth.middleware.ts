import type { Request, Response, NextFunction } from 'express';
import { Session } from '../models/user.model.js';
import { UnauthorizedException } from '../utils/app-error.js';

export interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

/**
 * Middleware to extract and validate userId from Better Auth session
 * Attaches userId to req.userId for use in controllers
 */
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Try to get session from Better Auth cookie
    const sessionToken = req.cookies['better-auth.session_token'] ||
                        req.headers.authorization?.replace('Bearer ', '');

    if (!sessionToken) {
      throw new UnauthorizedException('No session token found');
    }

    // Find the session in database
    const session = await Session.findOne({ token: sessionToken }).populate('userId');

    if (!session || !session.userId) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    // Check if session is expired
    if (new Date() > session.expiresAt) {
      throw new UnauthorizedException('Session expired');
    }

    // Attach userId to request
    req.userId = (session.userId as any)._id?.toString() || session.userId;
    req.user = session.userId;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : 'Authentication failed'
    });
  }
};

/**
 * Optional auth middleware - doesn't fail if no session, but extracts if available
 */
export const optionalAuthMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies['better-auth.session_token'] ||
                        req.headers.authorization?.replace('Bearer ', '');

    if (sessionToken) {
      const session = await Session.findOne({ token: sessionToken }).populate('userId');

      if (session && session.userId && new Date() <= session.expiresAt) {
        req.userId = (session.userId as any)._id?.toString() || session.userId;
        req.user = session.userId;
      }
    }

    next();
  } catch (error) {
    // Silently fail for optional auth
    next();
  }
};

/**
 * Middleware to validate that user owns the resource
 */
export const validateOwnership = (resourceField: string = 'userId') => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const resourceUserId = req.body[resourceField] || req.query[resourceField];

    if (resourceUserId && resourceUserId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You do not own this resource'
      });
    }

    next();
  };
};
