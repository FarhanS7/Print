import type { Request, Response } from 'express';
import { Design } from '../models/product.model.js';
import { BadRequestException } from '../utils/app-error.js';

export const createDesignController = async (req: Request, res: Response) => {
    try {
        const { productId, artworkUrl, artworkPlacement, title, price } = req.body;
        // In a real app, userId would come from req.user (Better Auth session)
        // For development/MVP we'll use a placeholder or handle it later
        const userId = req.body.userId || "000000000000000000000000"; // Placeholder

        if (!productId || !artworkUrl || !artworkPlacement) {
            throw new BadRequestException("Missing required design data");
        }

        const design = await Design.create({
            userId,
            productId,
            artworkUrl,
            artworkPlacement,
            title,
            price
        });

        res.status(201).json({
            success: true,
            data: { design }
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};

export const getUserDesignsController = async (req: Request, res: Response) => {
    try {
        const userId = (req.query.userId as string) || "000000000000000000000000"; // Placeholder
        const designs = await Design.find({ userId }).populate('productId').lean();

        res.status(200).json({
            success: true,
            data: { designs }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch designs"
        });
    }
};
