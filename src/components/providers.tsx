'use client'

import { ReactNode } from 'react'
import { ConvexProvider } from 'convex/react'
import { ConvexAuthProvider } from '@/contexts/ConvexAuthContext'
import { ConvexProductProvider } from '@/contexts/ConvexProductContext'
import { CartProvider } from '@/contexts/CartContext'
import convex from '@/lib/convex'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ConvexProvider client={convex}>
      <ConvexAuthProvider>
        <ConvexProductProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ConvexProductProvider>
      </ConvexAuthProvider>
    </ConvexProvider>
  )
}
