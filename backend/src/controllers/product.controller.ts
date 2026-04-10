import { Request, Response } from 'express';
import { Product } from '../models/product.model';
import { NotFoundException } from '../utils/app-error';

export const getProductsController = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().lean();
        res.status(200).json({
            success: true,
            data: { products }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
};

export const getProductByIdController = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id).lean();
        if (!product) throw new NotFoundException("Product not found");

        res.status(200).json({
            success: true,
            data: { product }
        });
    } catch (error) {
        if (error instanceof NotFoundException) {
            return res.status(404).json({ success: false, message: error.message });
        }
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
