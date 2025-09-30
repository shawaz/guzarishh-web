const { ConvexHttpClient } = require("convex/browser");

// This script adds some test products to the Convex database
// Run this with: node scripts/add-test-products.js

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

const testProducts = [
  {
    name: "Elegant Saree",
    price: 2500,
    originalPrice: 3000,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop"
    ],
    category: "Festive",
    description: "Beautiful traditional saree perfect for festivals and special occasions",
    size: "Free Size",
    colors: ["Red", "Gold"],
    inStock: true,
    stockQuantity: 10,
    tags: ["saree", "festive", "traditional"],
    featured: true,
    rating: 4.5,
    reviews: 25
  },
  {
    name: "Casual Kurti",
    price: 1200,
    originalPrice: 1500,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop"
    ],
    category: "Casual",
    description: "Comfortable and stylish kurti for everyday wear",
    size: "M",
    colors: ["Blue", "White"],
    inStock: true,
    stockQuantity: 15,
    tags: ["kurti", "casual", "comfortable"],
    featured: true,
    rating: 4.2,
    reviews: 18
  },
  {
    name: "Office Blouse",
    price: 800,
    originalPrice: 1000,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop"
    ],
    category: "Office",
    description: "Professional blouse perfect for office wear",
    size: "L",
    colors: ["Black", "Navy"],
    inStock: true,
    stockQuantity: 8,
    tags: ["blouse", "office", "professional"],
    featured: true,
    rating: 4.0,
    reviews: 12
  },
  {
    name: "Party Lehenga",
    price: 4500,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop"
    ],
    category: "Festive",
    description: "Stunning lehenga for parties and celebrations",
    size: "Free Size",
    colors: ["Pink", "Purple"],
    inStock: true,
    stockQuantity: 5,
    tags: ["lehenga", "party", "celebration"],
    featured: false,
    rating: 4.8,
    reviews: 30
  }
];

async function addTestProducts() {
  console.log('Adding test products to Convex database...');
  
  try {
    for (const product of testProducts) {
      const result = await client.mutation("products:create", product);
      console.log(`Added product: ${product.name} (ID: ${result})`);
    }
    
    console.log('✅ All test products added successfully!');
    console.log('You can now sign in and see the products on the homepage.');
    
  } catch (error) {
    console.error('❌ Error adding test products:', error);
  }
}

addTestProducts();
