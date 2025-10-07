'use client'

import { ShoppingBag, Search, Menu, User, LogOut, Building, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useConvexAuth } from '@/contexts/ConvexAuthContext'
import AuthModal from '@/components/auth-modal'
import CartSheet from '@/components/cart-sheet'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { itemCount } = useCart()
  const { user, signOut, isAdmin } = useConvexAuth()
  const searchRef = useRef<HTMLDivElement>(null)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Search function
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Navigate to homepage with search term
      window.location.href = `/#search:${encodeURIComponent(searchTerm.trim())}`
      setSearchOpen(false)
    }
  }

  // Click outside handler for search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 relative">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/">
            <h1 className="text-2xl font-bold text-primary">Guzarishh</h1>

            </Link>
          </div>

          {/* Desktop Navigation */}
          {/* <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#casual" className="text-sm font-medium hover:text-primary transition-colors">
              Casual Wear
            </Link>
            <Link href="/#festive" className="text-sm font-medium hover:text-primary transition-colors">
              Festive Wear
            </Link>
            <Link href="/#office" className="text-sm font-medium hover:text-primary transition-colors">
              Office Wear
            </Link>
          </nav> */}

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
          <div className="flex items-center space-x-2">
            {/* Search Icon */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSearchOpen(!searchOpen)} 
              title="Search Products"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* User Actions */}
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
              <Link href="/#casual" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Casual Wear
              </Link>
              <Link href="/#festive" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Festive Wear
              </Link>
              <Link href="/#office" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
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

        {/* Search Dropdown */}
        {searchOpen && (
          <div ref={searchRef} className="absolute top-full left-0 right-0 bg-background border-b shadow-lg z-40">
            <div className="container max-w-7xl mx-auto px-4 py-4">
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    autoFocus
                  />
                </div>
                <Button type="submit" disabled={!searchTerm.trim()}>
                  Search
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchTerm('')
                  }}
                >
                  Cancel
                </Button>
              </form>
            </div>
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
