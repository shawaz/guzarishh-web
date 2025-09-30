'use client'

import { ShoppingBag, Search, Menu, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useConvexAuth } from '@/contexts/ConvexAuthContext'
import AuthModal from '@/components/auth-modal'
import CartSheet from '@/components/cart-sheet'
import Link from 'next/link'

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { itemCount } = useCart()
  const { user, signOut, isAdmin } = useConvexAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/">
            <h1 className="text-2xl font-bold text-primary">Guzarishh</h1>

            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/admin/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/admin/orders" className="text-sm font-medium hover:text-primary transition-colors">
              Orders
            </Link>
            <Link href="/admin/customers" className="text-sm font-medium hover:text-primary transition-colors">
              Customers
            </Link>
            <Link href="/admin/suppliers" className="text-sm font-medium hover:text-primary transition-colors">
              Suppliers
            </Link>
            <Link href="/admin/invoices" className="text-sm font-medium hover:text-primary transition-colors">
              Invoices
            </Link>
          </nav>

          {/* Search Bar */}
          {/* <div className="hidden lg:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 w-64"
              />
            </div>
          </div> */}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" title="Home">
                Exit Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col space-y-2 py-4">
              <Link href="/admin/dashboard" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/products" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Products
              </Link>
              <Link href="/admin/orders" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Orders
              </Link>
              <Link href="/admin/customers" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Customers
              </Link>
              <Link href="/admin/suppliers" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Suppliers
              </Link>
              <Link href="/admin/invoices" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Invoices
              </Link>
              <div className="px-4 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      
      {/* Cart Sheet */}
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  )
}
