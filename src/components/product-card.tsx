'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Heart, Plus, Minus } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/contexts/ConvexProductContext'

interface ProductCardProps {
  product: Product
  onProductClick: (product: Product) => void
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { addItem, items, removeItemByProductId } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'M', // Default size
      color: 'Default' // Default color
    })
  }

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    removeItemByProductId(product._id)
  }

  const isInCart = items.some(item => item.id === product._id)

  return (
    <Card 
      className="group hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={() => onProductClick(product)}
    >
      <div className="aspect-[3/4] bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center relative">
        <div className="text-center">
          <div className="text-2xl mb-2">👗</div>
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>
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
      </CardFooter>
    </Card>
  )
}
