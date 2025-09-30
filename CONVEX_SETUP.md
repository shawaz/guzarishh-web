# Convex Setup Guide

This guide will help you set up Convex for the Guzarishh e-commerce application.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Convex account (free at [convex.dev](https://convex.dev))

## Quick Setup

1. **Run the setup script:**
   ```bash
   npm run setup:convex
   ```

2. **Start Convex development server:**
   ```bash
   npx convex dev
   ```

3. **Copy the deployment URL:**
   - After running `npx convex dev`, you'll see a deployment URL
   - Copy this URL and add it to your `.env.local` file:
     ```
     NEXT_PUBLIC_CONVEX_URL=https://your-deployment-url.convex.cloud
     ```

4. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```

## Database Schema

Your Convex database includes the following tables:

### Products
- **Fields**: name, price, originalPrice, image, images, rating, reviews, category, description, size, colors, inStock, stockQuantity, tags, featured
- **Categories**: Casual, Festive, Office
- **Indexes**: by_category, by_featured, by_inStock

### Orders
- **Fields**: userId, items, total, status, shippingAddress, paymentMethod, notes
- **Status**: pending, processing, shipped, delivered, cancelled
- **Indexes**: by_userId, by_status

### Invoices
- **Fields**: orderId, userId, invoiceNumber, amount, status, dueDate, paidDate, notes
- **Status**: pending, paid, overdue, cancelled
- **Indexes**: by_userId, by_orderId, by_status

### Suppliers
- **Fields**: name, email, phone, address, contactPerson, status, notes
- **Status**: active, inactive, suspended
- **Indexes**: by_status

### Customers
- **Fields**: userId, email, name, phone, address, status, totalOrders, totalSpent, notes
- **Status**: active, inactive, blocked
- **Indexes**: by_userId, by_status

### User Profiles
- **Fields**: userId, email, name, phone, role, avatar, address
- **Roles**: user, admin, superadmin
- **Indexes**: by_userId, by_email, by_role

## Authentication

The app includes a simple authentication system with mock users:

- **Admin**: `admin@guzarishh.com` / `admin123` (superadmin role)
- **User**: `user@example.com` / `user123` (user role)

## Features

- ✅ Product management with categories
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ Admin dashboard
- ✅ Role-based access control
- ✅ Real-time data synchronization
- ✅ Type-safe database operations

## Development

### Adding Products
1. Sign in as admin (`admin@guzarishh.com` / `admin123`)
2. Go to `/admin/products`
3. Click "Add Product"
4. Fill in the product details
5. Save the product

### Managing Orders
1. Go to `/admin/orders`
2. View all orders
3. Update order status
4. Track order progress

### Customizing Categories
Edit the schema in `convex/schema.ts` to add or modify product categories.

## Troubleshooting

### Common Issues

1. **Convex deployment URL not set**
   - Make sure you've copied the URL from `npx convex dev` to `.env.local`

2. **Authentication not working**
   - Check that you're using the correct mock credentials
   - Clear browser localStorage if needed

3. **Products not loading**
   - Ensure Convex is running (`npx convex dev`)
   - Check the browser console for errors

4. **Admin access denied**
   - Make sure you're signed in as `admin@guzarishh.com`
   - Check the user role in the database

### Getting Help

- [Convex Documentation](https://docs.convex.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- Check the browser console for error messages

## Production Deployment

1. **Deploy Convex:**
   ```bash
   npx convex deploy
   ```

2. **Deploy Next.js:**
   - Use Vercel, Netlify, or your preferred platform
   - Set the `NEXT_PUBLIC_CONVEX_URL` environment variable

3. **Set up authentication:**
   - Replace the mock authentication with a real auth provider
   - Update the `ConvexAuthContext` to use your auth system

## Next Steps

- Add real authentication (Auth0, Clerk, etc.)
- Implement payment processing
- Add email notifications
- Set up file uploads for product images
- Add more admin features
- Implement search and filtering
- Add user reviews and ratings

Happy coding! 🚀
