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

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            
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
                {/* <Button variant="ghost" size="icon" onClick={signOut} title="Sign Out">
                  <LogOut className="h-5 w-5" />
                </Button> */}
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
          </div>
        </div>

      </div>
      
      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      
      {/* Cart Sheet */}
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  )
}
