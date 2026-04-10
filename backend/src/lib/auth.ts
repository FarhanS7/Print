import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import { User, Session, Account, Verification } from "../models/user.model.js";

export const auth = betterAuth({
    database: mongodbAdapter(mongoose.connection.db!, {
        client: mongoose.connection.getClient() as any
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }
    },
    // Map internal models to Better Auth
    modelMapping: {
        user: "User",
        session: "Session",
        account: "Account",
        verification: "Verification"
    }
});
