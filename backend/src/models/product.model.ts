import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  basePrice: { type: Number, required: true },
  image: { type: String, required: true }, // Base mockup image
  category: { type: String },
  sizes: [{ type: String }],
  colors: [{
    name: { type: String },
    hex: { type: String },
    image: { type: String } // Color specific mockup
  }],
  printableArea: {
    top: { type: Number },
    left: { type: Number },
    width: { type: Number },
    height: { type: Number }
  }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);

const designSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  artworkUrl: { type: String, required: true },
  artworkPlacement: {
    x: { type: Number },
    y: { type: Number },
    scale: { type: Number },
    rotation: { type: Number }
  },
  title: { type: String },
  price: { type: Number },
  tryOnEnabled: { type: Boolean, default: false },
  composedGarmentUrl: { type: String }
}, { timestamps: true });

export const Design = mongoose.model('Design', designSchema);
