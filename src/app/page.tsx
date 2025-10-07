'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import DynamicBanner from '@/components/dynamic-banner'
import CartSheet from '@/components/cart-sheet'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingBag, Star, Heart, Plus, Minus } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useConvexProducts } from '@/contexts/ConvexProductContext'
import { Product } from '@/contexts/ConvexProductContext'
import { useConvexAuth } from '@/contexts/ConvexAuthContext'
import Link from 'next/link'

// This will be handled inside the component

const collections = [
  {
    name: "Casual",
    description: "Comfortable and stylish everyday wear",
    image: "/api/placeholder/400/300",
    items: 45
  },
  {
    name: "Festive",
    description: "Beautiful outfits for festivals and celebrations",
    image: "/api/placeholder/400/300",
    items: 32
  },
  {
    name: "Office",
    description: "Professional and elegant work attire",
    image: "/api/placeholder/400/300",
    items: 28
  }
]

export default function HomePage() {
  const router = useRouter()
  const { user } = useConvexAuth()
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { addItem, items, removeItemByProductId } = useCart()
  const { products, getFeaturedProducts, loading } = useConvexProducts()
  
  // State for managing size and quantity selection for each product
  const [productSelections, setProductSelections] = useState<Record<string, { size: string; quantity: number }>>({})
  
  // Get featured products
  const featuredProducts = getFeaturedProducts().slice(0, 4)

  // Helper functions for managing product selections
  const getProductSelection = (productId: string) => {
    const product = products.find(p => p._id === productId)
    const savedSelection = productSelections[productId]
    
    // If no saved selection, return default with smart size selection
    if (!savedSelection) {
      let defaultSize = ''
      
      if (product?.sizes && product.sizes.length > 0) {
        // If stockBySize is available, prioritize in-stock sizes
        if (product.stockBySize && product.stockBySize.length > 0) {
          const inStockSize = product.stockBySize.find(s => s.inStock && s.quantity > 0)
          defaultSize = inStockSize ? inStockSize.size : product.sizes[0]
        } else {
          // Fallback to first available size
          defaultSize = product.sizes[0]
        }
      }
      
      return { 
        size: defaultSize, 
        quantity: 1 
      }
    }
    
    return savedSelection
  }

  const updateProductSelection = (productId: string, updates: Partial<{ size: string; quantity: number }>) => {
    setProductSelections(prev => ({
      ...prev,
      [productId]: {
        ...getProductSelection(productId),
        ...updates
      }
    }))
  }

  const handleAddToCart = (product: Product) => {
    const selection = getProductSelection(product._id)
    
    // Validate selection - with default size, this should rarely trigger
    if (!selection.size && product.sizes && product.sizes.length > 0) {
      alert('Please select a size')
      return
    }

    // Check stock availability if stockBySize is available
    if (product.stockBySize && product.stockBySize.length > 0) {
      const selectedSizeStock = product.stockBySize.find(s => s.size === selection.size)
      if (selectedSizeStock) {
        if (!selectedSizeStock.inStock || selectedSizeStock.quantity === 0) {
          alert(`Size ${selection.size} is out of stock`)
          return
        }
        if (selection.quantity > selectedSizeStock.quantity) {
          alert(`Only ${selectedSizeStock.quantity} items available in size ${selection.size}`)
          return
        }
      }
    }

    // Add items to cart
    for (let i = 0; i < selection.quantity; i++) {
      addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selection.size || 'One Size',
        color: 'Default'
      })
    }
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setCartOpen(true)
  }

  // Helper function to render product cards
  const renderProductCard = (product: Product) => (
    <Card key={product._id} className="group hover:shadow-lg dark:hover:shadow-lg dark:bg-neutral-800 dark:text-white transition-shadow cursor-pointer" onClick={() => router.push(`/products/${product._id}`)}>
      <div className="aspect-[3/4] bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Image failed to load:', product.image)
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div className="text-center">
            <div className="text-2xl mb-2">👗</div>
            <span className="text-xs text-gray-500">{product.category}</span>
          </div>
        )}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            // Handle wishlist functionality
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-primary">AED {product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">AED {product.originalPrice}</span>
          )}
        </div>
        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-3">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Size
            </label>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size) => {
                const selection = getProductSelection(product._id)
                const sizeStock = product.stockBySize?.find(s => s.size === size)
                const isAvailable = sizeStock ? sizeStock.inStock && sizeStock.quantity > 0 : true
                const isSelected = selection.size === size
                
                return (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation()
                      updateProductSelection(product._id, { size })
                    }}
                    disabled={!isAvailable}
                    className={`px-2 py-1 text-xs rounded border transition-all ${
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : isAvailable
                          ? 'border-gray-300 hover:border-primary hover:bg-primary/5'
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Quantity Selection */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            Quantity
          </label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                const currentQty = getProductSelection(product._id).quantity
                if (currentQty > 1) {
                  updateProductSelection(product._id, { quantity: currentQty - 1 })
                }
              }}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium w-8 text-center">
              {getProductSelection(product._id).quantity}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                const currentQty = getProductSelection(product._id).quantity
                updateProductSelection(product._id, { quantity: currentQty + 1 })
              }}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isInCart(product._id) ? (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation()
              removeItemByProductId(product._id)
            }}
          >
            <Minus className="h-4 w-4 mr-2" />
            Remove from Cart
          </Button>
        ) : (
          <div className="w-full space-y-2">
            <Button 
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                handleAddToCart(product)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            {/* Selection Summary */}
            {(() => {
              const selection = getProductSelection(product._id)
              const hasSizeSelection = selection.size && product.sizes && product.sizes.length > 0
              const hasQuantitySelection = selection.quantity > 1
              
              if (hasSizeSelection || hasQuantitySelection) {
                return (
                  <div className="text-xs text-center text-muted-foreground">
                    {hasSizeSelection && (
                      <span>Size: {selection.size}</span>
                    )}
                    {hasSizeSelection && hasQuantitySelection && ' • '}
                    {hasQuantitySelection && (
                      <span>Qty: {selection.quantity}</span>
                    )}
                  </div>
                )
              }
              return null
            })()}
          </div>
        )}
      </CardFooter>
    </Card>
  )

  const isInCart = (productId: string) => {
    return items.some(item => item.id === productId)
  }

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-orange-900/10 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Dynamic Hero Banner */}
        <section className="py-8">
          <div className="container max-w-7xl mx-auto px-4">
            <DynamicBanner />
          </div>
        </section>

        {/* All Products Section */}
        {products.length > 0 && (
          <section className="py-16">
            <div className="container max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(renderProductCard)}
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Testimonials */}
        {/* <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <DynamicTestimonials />
          </div>
        </section> */}

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Guzarishh?</h2>
              <p className="text-gray-600">Your trusted partner in Indian fashion</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600">Free delivery across UAE on orders above AED 200</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="text-gray-600">30-day return policy for your peace of mind</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">Handpicked fabrics and authentic craftsmanship</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
