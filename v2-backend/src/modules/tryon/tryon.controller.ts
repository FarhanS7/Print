import type { Response } from "express";
import { TryOnErrorCode } from "./tryon.errors.js";
import { TryOnService } from "./tryon.service.js";
import { QueueHealthService } from "../../services/queueHealth.service.js";
import { TryOnSession } from "../../models/tryOnSession.model.js";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";

/**
 * Controller for coordinating AI Virtual Try-On requests.
 */
export class TryOnController {
  /**
   * POST /api/tryon
   * Initiates a new try-on session.
   */
  static async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "User authentication required",
          },
        });
      }

      const { designId, consentGiven } = req.body;
      const idempotencyKey = req.headers["idempotency-key"] as string;
      const files =
        (req.files as { [fieldname: string]: Express.Multer.File[] }) || {};

      const session = await TryOnService.createSession({
        userId,
        designId,
        idempotencyKey,
        consentGiven: consentGiven === "true" || consentGiven === true,
        files,
      });

      res.status(202).json({
        success: true,
        data: {
          sessionId: session._id,
          status: session.status,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: {
          code: error.code || TryOnErrorCode.UNKNOWN_ERROR,
          message: error.message,
        },
      });
    }
  }

  /**
   * GET /api/tryon/:sessionId/status
   * Polls the status of a specific session.
   */
  static async getStatus(req: AuthRequest, res: Response) {
    try {
      const sessionId = req.params.sessionId as string;
      const session = await TryOnService.getStatus(sessionId);
      if (!session) {
        res.status(404).json({ success: false, message: "Session not found" });
        return;
      }
      res.status(200).json({ success: true, data: session });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { code: TryOnErrorCode.UNKNOWN_ERROR },
      });
    }
  }

  /**
   * GET /api/tryon/:sessionId/result
   * Fetches the generated result URLs.
   */
  static async getResult(req: AuthRequest, res: Response) {
    try {
      const sessionId = req.params.sessionId as string;
      const result = await TryOnService.getResult(sessionId);
      if (!result) {
        res.status(404).json({
          success: false,
          message: "Result not found or not completed",
        });
        return;
      }
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { code: TryOnErrorCode.UNKNOWN_ERROR },
      });
    }
  }

  /**
   * POST /api/tryon/:sessionId/regenerate
   * Re-runs a session (creating a child session).
   */
  static async regenerate(req: AuthRequest, res: Response) {
    try {
      res.status(501).json({ success: false, message: "Not Implemented" });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { code: TryOnErrorCode.UNKNOWN_ERROR },
      });
    }
  }

  /**
   * GET /api/tryon/history
   * Lists the user's try-on history.
   */
  static async getHistory(req: AuthRequest, res: Response) {
    try {
      res.status(501).json({ success: false, message: "Not Implemented" });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { code: TryOnErrorCode.UNKNOWN_ERROR },
      });
    }
  }

  /**
   * GET /api/internal/health
   * Admin-only metrics endpoint.
   */
  static async getInternalHealth(req: AuthRequest, res: Response) {
    try {
      const queueHealth = await QueueHealthService.checkHealth();

      const now = new Date();
      const startOfToday = new Date(now.setHours(0, 0, 0, 0));

      const sessionsToday = await TryOnSession.countDocuments({
        createdAt: { $gte: startOfToday },
      });
      const completedToday = await TryOnSession.countDocuments({
        createdAt: { $gte: startOfToday },
        status: "completed",
      });
      const failedToday = await TryOnSession.countDocuments({
        createdAt: { $gte: startOfToday },
        status: "failed",
      });

      // Calculate provider failure rate
      const providerFailures = await TryOnSession.countDocuments({
        createdAt: { $gte: startOfToday },
        status: "failed",
        failureStage: { $in: ["provider_submit", "provider_poll"] },
      });
      const providerFailureRate =
        sessionsToday > 0 ? providerFailures / sessionsToday : 0;

      res.status(200).json({
        success: true,
        data: {
          queue: {
            waiting: queueHealth.waitingCount,
            active: queueHealth.activeCount,
            overloaded: queueHealth.overloaded,
          },
          today: {
            totalSessions: sessionsToday,
            completed: completedToday,
            failed: failedToday,
            providerFailureRate,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { code: TryOnErrorCode.UNKNOWN_ERROR },
      });
    }
  }
}
