import axios from 'axios';
import cloudinary from '../config/cloudinary.config.js';
import { InternalServerException } from '../utils/app-error.js';

/**
 * Generates an image using Pollinations.ai (Free/No-Key)
 * and uploads it to Cloudinary.
 */
export const generateArtwork = async (prompt: string): Promise<string> => {
    try {
        // Pollinations URL format: https://pollinations.ai/p/[prompt]?width=[w]&height=[h]&seed=[s]&model=[m]
        const encodedPrompt = encodeURIComponent(prompt);
        const pollinationsUrl = `https://pollinations.ai/p/${encodedPrompt}?width=1024&height=1024&nologo=true`;

        // We can directly upload the external URL to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(pollinationsUrl, {
            folder: "printify-custom/artworks",
            resource_type: "image"
        });

        return uploadResult.secure_url;
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new InternalServerException("Failed to generate artwork from AI");
    }
};
