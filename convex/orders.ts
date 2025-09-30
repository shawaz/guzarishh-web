import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all orders
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("orders").collect();
  },
});

// Get orders by user ID
export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Get orders by status
export const getByStatus = query({
  args: { 
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    )
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

// Get order by ID
export const getById = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create order
export const create = mutation({
  args: {
    userId: v.string(),
    items: v.string(), // JSON string of cart items
    total: v.number(),
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    )),
    shippingAddress: v.optional(v.string()),
    paymentMethod: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", {
      userId: args.userId,
      items: args.items,
      total: args.total,
      status: args.status || "pending",
      shippingAddress: args.shippingAddress,
      paymentMethod: args.paymentMethod,
      notes: args.notes,
    });
  },
});

// Update order
export const update = mutation({
  args: {
    id: v.id("orders"),
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    )),
    shippingAddress: v.optional(v.string()),
    paymentMethod: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

// Delete order
export const remove = mutation({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
