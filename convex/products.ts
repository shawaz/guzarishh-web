import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all products (sorted by display order)
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    // Sort by displayOrder (ascending), with products without order at the end
    return products.sort((a, b) => {
      const orderA = a.displayOrder ?? 999999;
      const orderB = b.displayOrder ?? 999999;
      return orderA - orderB;
    });
  },
});

// Get products by category
export const getByCategory = query({
  args: { category: v.union(v.literal("Casual"), v.literal("Festive"), v.literal("Office")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

// Get featured products
export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
  },
});

// Get product by ID
export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Search products
export const search = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const allProducts = await ctx.db.query("products").collect();
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(args.searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(args.searchTerm.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(args.searchTerm.toLowerCase()))
    );
  },
});

// Create product
export const create = mutation({
  args: {
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
    inStock: v.optional(v.boolean()),
    stockQuantity: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    featured: v.optional(v.boolean()),
    displayOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", {
      name: args.name,
      price: args.price,
      originalPrice: args.originalPrice,
      image: args.image,
      images: args.images,
      rating: args.rating || 0,
      reviews: args.reviews || 0,
      category: args.category,
      description: args.description,
      sizes: args.sizes,
      colors: args.colors,
      stockBySize: args.stockBySize,
      inStock: args.inStock ?? true,
      stockQuantity: args.stockQuantity || 0,
      tags: args.tags,
      featured: args.featured || false,
      displayOrder: args.displayOrder,
    });
  },
});

// Update product with stock variants support
export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    price: v.optional(v.number()),
    originalPrice: v.optional(v.number()),
    image: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    rating: v.optional(v.number()),
    reviews: v.optional(v.number()),
    category: v.optional(v.union(v.literal("Casual"), v.literal("Festive"), v.literal("Office"))),
    description: v.optional(v.string()),
    sizes: v.optional(v.array(v.string())),
    colors: v.optional(v.array(v.string())),
    stockBySize: v.optional(v.array(v.object({
      size: v.string(),
      quantity: v.number(),
      inStock: v.boolean()
    }))),
    inStock: v.optional(v.boolean()),
    stockQuantity: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    featured: v.optional(v.boolean()),
    displayOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

// Update product display order
export const updateDisplayOrder = mutation({
  args: {
    id: v.id("products"),
    displayOrder: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { displayOrder: args.displayOrder });
  },
});

// Delete product
export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Migration function to convert single size to sizes array
export const migrateSizes = mutation({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    let migratedCount = 0;
    
    for (const product of products) {
      // Check if product has old 'size' field and no 'sizes' field
      if ((product as any).size && !product.sizes) {
        const oldSize = (product as any).size;
        const sizesArray = oldSize ? [oldSize] : [];
        
        // Update the product to use sizes array
        await ctx.db.patch(product._id, {
          sizes: sizesArray,
        });
        
        console.log(`Migrated product ${product.name}: ${oldSize} -> [${sizesArray.join(', ')}]`);
        migratedCount++;
      }
    }
    
    return { migrated: migratedCount };
  },
});
