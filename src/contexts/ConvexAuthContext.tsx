'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

interface User {
  _id: Id<"userProfiles">
  userId: string
  email: string
  name?: string
  phone?: string
  role: 'user' | 'admin' | 'superadmin'
  avatar?: string
  address?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, name?: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  isAdmin: () => boolean
  isSuperAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function ConvexAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // For now, we'll use a simple local storage approach
  // In a real app, you'd integrate with your auth provider
  useEffect(() => {
    const checkSession = () => {
      try {
        const storedUser = localStorage.getItem('convexUser')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Error checking session:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      // Simple mock authentication - in real app, use proper auth
      if (email === 'admin@guzarishh.com' && password === 'admin123') {
        const mockUser: User = {
          _id: 'mock-id' as Id<"userProfiles">,
          userId: 'admin-user-id',
          email: 'admin@guzarishh.com',
          name: 'Admin User',
          role: 'superadmin'
        }
        
        localStorage.setItem('convexUser', JSON.stringify(mockUser))
        setUser(mockUser)
        return { error: undefined }
      } else if (email === 'user@example.com' && password === 'user123') {
        const mockUser: User = {
          _id: 'mock-user-id' as Id<"userProfiles">,
          userId: 'user-id',
          email: 'user@example.com',
          name: 'Test User',
          role: 'user'
        }
        
        localStorage.setItem('convexUser', JSON.stringify(mockUser))
        setUser(mockUser)
        return { error: undefined }
      } else {
        return { error: 'Invalid credentials' }
      }
    } catch (error: any) {
      return { error: error.message || 'Sign in failed' }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      setLoading(true)
      
      // Simple mock registration
      const mockUser: User = {
        _id: `mock-${Date.now()}` as Id<"userProfiles">,
        userId: `user-${Date.now()}`,
        email: email,
        name: name || 'New User',
        role: 'user'
      }
      
      localStorage.setItem('guzarishh_user', JSON.stringify(mockUser))
      setUser(mockUser)
      return { error: undefined }
    } catch (error: any) {
      return { error: error.message || 'Sign up failed' }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      localStorage.removeItem('convexUser')
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const isAdmin = () => {
    console.log('Checking admin status:', { user, role: user?.role })
    return user?.role === 'admin' || user?.role === 'superadmin'
  }

  const isSuperAdmin = () => {
    return user?.role === 'superadmin'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin,
        isSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useConvexAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useConvexAuth must be used within a ConvexAuthProvider')
  }
  return context
}
