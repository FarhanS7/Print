import { Request, Response } from 'express';
import { generateArtwork } from '../services/ai.service';
import { BadRequestException } from '../utils/app-error';

export const generateAIArtworkController = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            throw new BadRequestException("Prompt is required");
        }

        const artworkUrl = await generateArtwork(prompt);

        res.status(200).json({
            success: true,
            data: { artworkUrl }
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};
