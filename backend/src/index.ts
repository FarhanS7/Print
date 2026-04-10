import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import aiRoutes from "./routes/ai.routes.js";
import productRoutes from "./routes/product.routes.js";
import designRoutes from "./routes/design.routes.js";
import orderRoutes from "./routes/order.routes.js";
import stripeWebhookHandler from "./webhooks/stripe.webhook.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Stripe Webhook (MUST be before express.json() for raw body access)
app.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), stripeWebhookHandler);

// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Better Auth Handler
app.all("/api/auth/*", toNodeHandler(auth));

// AI Routes
app.use("/api/ai", aiRoutes);

// Product Routes
app.use("/api/products", productRoutes);

// Design Routes
app.use("/api/designs", designRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Printify Custom API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
