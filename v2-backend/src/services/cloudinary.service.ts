import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export class CloudinaryService {
  /**
   * Uploads a Buffer/File to Cloudinary.
   */
  static async uploadBuffer(buffer: Buffer, folder: string) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
  }

  /**
   * Generates a flat garment reference by overlaying artwork on a base mockup.
   * This uses Cloudinary transformations to produce a flat result.
   */
  static async composeGarment(options: {
    mockupPublicId: string;
    artworkPublicId: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
  }): Promise<string> {
    const { mockupPublicId, artworkPublicId, x, y, width, height, rotation } = options;

    return cloudinary.url(mockupPublicId, {
      transformation: [
        { overlay: artworkPublicId.replace(/\//g, ":") },
        { width: Math.round(width), height: Math.round(height), crop: "fit", angle: rotation },
        { flags: "layer_apply", gravity: "north_west", x: Math.round(x), y: Math.round(y) },
        { fetch_format: "png", quality: "auto" }
      ]
    });
  }

  /**
   * Fetches an external URL and uploads it to Cloudinary.
   */
  static async uploadFromUrl(url: string, folder: string) {
    return await cloudinary.uploader.upload(url, { folder, resource_type: 'image' });
  }

  /**
   * Deletes an asset from Cloudinary.
   */
  static async deleteAsset(publicId: string) {
    return await cloudinary.uploader.destroy(publicId);
  }
}
