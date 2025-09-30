'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import DynamicBanner from '@/components/dynamic-banner'
import CartSheet from '@/components/cart-sheet'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  const { products, getFeaturedProducts } = useConvexProducts()
  
  // Get featured products
  const featuredProducts = getFeaturedProducts().slice(0, 4)

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'M', // Default size
      color: 'Default' // Default color
    })
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setCartOpen(true)
  }

  const isInCart = (productId: string) => {
    return items.some(item => item.id === productId)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Dynamic Hero Banner from Notion */}
        <section className="py-8">
          <div className="container max-w-7xl mx-auto px-4">
            <DynamicBanner />
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Collections</h2>
              <p className="text-gray-600">Discover our curated selection of premium Indian fashion</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {collections.map((collection, index) => {
                const categoryPath = collection.name.toLowerCase()
                return (
                  <Link key={index} href={`/${categoryPath}`}>
                    <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-[4/3] bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-2xl font-semibold mb-2">{collection.name}</h3>
                          <p className="text-gray-600 mb-2">{collection.description}</p>
                          <span className="text-sm text-primary">{collection.items} items</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-gray-600">Handpicked favorites from our latest collection</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product._id} className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(`/products/${product._id}`)}>
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
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-primary">AED {product.price}</span>
                      <span className="text-sm text-gray-500 line-through">AED {product.originalPrice}</span>
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
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Testimonials from Notion */}
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
