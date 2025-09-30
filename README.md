# Guzarishh - Indian Fashion E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js, Convex, and Tailwind CSS, specializing in Indian fashion and traditional wear.

## 🚀 Features

### 🛍️ **E-commerce Functionality**
- **Product Management**: Full CRUD operations for products with image uploads
- **Shopping Cart**: Real-time cart management with add/remove functionality
- **Product Categories**: Casual, Festive, and Office wear categories
- **Product Detail Pages**: Comprehensive product information with image galleries
- **Search & Filter**: Product search and category filtering

### 🔐 **Authentication & Authorization**
- **User Authentication**: Email/password based authentication
- **Role-Based Access Control**: User, Admin, and Super Admin roles
- **Protected Routes**: Authentication required for product access
- **Admin Dashboard**: Complete admin panel for managing the platform

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Custom UI components with Shadcn/ui
- **Image Management**: Drag-and-drop image upload with preview
- **Interactive Elements**: Smooth animations and transitions

### 🗄️ **Backend & Database**
- **Convex Integration**: Real-time database with automatic synchronization
- **File Storage**: Convex storage for product images
- **Type Safety**: Full TypeScript support throughout the application
- **Real-time Updates**: Live data synchronization across all clients

## 🛠️ **Tech Stack**

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Backend**: Convex (Database + Real-time + File Storage)
- **Authentication**: Custom authentication system
- **Icons**: Lucide React
- **State Management**: React Context API

## 📦 **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/shawaz/guzarishh-web.git
   cd guzarishh-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Convex**
   ```bash
   npx convex dev
   ```
   - Follow the prompts to create a new Convex project
   - Copy the deployment URL to your `.env.local` file

4. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
   NEXT_PUBLIC_TELR_STORE_ID=your_telr_store_id (optional)
   NEXT_PUBLIC_TELR_AUTH_KEY=your_telr_auth_key (optional)
   ```
   
   You can copy from `env.example` and fill in your actual values.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 **Usage**

### **For Customers**
1. **Sign Up/Login**: Create an account or sign in
2. **Browse Products**: Explore products by category (Casual, Festive, Office)
3. **View Product Details**: Click on any product to see full details
4. **Add to Cart**: Add products to your shopping cart
5. **Checkout**: Complete your purchase

### **For Administrators**
1. **Admin Login**: Use `admin@guzarishh.com` / `admin123`
2. **Dashboard**: Access the admin dashboard at `/admin/dashboard`
3. **Product Management**: Add, edit, or delete products at `/admin/products`
4. **Order Management**: View and manage orders at `/admin/orders`
5. **Customer Management**: Manage customer profiles at `/admin/customers`

## 📁 **Project Structure**

```
guzarishh-client/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── admin/             # Admin panel pages
│   │   ├── products/          # Product detail pages
│   │   └── ...
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Shadcn/ui components
│   │   └── ...
│   ├── contexts/             # React contexts for state management
│   ├── lib/                  # Utility functions and configurations
│   └── types/                # TypeScript type definitions
├── convex/                   # Convex backend functions and schema
├── public/                   # Static assets
└── ...
```

## 🔧 **Available Scripts**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx convex dev` - Start Convex development server

## 🌟 **Key Features in Detail**

### **Product Management**
- **Image Upload**: Drag-and-drop image upload with Convex storage
- **Product Categories**: Organized into Casual, Festive, and Office wear
- **Inventory Management**: Stock tracking and availability status
- **Pricing**: Support for original and sale prices

### **Shopping Experience**
- **Real-time Cart**: Instant cart updates across all pages
- **Product Search**: Search products by name, description, or tags
- **Responsive Design**: Optimized for all device sizes
- **Image Galleries**: Multiple product images with thumbnail navigation

### **Admin Panel**
- **Dashboard**: Overview of sales, products, and orders
- **Product CRUD**: Complete product management interface
- **Order Management**: Track and update order status
- **Customer Management**: View and manage customer profiles
- **Supplier Management**: Manage supplier information

## 🚀 **Deployment**

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### **Other Platforms**
- The application can be deployed to any platform that supports Next.js
- Ensure to set the `NEXT_PUBLIC_CONVEX_URL` environment variable

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Convex](https://convex.dev/) for the real-time backend
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the icon library

## 📞 **Support**

For support, email support@guzarishh.com or create an issue in the GitHub repository.

---

**Built with ❤️ for the Indian fashion community**
