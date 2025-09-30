'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import CartSheet from '@/components/cart-sheet'
import ProductCard from '@/components/product-card'
import { useConvexProducts } from '@/contexts/ConvexProductContext'
import { Product } from '@/contexts/ConvexProductContext'

export default function FestivePage() {
  const router = useRouter()
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  const { getProductsByCategory } = useConvexProducts()
  const festiveProducts = getProductsByCategory('Festive')

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product._id}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Festive Wear</h1>
            <p className="text-lg text-gray-600">
              Beautiful outfits for festivals and special celebrations
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {festiveProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
          </div>

          {/* Empty State */}
          {festiveProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">Check back later for new arrivals!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      
      {/* Cart Sheet */}
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  )
}
