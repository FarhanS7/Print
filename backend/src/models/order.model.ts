import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  designId: { type: mongoose.Schema.Types.ObjectId, ref: 'Design', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  totalAmount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'shipped', 'cancelled'], 
    default: 'pending' 
  },
  stripeSessionId: { type: String },
  shippingAddress: {
    line1: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  customerEmail: { type: String },
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
