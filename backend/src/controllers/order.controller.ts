import { Request, Response } from 'express';
import { createCheckoutSession } from '../services/stripe.service';
import { Design } from '../models/product.model';
import { Order } from '../models/order.model';
import { BadRequestException, NotFoundException } from '../utils/app-error';

export const checkoutController = async (req: Request, res: Response) => {
    try {
        const { designId } = req.body;
        const userId = req.body.userId || "000000000000000000000000"; // Placeholder

        if (!designId) throw new BadRequestException("Design ID is required");

        const design = await Design.findById(designId).populate('productId').lean();
        if (!design) throw new NotFoundException("Design not found");

        const product = design.productId as any;

        // Create the Stripe session
        const session = await createCheckoutSession(
            designId,
            userId,
            design.price || product.basePrice || 24.99,
            design.title || product.name || "Custom Design",
            design.artworkUrl
        );

        // Create a pending order in our database
        await Order.create({
            userId,
            designId,
            productId: product._id,
            totalAmount: design.price || product.basePrice || 24.99,
            stripeSessionId: session.id,
            status: 'pending'
        });

        res.status(200).json({
            success: true,
            data: { url: session.url }
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

export const getUserOrdersController = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId || "000000000000000000000000"; // Placeholder
        const orders = await Order.find({ userId })
            .populate('designId')
            .populate('productId')
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            data: { orders }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};
