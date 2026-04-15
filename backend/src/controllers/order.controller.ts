import type { Request, Response } from "express";
import { createCheckoutSession } from "../services/stripe.service.js";
import { Design } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { BadRequestException, NotFoundException } from "../utils/app-error.js";

export interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

export const checkoutController = async (req: AuthRequest, res: Response) => {
  try {
    const { designId } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User must be authenticated to checkout",
      });
    }

    if (!designId) throw new BadRequestException("Design ID is required");

    const design = await Design.findOne({ _id: designId, userId }).populate(
      "productId",
    );
    if (!design)
      throw new NotFoundException(
        "Design not found or you do not have permission to access it",
      );

    const product = design.productId as any;

    // Create the Stripe session
    const session = await createCheckoutSession(
      designId,
      userId,
      design.price || product.basePrice || 24.99,
      design.title || product.name || "Custom Design",
      design.artworkUrl,
    );

    // Create a pending order in our database
    await Order.create({
      userId,
      designId,
      productId: product._id,
      totalAmount: design.price || product.basePrice || 24.99,
      stripeSessionId: session.id,
      status: "pending",
    });

    res.status(200).json({
      success: true,
      data: { url: session.url },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

export const getUserOrdersController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User must be authenticated to view orders",
      });
    }

    const orders = await Order.find({ userId })
      .populate("designId")
      .populate("productId")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: { orders },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

export const getOrderByIdController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User must be authenticated",
      });
    }

    const order = await Order.findOne({ _id: orderId, userId })
      .populate("designId")
      .populate("productId")
      .lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      data: { order },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};

export const updateOrderStatusController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { orderId } = req.params;
    const { status, shippingAddress } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User must be authenticated",
      });
    }

    if (!["pending", "paid", "shipped", "cancelled"].includes(status)) {
      throw new BadRequestException("Invalid order status");
    }

    const order = await Order.findOneAndUpdate(
      { _id: orderId, userId },
      {
        status,
        ...(shippingAddress && { shippingAddress }),
        updatedAt: new Date(),
      },
      { new: true },
    )
      .populate("designId")
      .populate("productId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      data: { order },
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

export const cancelOrderController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User must be authenticated",
      });
    }

    const order = await Order.findOneAndUpdate(
      { _id: orderId, userId, status: { $in: ["pending", "paid"] } },
      { status: "cancelled", updatedAt: new Date() },
      { new: true },
    )
      .populate("designId")
      .populate("productId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found, access denied, or cannot be cancelled",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: { order },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
    });
  }
};
