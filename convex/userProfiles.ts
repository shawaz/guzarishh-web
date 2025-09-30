import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get user profile by user ID
export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
  },
});

// Get user profile by email
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Get all admins
export const getAdmins = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("userProfiles")
      .withIndex("by_role", (q) => q.eq("role", "admin"))
      .collect();
  },
});

// Get all superadmins
export const getSuperAdmins = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("userProfiles")
      .withIndex("by_role", (q) => q.eq("role", "superadmin"))
      .collect();
  },
});

// Create user profile
export const create = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    role: v.optional(v.union(
      v.literal("user"),
      v.literal("admin"),
      v.literal("superadmin")
    )),
    avatar: v.optional(v.string()),
    address: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (existingUser) {
      return existingUser;
    }

    // Set superadmin role for admin@guzarishh.com
    const role = args.email === "admin@guzarishh.com" ? "superadmin" : (args.role || "user");

    return await ctx.db.insert("userProfiles", {
      userId: args.userId,
      email: args.email,
      name: args.name,
      phone: args.phone,
      role: role,
      avatar: args.avatar,
      address: args.address,
    });
  },
});

// Update user profile
export const update = mutation({
  args: {
    id: v.id("userProfiles"),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    role: v.optional(v.union(
      v.literal("user"),
      v.literal("admin"),
      v.literal("superadmin")
    )),
    avatar: v.optional(v.string()),
    address: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

// Update user profile by user ID
export const updateByUserId = mutation({
  args: {
    userId: v.string(),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    role: v.optional(v.union(
      v.literal("user"),
      v.literal("admin"),
      v.literal("superadmin")
    )),
    avatar: v.optional(v.string()),
    address: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!user) {
      throw new Error("User profile not found");
    }

    const { userId, ...updates } = args;
    return await ctx.db.patch(user._id, updates);
  },
});

// Delete user profile
export const remove = mutation({
  args: { id: v.id("userProfiles") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
