'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '@/lib/products'

interface ProductContextType {
  products: Product[]
  loading: boolean
  addProduct: (product: Omit<Product, 'id'>) => Promise<{ error?: string }>
  updateProduct: (id: number, product: Omit<Product, 'id'>) => Promise<{ error?: string }>
  deleteProduct: (id: number) => Promise<{ error?: string }>
  getProductById: (id: number) => Product | undefined
  getProductsByCategory: (category: 'Casual' | 'Festive' | 'Office') => Product[]
  searchProducts: (query: string) => Product[]
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load products from localStorage or use default products
    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem('products')
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts))
        } else {
          // No products in localStorage, start with empty array
          setProducts([])
        }
      } catch (error) {
        console.error('Error loading products:', error)
        // Fallback to empty array
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts)
    localStorage.setItem('products', JSON.stringify(newProducts))
  }

  const addProduct = async (productData: Omit<Product, 'id'>): Promise<{ error?: string }> => {
    try {
      setLoading(true)
      console.log('Adding product:', productData)
      
      // Generate new ID
      const newId = Math.max(...products.map(p => p.id), 0) + 1
      console.log('Generated ID:', newId)
      
      const newProduct: Product = {
        ...productData,
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        rating: productData.rating || 0,
        reviews: productData.reviews || 0,
      }

      console.log('New product:', newProduct)
      const updatedProducts = [...products, newProduct]
      console.log('Updated products array:', updatedProducts)
      saveProducts(updatedProducts)
      
      return { error: undefined }
    } catch (error: any) {
      console.error('Error adding product:', error)
      return { error: error.message || 'Failed to add product' }
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (id: number, productData: Omit<Product, 'id'>): Promise<{ error?: string }> => {
    try {
      setLoading(true)
      
      const updatedProducts = products.map(product => 
        product.id === id 
          ? { 
              ...product, 
              ...productData, 
              updatedAt: new Date().toISOString() 
            }
          : product
      )
      
      saveProducts(updatedProducts)
      
      return { error: undefined }
    } catch (error: any) {
      console.error('Error updating product:', error)
      return { error: error.message || 'Failed to update product' }
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: number): Promise<{ error?: string }> => {
    try {
      setLoading(true)
      
      const updatedProducts = products.filter(product => product.id !== id)
      saveProducts(updatedProducts)
      
      return { error: undefined }
    } catch (error: any) {
      console.error('Error deleting product:', error)
      return { error: error.message || 'Failed to delete product' }
    } finally {
      setLoading(false)
    }
  }

  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id)
  }

  const getProductsByCategory = (category: 'Casual' | 'Festive' | 'Office'): Product[] => {
    return products.filter(product => product.category === category)
  }

  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return products
    
    const lowercaseQuery = query.toLowerCase()
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description?.toLowerCase().includes(lowercaseQuery) ||
      product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    )
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}
