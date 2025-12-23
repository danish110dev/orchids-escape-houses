import { betterAuth } from "better-auth";

export const authEdge = betterAuth({
    // We don't include the database adapter here to keep it edge-compatible
    // Better Auth will still be able to verify sessions via the session token in cookies
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true
    }
});
