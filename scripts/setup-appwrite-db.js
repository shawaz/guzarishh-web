#!/usr/bin/env node

/**
 * Appwrite Database Setup Script
 * 
 * This script helps you set up the Appwrite database collections
 * Run this after creating the database in your Appwrite console
 */

const { Client, Databases, Storage } = require('appwrite');

// Configuration
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://31.97.229.201/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '68d80a65000f7e5306e2');

const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = 'guzarishh-db';
const PRODUCTS_COLLECTION_ID = 'products';
const USER_PROFILES_COLLECTION_ID = 'user_profiles';
const ORDERS_COLLECTION_ID = 'orders';
const PRODUCT_IMAGES_BUCKET_ID = 'product-images';

async function setupDatabase() {
  try {
    console.log('🚀 Setting up Appwrite database...\n');

    // Create Products Collection
    console.log('📦 Creating Products collection...');
    try {
      await databases.createCollection(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        'Products',
        [
          { permission: 'create', target: 'users' },
          { permission: 'read', target: 'any' },
          { permission: 'update', target: 'users' },
          { permission: 'delete', target: 'users' }
        ]
      );
      console.log('✅ Products collection created');
    } catch (error) {
      if (error.code === 409) {
        console.log('ℹ️  Products collection already exists');
      } else {
        throw error;
      }
    }

    // Create User Profiles Collection
    console.log('👤 Creating User Profiles collection...');
    try {
      await databases.createCollection(
        DATABASE_ID,
        USER_PROFILES_COLLECTION_ID,
        'User Profiles',
        [
          { permission: 'create', target: 'users' },
          { permission: 'read', target: 'users' },
          { permission: 'update', target: 'users' },
          { permission: 'delete', target: 'users' }
        ]
      );
      console.log('✅ User Profiles collection created');
    } catch (error) {
      if (error.code === 409) {
        console.log('ℹ️  User Profiles collection already exists');
      } else {
        throw error;
      }
    }

    // Create Orders Collection
    console.log('📋 Creating Orders collection...');
    try {
      await databases.createCollection(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        'Orders',
        [
          { permission: 'create', target: 'users' },
          { permission: 'read', target: 'users' },
          { permission: 'update', target: 'users' },
          { permission: 'delete', target: 'users' }
        ]
      );
      console.log('✅ Orders collection created');
    } catch (error) {
      if (error.code === 409) {
        console.log('ℹ️  Orders collection already exists');
      } else {
        throw error;
      }
    }

    // Create Storage Bucket
    console.log('🖼️  Creating Product Images bucket...');
    try {
      await storage.createBucket(
        PRODUCT_IMAGES_BUCKET_ID,
        'Product Images',
        [
          { permission: 'create', target: 'users' },
          { permission: 'read', target: 'any' },
          { permission: 'update', target: 'users' },
          { permission: 'delete', target: 'users' }
        ]
      );
      console.log('✅ Product Images bucket created');
    } catch (error) {
      if (error.code === 409) {
        console.log('ℹ️  Product Images bucket already exists');
      } else {
        throw error;
      }
    }

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Add attributes to collections (see APPWRITE_DATABASE_SETUP.md)');
    console.log('2. Create indexes for better performance');
    console.log('3. Test the application');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupDatabase();
