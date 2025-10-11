import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new order
export const createOrder = mutation({
  args: {
    userId: v.string(),
    items: v.string(), // JSON string of cart items
    total: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    shippingAddress: v.optional(v.string()),
    paymentMethod: v.optional(v.string()),
    notes: v.optional(v.string()),
    // PayTabs fields
    cartId: v.optional(v.string()),
    tranRef: v.optional(v.string()),
    paymentStatus: v.optional(
      v.union(
        v.literal("authorized"),
        v.literal("held"),
        v.literal("pending"),
        v.literal("voided"),
        v.literal("declined"),
        v.literal("expired")
      )
    ),
    paymentGateway: v.optional(v.string()),
    paymentDetails: v.optional(v.string()),
    customerEmail: v.optional(v.string()),
    customerName: v.optional(v.string()),
    customerPhone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", args);
    return orderId;
  },
});

// Update order payment status
export const updateOrderPaymentStatus = mutation({
  args: {
    cartId: v.string(),
    tranRef: v.string(),
    paymentStatus: v.union(
      v.literal("authorized"),
      v.literal("held"),
      v.literal("pending"),
      v.literal("voided"),
      v.literal("declined"),
      v.literal("expired")
    ),
    paymentDetails: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Find order by cartId
    const order = await ctx.db
      .query("orders")
      .withIndex("by_cartId", (q) => q.eq("cartId", args.cartId))
      .first();

    if (!order) {
      throw new Error(`Order not found with cartId: ${args.cartId}`);
    }

    // Update order with payment information
    await ctx.db.patch(order._id, {
      tranRef: args.tranRef,
      paymentStatus: args.paymentStatus,
      paymentDetails: args.paymentDetails,
      status: args.paymentStatus === "authorized" ? "processing" : "pending",
    });

    return order._id;
  },
});

// Get order by cart ID
export const getOrderByCartId = query({
  args: { cartId: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_cartId", (q) => q.eq("cartId", args.cartId))
      .first();
    return order;
  },
});

// Get order by transaction reference
export const getOrderByTranRef = query({
  args: { tranRef: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_tranRef", (q) => q.eq("tranRef", args.tranRef))
      .first();
    return order;
  },
});

// Get orders by user ID
export const getOrdersByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
    return orders;
  },
});

// Get all orders (admin)
export const getAllOrders = query({
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").order("desc").collect();
    return orders;
  },
});

// Get orders by payment status
export const getOrdersByPaymentStatus = query({
  args: {
    paymentStatus: v.union(
      v.literal("authorized"),
      v.literal("held"),
      v.literal("pending"),
      v.literal("voided"),
      v.literal("declined"),
      v.literal("expired")
    ),
  },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_paymentStatus", (q) =>
        q.eq("paymentStatus", args.paymentStatus)
      )
      .order("desc")
      .collect();
    return orders;
  },
});

// Update order status
export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      status: args.status,
    });
    return args.orderId;
  },
});

// Update order shipping information
export const updateShippingInfo = mutation({
  args: {
    orderId: v.id("orders"),
    trackingNumber: v.optional(v.string()),
    deliveryPartner: v.optional(v.string()),
    deliveryStatus: v.optional(v.string()),
    courierOrderId: v.optional(v.string()),
    deliveryTrackingHistory: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { orderId, ...updates } = args;
    await ctx.db.patch(orderId, updates);
    return orderId;
  },
});

// Delete order (admin only)
export const deleteOrder = mutation({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.orderId);
    return args.orderId;
  },
});
