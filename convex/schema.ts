import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Products table
  products: defineTable({
    name: v.string(),
    price: v.number(),
    originalPrice: v.optional(v.number()),
    image: v.string(),
    images: v.optional(v.array(v.string())),
    rating: v.optional(v.number()),
    reviews: v.optional(v.number()),
    category: v.union(v.literal("Casual"), v.literal("Festive"), v.literal("Office")),
    description: v.optional(v.string()),
    sizes: v.optional(v.array(v.string())),
    colors: v.optional(v.array(v.string())),
    stockBySize: v.optional(v.array(v.object({
      size: v.string(),
      quantity: v.number(),
      inStock: v.boolean()
    }))),
    stockByVariant: v.optional(v.array(v.object({
      size: v.string(),
      color: v.string(),
      quantity: v.number(),
      inStock: v.boolean()
    }))), // Stock by size AND color combination
    size: v.optional(v.string()), // Legacy field for backward compatibility
    inStock: v.optional(v.boolean()),
    stockQuantity: v.optional(v.number()), // Keep for backward compatibility
    tags: v.optional(v.array(v.string())),
    featured: v.optional(v.boolean()),
    displayOrder: v.optional(v.number()), // Order for displaying on homepage
  })
    .index("by_category", ["category"])
    .index("by_featured", ["featured"])
    .index("by_inStock", ["inStock"])
    .index("by_displayOrder", ["displayOrder"]),

  // Orders table
  orders: defineTable({
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
    // PayTabs payment fields
    cartId: v.optional(v.string()), // Unique cart/order reference
    tranRef: v.optional(v.string()), // PayTabs transaction reference
    paymentStatus: v.optional(v.union(
      v.literal("authorized"),
      v.literal("held"),
      v.literal("pending"),
      v.literal("voided"),
      v.literal("declined"),
      v.literal("expired")
    )),
    paymentGateway: v.optional(v.string()), // e.g., "paytabs"
    paymentDetails: v.optional(v.string()), // JSON string of payment info
    customerEmail: v.optional(v.string()),
    customerName: v.optional(v.string()),
    customerPhone: v.optional(v.string()),
    // Shipping/Delivery fields
    shippingCity: v.optional(v.string()),
    deliveryPartner: v.optional(v.string()), // e.g., "speedyorder"
    trackingNumber: v.optional(v.string()), // Courier tracking number
    deliveryStatus: v.optional(v.string()), // Latest delivery status
    deliveryTrackingHistory: v.optional(v.string()), // JSON string of tracking history
    courierOrderId: v.optional(v.string()), // Courier's internal order ID
    estimatedDeliveryDate: v.optional(v.number()),
  })
    .index("by_userId", ["userId"])
    .index("by_status", ["status"])
    .index("by_cartId", ["cartId"])
    .index("by_tranRef", ["tranRef"])
    .index("by_paymentStatus", ["paymentStatus"])
    .index("by_trackingNumber", ["trackingNumber"]),

  // Invoices table
  invoices: defineTable({
    orderId: v.string(),
    userId: v.string(),
    invoiceNumber: v.string(),
    amount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("overdue"),
      v.literal("cancelled")
    ),
    dueDate: v.optional(v.number()),
    paidDate: v.optional(v.number()),
    notes: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_orderId", ["orderId"])
    .index("by_status", ["status"]),

  // Suppliers table
  suppliers: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    contactPerson: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("suspended")
    ),
    notes: v.optional(v.string()),
  })
    .index("by_status", ["status"]),

  // Customers table
  customers: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("blocked")
    ),
    totalOrders: v.optional(v.number()),
    totalSpent: v.optional(v.number()),
    notes: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_status", ["status"]),

  // User profiles table
  userProfiles: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    role: v.union(
      v.literal("user"),
      v.literal("admin"),
      v.literal("superadmin")
    ),
    avatar: v.optional(v.string()),
    address: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),
});
