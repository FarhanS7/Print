import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import aiRoutes from "./routes/ai.routes.js";
import productRoutes from "./routes/product.routes.js";
import designRoutes from "./routes/design.routes.js";
import orderRoutes from "./routes/order.routes.js";
import stripeWebhookHandler from "./webhooks/stripe.webhook.js";

dotenv.config();

const app = express();
const APP_PORT = process.env.APP_PORT || 5005;

// Connect to Database
connectDB();

// Stripe Webhook (MUST be before express.json() for raw body access)
app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler,
);

// Middlewares (in correct order)
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

// Cookie parser for Better Auth sessions
app.use(cookieParser());

// Body parser
app.use(express.json());

// Global Request Logger for debugging
app.use((req, res, next) => {
  console.log(`[Request] ${req.method} ${req.url}`);
  next();
});

// API Routes (Moved above auth handler to avoid conflicts)
app.use("/api/ai", aiRoutes);
app.use("/api/products", productRoutes);
app.use("/api/designs", designRoutes);
app.use("/api/orders", orderRoutes);

// Better Auth Handler
app.all("/api/auth/*path", toNodeHandler(auth));

// Basic Route
app.get("/", (req, res) => {
  res.send("Printify Custom API is running...");
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
