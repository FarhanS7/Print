import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, required: true },
  image: { type: String },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  // Custom fields for Printify
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

export const User = mongoose.model('User', userSchema);

const sessionSchema = new mongoose.Schema({
  expiresAt: { type: Date, required: true },
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  ipAddress: { type: String },
  userAgent: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Session = mongoose.model('Session', sessionSchema);

const accountSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  providerId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
  idToken: { type: String },
  accessTokenExpiresAt: { type: Date },
  refreshTokenExpiresAt: { type: Date },
  scope: { type: String },
  password: { type: String },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export const Account = mongoose.model('Account', accountSchema);

const verificationSchema = new mongoose.Schema({
  identifier: { type: String, required: true },
  value: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

export const Verification = mongoose.model('Verification', verificationSchema);
