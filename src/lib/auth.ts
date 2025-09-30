import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Use a simple approach without external database dependencies
  database: {
    provider: "sqlite",
    url: "file:./auth.db",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: !!process.env.GOOGLE_CLIENT_ID,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      name: {
        type: "string",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || "dev-secret-key-change-in-production",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3005", // Updated to match current port
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
