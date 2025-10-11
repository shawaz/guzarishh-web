'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

export interface Product {
  _id: Id<"products">
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating?: number
  reviews?: number
  category: 'Casual' | 'Festive' | 'Office'
  description?: string
  sizes?: string[]
  colors?: string[]
  stockBySize?: Array<{
    size: string
    quantity: number
    inStock: boolean
  }>
  inStock?: boolean
  stockQuantity?: number
  tags?: string[]
  featured?: boolean
  displayOrder?: number
}

interface ProductContextType {
  products: Product[]
  loading: boolean
  addProduct: (product: Omit<Product, '_id'>) => Promise<void>
  updateProduct: (id: Id<"products">, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: Id<"products">) => Promise<void>
  searchProducts: (searchTerm: string) => Product[]
  getProductsByCategory: (category: 'Casual' | 'Festive' | 'Office') => Product[]
  getFeaturedProducts: () => Product[]
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ConvexProductProvider({ children }: { children: ReactNode }) {
  const products = useQuery(api.products.getAll) || []
  const createProduct = useMutation(api.products.create)
  const updateProductMutation = useMutation(api.products.update)
  const deleteProductMutation = useMutation(api.products.remove)

  const addProduct = async (product: Omit<Product, '_id'>) => {
    try {
      await createProduct({
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        images: product.images,
        rating: product.rating,
        reviews: product.reviews,
        category: product.category,
        description: product.description,
        sizes: product.sizes,
        colors: product.colors,
        stockBySize: product.stockBySize,
        inStock: product.inStock,
        stockQuantity: product.stockQuantity,
        tags: product.tags,
        featured: product.featured,
      })
    } catch (error) {
      console.error('Error adding product:', error)
      throw error
    }
  }

  const updateProduct = async (id: Id<"products">, product: Partial<Product>) => {
    try {
      await updateProductMutation({
        id,
        ...product
      })
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  const deleteProduct = async (id: Id<"products">) => {
    try {
      await deleteProductMutation({ id })
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }

  const searchProducts = (searchTerm: string) => {
    if (!searchTerm) return products
    
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }

  const getProductsByCategory = (category: 'Casual' | 'Festive' | 'Office') => {
    return products.filter(product => product.category === category)
  }

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured)
  }

  return (
    <ProductContext.Provider
      value={{
        products: products,
        loading: products === undefined,
        addProduct,
        updateProduct,
        deleteProduct,
        searchProducts,
        getProductsByCategory,
        getFeaturedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useConvexProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useConvexProducts must be used within a ConvexProductProvider')
  }
  return context
}
