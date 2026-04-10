import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.config.js';
import tryonRoutes from './modules/tryon/tryon.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/tryon', tryonRoutes);

// Basic Health Route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'tryon-service' });
});

app.listen(PORT, () => {
  console.log(`[V2-Backend] Try-On service is running on port ${PORT}`);
});
