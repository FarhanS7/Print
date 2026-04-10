import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Better Auth Handler
app.all("/api/auth/*", toNodeHandler(auth));

// Basic Route
app.get('/', (req, res) => {
    res.send('Printify Custom API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
