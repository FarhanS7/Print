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
        console.log(`[AI Service] Generating artwork for prompt: "${prompt}"`);
        const encodedPrompt = encodeURIComponent(prompt);
        const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;
        console.log(`[AI Service] Fetching from: ${pollinationsUrl}`);

        // Fetch image as buffer to avoid Cloudinary remote fetch errors
        const response = await axios.get(pollinationsUrl, { 
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const buffer = Buffer.from(response.data);
        console.log(`[AI Service] Fetched image size: ${buffer.length} bytes`);
        console.log(`[AI Service] Content-Type: ${response.headers['content-type']}`);

        const base64Image = `data:${response.headers['content-type'] || 'image/jpeg'};base64,${buffer.toString('base64')}`;

        console.log(`[AI Service] Fetch successful, uploading to Cloudinary...`);

        const uploadResult = await cloudinary.uploader.upload(base64Image, {
            folder: "printify-custom/artworks",
            resource_type: "image"
        });

        console.log(`[AI Service] Upload successful: ${uploadResult.secure_url}`);
        return uploadResult.secure_url;
    } catch (error: any) {
        console.error("AI Generation Error Details:", error);
        throw new InternalServerException(`Failed to generate artwork: ${error.message || 'Unknown error'}`);
    }
};
