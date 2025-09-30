'use client'

import { ShoppingBag, Search, Menu, User, LogOut, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useConvexAuth } from '@/contexts/ConvexAuthContext'
import AuthModal from '@/components/auth-modal'
import CartSheet from '@/components/cart-sheet'
import Link from 'next/link'

export default function Header() {
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
            <Link href="/casual" className="text-sm font-medium hover:text-primary transition-colors">
              Casual Wear
            </Link>
            <Link href="/festive" className="text-sm font-medium hover:text-primary transition-colors">
              Festive Wear
            </Link>
            <Link href="/office" className="text-sm font-medium hover:text-primary transition-colors">
              Office Wear
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
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="icon" title="Dashboard">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                {isAdmin() && (
                  <Link href="/admin/dashboard">
                    <Button variant="ghost" size="icon" title="Admin Panel">
                      <Building className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="icon" onClick={signOut} title="Sign Out">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setAuthModalOpen(true)} title="Sign In">
                <User className="h-5 w-5" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col space-y-2 py-4">
              <Link href="/" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/casual" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Casual Wear
              </Link>
              <Link href="/festive" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Festive Wear
              </Link>
              <Link href="/office" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Office Wear
              </Link>
              <Link href="/contact" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Contact
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
