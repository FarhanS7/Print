import type { Request, Response, NextFunction } from "express";

/**
 * Extended Request interface with auth properties
 */
export interface AuthRequest extends Request {
  userId?: string;
  sessionToken?: string;
  design?: any;
}

/**
 * Middleware to extract and validate userId from session/auth token.
 * Supports:
 * - Session cookie (better-auth.session_token)
 * - Authorization header (Bearer token)
 * - userId in request body (backward compatibility)
 */
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let userId: string | undefined;
    let sessionToken: string | undefined;

    // Try session cookie first
    const sessionCookie = req.cookies["better-auth.session_token"];
    if (sessionCookie) {
      sessionToken = sessionCookie;
      userId = sessionCookie;
    }

    // Try Authorization header
    if (!userId) {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ")) {
        sessionToken = authHeader.substring(7);
        userId = sessionToken;
      }
    }

    // Try body userId (backward compatibility)
    if (!userId && req.body?.userId) {
      userId = req.body.userId;
    }

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "No authentication token provided",
      });
      return;
    }

    // Validate MongoDB ObjectId format
    if (!isValidMongoId(userId)) {
      res.status(401).json({
        success: false,
        message: "Invalid user ID format",
      });
      return;
    }

    req.userId = userId;
    req.sessionToken = sessionToken;
    next();
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Auth error";
    console.error(`[Auth Middleware] ${msg}`);

    res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};

/**
 * Middleware to validate that designId belongs to the authenticated user.
 * Queries the backend API to verify design ownership.
 */
export const validateDesignOwnership = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    const designId = req.body?.designId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
      return;
    }

    if (!designId) {
      res.status(400).json({
        success: false,
        message: "designId is required",
      });
      return;
    }

    if (!isValidMongoId(designId)) {
      res.status(400).json({
        success: false,
        message: "Invalid design ID format",
      });
      return;
    }

    // Query backend API to verify design ownership
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";
    const verifyUrl = `${backendUrl}/api/designs/${designId}`;

    try {
      const response = await fetch(verifyUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          res.status(404).json({
            success: false,
            message: "Design not found",
          });
          return;
        }
        throw new Error(`Backend error: ${response.status}`);
      }

      const designData = (await response.json()) as any;

      // Verify ownership
      if ((designData as any).data?.userId !== userId) {
        console.warn(
          `User ${userId} attempted to access design ${designId} of another user`,
        );
        res.status(403).json({
          success: false,
          message: "You do not own this design",
        });
        return;
      }

      req.design = (designData as any).data;
      next();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      console.error(`[Design Validation] Backend query failed: ${msg}`);
      res.status(503).json({
        success: false,
        message: "Unable to verify design ownership",
      });
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Design Ownership] ${msg}`);

    res.status(500).json({
      success: false,
      message: "Authorization error",
    });
  }
};

/**
 * Optional auth middleware - does not fail if auth is missing
 */
export const optionalAuthMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionCookie = req.cookies["better-auth.session_token"];
    if (sessionCookie && isValidMongoId(sessionCookie)) {
      req.userId = sessionCookie;
    }

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      if (isValidMongoId(token)) {
        req.userId = token;
      }
    }

    if (!req.userId && req.body?.userId) {
      req.userId = req.body.userId;
    }

    next();
  } catch (error) {
    next();
  }
};

/**
 * Helper: Validate MongoDB ObjectId format (24 hex characters)
 */
function isValidMongoId(id: string): boolean {
  return /^[a-f0-9]{24}$/i.test(id);
}

export default authMiddleware;
