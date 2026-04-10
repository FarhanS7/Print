import { TryOnAsset } from '../models/tryOnAsset.model.js';
// We'll import Cloudinary service later when implemented
// import * as CloudinaryService from './cloudinary.service.js';

/**
 * Service to handle cleanup of orphaned or incomplete assets during failures.
 */
export class AssetRollbackService {
  /**
   * Cleans up assets created during a specific failed try-on attempt.
   * Keeps raw input assets but removes intermediate composition/output assets.
   */
  static async rollback(sessionId: string) {
    console.log(`[AssetRollback] Starting cleanup for session ${sessionId}`);
    
    // Find assets that are not primary inputs
    const temporaryAssets = await TryOnAsset.find({
      tryOnSessionId: sessionId,
      assetType: { $in: ['garment_reference', 'output_preview', 'output_hd'] }
    });

    for (const asset of temporaryAssets) {
      try {
        console.log(`[AssetRollback] Deleting asset: ${asset.publicId} (${asset.assetType})`);
        
        // This will be wired to the CloudinaryService later
        // await CloudinaryService.deleteAsset(asset.publicId);
        
        await TryOnAsset.deleteOne({ _id: asset._id });
      } catch (error) {
        console.error(`[AssetRollback] Failed to delete asset ${asset.publicId}:`, error);
      }
    }
  }
}
