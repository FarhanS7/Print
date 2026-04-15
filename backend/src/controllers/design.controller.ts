import type { Request, Response } from "express";
import { Design } from "../models/product.model.js";
import { BadRequestException } from "../utils/app-error.js";

export interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

export const createDesignController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { productId, artworkUrl, artworkPlacement, title, price } = req.body;

    // Get userId from authenticated session
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User must be authenticated to create a design",
      });
    }

    if (!productId || !artworkUrl || !artworkPlacement) {
      throw new BadRequestException("Missing required design data");
    }

    const design = await Design.create({
      userId,
      productId,
      artworkUrl,
      artworkPlacement,
      title,
      price,
    });

    res.status(201).json({
      success: true,
      data: { design },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const getUserDesignsController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User must be authenticated to view designs",
      });
    }

    const designs = await Design.find({ userId }).populate("productId").lean();

    res.status(200).json({
      success: true,
      data: { designs },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch designs",
    });
  }
};

export const getDesignByIdController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { designId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User must be authenticated",
      });
    }

    const design = await Design.findOne({ _id: designId, userId }).populate(
      "productId",
    );

    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Design not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      data: { design },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch design",
    });
  }
};

export const updateDesignController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { designId } = req.params;
    const { artworkPlacement, title, price } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User must be authenticated",
      });
    }

    const design = await Design.findOneAndUpdate(
      { _id: designId, userId },
      { artworkPlacement, title, price },
      { new: true },
    ).populate("productId");

    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Design not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      data: { design },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const deleteDesignController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { designId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User must be authenticated",
      });
    }

    const design = await Design.findOneAndDelete({ _id: designId, userId });

    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Design not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete design",
    });
  }
};
