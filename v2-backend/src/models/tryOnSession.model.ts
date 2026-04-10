import mongoose from 'mongoose';

const tryOnSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  designId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },

  tryOnType: { type: String, enum: ['upper'], default: 'upper' },
  status: {
    type: String,
    enum: [
      'queued', 'validating', 'composing', 'generating',
      'uploading_result', 'completed', 'failed', 'cancelled'
    ],
    default: 'queued',
    index: true
  },

  // Lock mechanism for workers
  processingLock: { type: Boolean, default: false, index: true },
  lockedAt: { type: Date },
  workerId: { type: String },
  lockExpiresAt: { type: Date },

  // Idempotency & fingerprinting
  consentGiven: { type: Boolean, required: true },
  idempotencyKey: { type: String, required: true },
  fingerprintHash: { type: String, required: true, index: true },

  // Regeneration lineage
  sourceSessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'TryOnSession' },

  // Provider details
  provider: { type: String, default: 'fal' },
  providerModel: { type: String, default: 'fal-ai/fashn/tryon/v1.6' },
  falRequestId: { type: String },

  // Quota & Cost
  retryCount: { type: Number, default: 0 },
  quotaCharged: { type: Boolean, default: false },
  costEstimateCents: { type: Number },

  // Failure tracking
  failureStage: {
    type: String,
    enum: ['validation', 'composition', 'provider_submit', 'provider_poll', 'result_upload']
  },
  failureCode: { type: String },
  userVisibleError: { type: String },
  internalError: { type: String },

  // Performance metrics
  queueStartedAt: { type: Date },
  generationStartedAt: { type: Date },
  completedAt: { type: Date },

  metadata: {
    queueLatencyMs: { type: Number },
    generationLatencyMs: { type: Number },
    totalLatencyMs: { type: Number },
    modelVersion: { type: String }
  }
}, { timestamps: true });

// Ensure idempotency per user
tryOnSessionSchema.index({ userId: 1, idempotencyKey: 1 }, { unique: true });
// Fingerprint lookup for investigative purposes
tryOnSessionSchema.index({ userId: 1, fingerprintHash: 1, createdAt: -1 });

export const TryOnSession = mongoose.model('TryOnSession', tryOnSessionSchema);
