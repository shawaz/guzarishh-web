#!/usr/bin/env node

/**
 * Convex Setup Script
 * 
 * This script helps set up Convex for the Guzarishh application
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Convex for Guzarishh...\n');

// Check if Convex is installed
try {
  execSync('npx convex --version', { stdio: 'pipe' });
  console.log('✅ Convex CLI is available');
} catch (error) {
  console.log('❌ Convex CLI not found. Installing...');
  try {
    execSync('npm install -g convex', { stdio: 'inherit' });
    console.log('✅ Convex CLI installed successfully');
  } catch (installError) {
    console.error('❌ Failed to install Convex CLI:', installError.message);
    process.exit(1);
  }
}

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  const envContent = `# Convex
NEXT_PUBLIC_CONVEX_URL=

# Add your Convex deployment URL here after running: npx convex dev
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created');
} else {
  console.log('ℹ️  .env.local file already exists');
}

// Check if convex.json exists
const convexConfigPath = path.join(process.cwd(), 'convex.json');
if (!fs.existsSync(convexConfigPath)) {
  console.log('📝 Creating convex.json...');
  const convexConfig = {
    "functions": "convex/",
    "generateCommonJSApi": false,
    "node": {
      "18": true
    }
  };
  fs.writeFileSync(convexConfigPath, JSON.stringify(convexConfig, null, 2));
  console.log('✅ convex.json created');
} else {
  console.log('ℹ️  convex.json already exists');
}

console.log('\n🎉 Convex setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Run: npx convex dev');
console.log('2. Copy the deployment URL to your .env.local file');
console.log('3. Run: npm run dev');
console.log('\n🔧 Your Convex schema includes:');
console.log('- products (with categories: Casual, Festive, Office)');
console.log('- orders (with status tracking)');
console.log('- invoices (with payment tracking)');
console.log('- suppliers (with contact management)');
console.log('- customers (with profile management)');
console.log('- userProfiles (with role-based access)');
console.log('\n✨ Ready to build your e-commerce app with Convex!');
