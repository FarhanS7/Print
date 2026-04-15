import connectDB from '../config/db.config.js';
import { TryOnAsset } from '../models/tryOnAsset.model.js';
import { CloudinaryService } from '../services/cloudinary.service.js';

// Setup environment and DB
import dotenv from 'dotenv';
dotenv.config();

/**
 * Script to manually clean up assets that have expired. 
 * While MongoDB's TTL index will delete the DB document, we need a cron/script
 * to ensure Cloudinary also deletes the physical files to prevent cost leaks.
 */
async function runCleanup() {
  await connectDB();
  console.log('[Cleanup] Starting routine asset cleanup...');

  try {
    // Find assets where expiresAt is in the past
    // Note: If MongoDB TTL deleted them already, we might miss them.
    // A better pattern for production is listening to document deletion streams
    // or marking them 'deleted_pending' and doing batch cleanup.
    // For MVP, we'll fetch assets past their expiry.
    
    const now = new Date();
    const expiredAssets = await TryOnAsset.find({ 
      expiresAt: { $lt: now } 
    });

    console.log(`[Cleanup] Found ${expiredAssets.length} expired assets to remove.`);

    let successCount = 0;
    let failCount = 0;

    for (const asset of expiredAssets) {
      try {
        console.log(`[Cleanup] Deleting from Cloudinary: ${asset.publicId}`);
        await CloudinaryService.deleteAsset(asset.publicId);
        
        // Remove from DB
        await TryOnAsset.deleteOne({ _id: asset._id });
        successCount++;
      } catch (err) {
        console.error(`[Cleanup] Failed to delete asset ${asset.publicId}:`, err);
        failCount++;
      }
    }

    console.log(`[Cleanup] Finished. Success: ${successCount}. Failed: ${failCount}.`);
  } catch (err) {
    console.error('[Cleanup] Fatal error during cleanup:', err);
  } finally {
    process.exit(0);
  }
}

runCleanup();
