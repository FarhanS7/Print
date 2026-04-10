import { CloudinaryService } from './cloudinary.service.js';

export interface ArtworkPlacement {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  width: number;
  height: number;
}

/**
 * Service for composing clean garment reference images for AI consumption.
 * Differs from storefront mockups in that it aims for AI-ready clarity.
 */
export class GarmentComposerService {
  /**
   * Composes a flat garment reference by overlaying artwork on a base mockup.
   */
  static async compose(data: {
    mockupPublicId: string;
    artworkPublicId: string;
    placement: ArtworkPlacement;
  }): Promise<{ url: string; publicId: string }> {
    console.log(`[GarmentComposer] Composing garment for artwork: ${data.artworkPublicId}`);
    
    // 1. Generate the transformation URL
    const composedUrl = await CloudinaryService.composeGarment({
      mockupPublicId: data.mockupPublicId,
      artworkPublicId: data.artworkPublicId,
      x: data.placement.x,
      y: data.placement.y,
      width: data.placement.width,
      height: data.placement.height,
      rotation: data.placement.rotation
    });

    // 2. Upload the newly composed image to Cloudinary to get a permanent flat publicId
    // This provides a cleaner input for the Try-On provider
    const result: any = await CloudinaryService.uploadFromUrl(
      composedUrl, 
      'printify-custom/tryon/garment-references'
    );

    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  }
}
