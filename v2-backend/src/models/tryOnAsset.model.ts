import mongoose from 'mongoose';

const tryOnAssetSchema = new mongoose.Schema({
  tryOnSessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'TryOnSession', required: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },

  assetType: {
    type: String,
    enum: [
      'input_front', 'input_side', 'input_back',
      'garment_reference',
      'output_preview', 'output_hd'
    ],
    required: true
  },

  storageProvider: { type: String, default: 'cloudinary' },
  url: { type: String, required: true },
  publicId: { type: String, required: true },

  // Role in lifecycle
  isTemporary: { type: Boolean, default: false },
  expiresAt: { type: Date }, // Will be auto-cleaned by TTL index

  // File metadata
  width: { type: Number },
  height: { type: Number },
  bytes: { type: Number },
  mimeType: { type: String },
}, { timestamps: true });

// TTL Index for auto-cleanup of temporary assets (raw photos)
// Note: expiresAt must be set for this to take effect on a document
tryOnAssetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const TryOnAsset = mongoose.model('TryOnAsset', tryOnAssetSchema);
