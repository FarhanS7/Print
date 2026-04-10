import { betterAuth } from "better-auth";
import { mongooseAdapter } from "better-auth/adapters/mongoose";
import mongoose from "mongoose";
import { User, Session, Account, Verification } from "../models/user.model";
export const auth = betterAuth({
    database: mongooseAdapter(mongoose),
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
//# sourceMappingURL=auth.js.map