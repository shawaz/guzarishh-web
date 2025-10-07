'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useConvexProducts } from '@/contexts/ConvexProductContext'
import { useCart } from '@/contexts/CartContext'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Heart, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react'
import { Product } from '@/contexts/ConvexProductContext'
import { Id } from '@/convex/_generated/dataModel'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { products, loading } = useConvexProducts()
  const { addItem, items, removeItemByProductId } = useCart()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [mainImageIndex, setMainImageIndex] = useState(0)

  // Get related products (same category, excluding current product)
  const getRelatedProducts = () => {
    if (!product || !products) return []
    return products
      .filter(p => p._id !== product._id && p.category === product.category)
      .slice(0, 4)
  }

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => p._id === params.id)
      if (foundProduct) {
        setProduct(foundProduct)
        setSelectedSize(foundProduct.sizes?.[0] || '')
        setSelectedColor(foundProduct.colors?.[0] || '')
      }
    }
  }, [products, params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => router.push('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const isInCart = items.some(item => item.id === product._id)

  // Helper function to get color value from color name
  const getColorValue = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'Red': '#ef4444',
      'Blue': '#3b82f6',
      'Green': '#22c55e',
      'Yellow': '#eab308',
      'Purple': '#a855f7',
      'Pink': '#ec4899',
      'Orange': '#f97316',
      'Black': '#000000',
      'White': '#ffffff',
      'Gray': '#6b7280',
      'Brown': '#a3a3a3',
      'Navy': '#1e3a8a',
      'Beige': '#f5f5dc',
      'Cream': '#fefce8'
    }
    return colorMap[colorName] || '#6b7280'
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    // Check stock availability for the selected size
    if (product.stockBySize && product.stockBySize.length > 0) {
      const selectedSizeStock = product.stockBySize.find(s => s.size === selectedSize)
      
      if (!selectedSizeStock || !selectedSizeStock.inStock || selectedSizeStock.quantity === 0) {
        alert(`Size ${selectedSize} is out of stock`)
        return
      }
      
      if (quantity > selectedSizeStock.quantity) {
        alert(`Only ${selectedSizeStock.quantity} items available in size ${selectedSize}`)
        return
      }
    }

    // Add multiple items based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor
      })
    }
    
    // Reset quantity to 1 after adding
    setQuantity(1)
  }

  const handleRemoveFromCart = () => {
    removeItemByProductId(product._id)
  }

  const allImages = [product.image, ...(product.images || [])].filter(Boolean)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Thumbnail Images - Left on desktop, top on mobile */}
              {allImages.length > 1 && (
                <div className="flex lg:flex-col gap-2 order-2 lg:order-1">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImageIndex(index)}
                      className={`w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        mainImageIndex === index 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Thumbnail failed to load:', image)
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="flex-1 order-1 lg:order-2">
                <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-lg">
                  {allImages[mainImageIndex] ? (
                    <img
                      src={allImages[mainImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Main image failed to load:', allImages[mainImageIndex])
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <div className="text-4xl mb-2">👗</div>
                        <span className="text-gray-500">No image available</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Product Info */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500">SKU: {product._id.slice(-8)}</span>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < (product.rating || 0) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews || 0} reviews)</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold">AED {product.price}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        AED {product.originalPrice}
                      </span>
                      <Badge variant="destructive" className="ml-2">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    </>
                  )}
                </div>

                {product.description && (
                  <p className="text-gray-700 mb-6">{product.description}</p>
                )}
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Size</h3>
                    <button className="text-sm text-primary hover:underline">
                      Size chart
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => {
                      const sizeStock = product.stockBySize?.find(s => s.size === size)
                      const isAvailable = sizeStock ? sizeStock.inStock && sizeStock.quantity > 0 : true
                      const isSelected = selectedSize === size
                      
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          disabled={!isAvailable}
                          className={`px-3 py-2 text-sm font-medium rounded border transition-all ${
                            isSelected
                              ? 'border-primary bg-primary text-white'
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

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Color</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                        style={{ backgroundColor: getColorValue(color) }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stock Information */}
              {selectedSize && product.stockBySize && (
                <div className="text-sm text-gray-600">
                  {(() => {
                    const sizeStock = product.stockBySize.find(s => s.size === selectedSize)
                    if (sizeStock) {
                      if (sizeStock.inStock && sizeStock.quantity > 0) {
                        return `${sizeStock.quantity} available in size ${selectedSize}`
                      } else {
                        return `Out of stock in size ${selectedSize}`
                      }
                    }
                    return ''
                  })()}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {isInCart ? (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleRemoveFromCart}
                  >
                    <Minus className="h-4 w-4 mr-2" />
                    Remove from Cart
                  </Button>
                ) : (
                  <Button 
                    className="w-full"
                    onClick={handleAddToCart}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                )}
                
                <Button variant="outline" className="w-full">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Buy It Now
                </Button>
              </div>

              {/* Help Section */}
              <div className="border-t pt-4">
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">💬</span>
                  </div>
                  Need help? Chat with us online
                </button>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {getRelatedProducts().length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-8 text-center">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {getRelatedProducts().map((relatedProduct) => (
                  <Card 
                    key={relatedProduct._id} 
                    className="group hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push(`/products/${relatedProduct._id}`)}
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                      {relatedProduct.image ? (
                        <img 
                          src={relatedProduct.image} 
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', relatedProduct.image)
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="text-center">
                          <div className="text-2xl mb-2">👗</div>
                          <span className="text-xs text-gray-500">{relatedProduct.category}</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold">AED {relatedProduct.price}</span>
                        {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price && (
                          <span className="text-sm text-gray-500 line-through">
                            AED {relatedProduct.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < (relatedProduct.rating || 0) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({relatedProduct.reviews || 0})</span>
                      </div>
                      {relatedProduct.sizes && relatedProduct.sizes.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {relatedProduct.sizes.slice(0, 3).map((size, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {size}
                            </Badge>
                          ))}
                          {relatedProduct.sizes.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{relatedProduct.sizes.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}