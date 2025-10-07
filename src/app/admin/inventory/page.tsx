'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Id } from 'convex/_generated/dataModel'
import { useConvexAuth } from '@/contexts/ConvexAuthContext'
import { useConvexProducts } from '@/contexts/ConvexProductContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Package, 
  Search, 
  Filter, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  Edit,
  Plus,
  Minus
} from 'lucide-react'
import { Product } from '@/contexts/ConvexProductContext'

export default function AdminInventory() {
  const { user, loading, isAdmin } = useConvexAuth()
  const { products, updateProduct } = useConvexProducts()
  const router = useRouter()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [stockFilter, setStockFilter] = useState<string>('all')
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !isAdmin()) {
      router.push('/')
    }
  }, [user, loading, isAdmin, router])

  useEffect(() => {
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }
    
    if (stockFilter === 'low') {
      filtered = filtered.filter(product => (product.stockQuantity || 0) < 10)
    } else if (stockFilter === 'out') {
      filtered = filtered.filter(product => !product.inStock || (product.stockQuantity || 0) === 0)
    } else if (stockFilter === 'in') {
      filtered = filtered.filter(product => product.inStock && (product.stockQuantity || 0) > 0)
    }
    
    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, stockFilter, products])

  const handleStockUpdate = async (productId: Id<"products">, newQuantity: number) => {
    setIsUpdating(productId)
    try {
      await updateProduct(productId, {
        stockQuantity: newQuantity,
        inStock: newQuantity > 0
      })
    } catch (error) {
      alert('Failed to update stock: ' + error)
    } finally {
      setIsUpdating(null)
    }
  }

  const handleSizeStockUpdate = async (productId: Id<"products">, size: string, newQuantity: number) => {
    setIsUpdating(productId)
    try {
      const product = products.find(p => p._id === productId)
      if (!product) return

      const updatedSizeStocks = product.stockBySize?.map(sizeStock => 
        sizeStock.size === size
          ? { ...sizeStock, quantity: newQuantity, inStock: newQuantity > 0 }
          : sizeStock
      ) || []

      await updateProduct(productId, {
        stockBySize: updatedSizeStocks
      })
    } catch (error) {
      alert('Failed to update size stock: ' + error)
    } finally {
      setIsUpdating(null)
    }
  }

  const getStockStatus = (product: Product) => {
    const quantity = product.stockQuantity || 0
    if (quantity === 0 || !product.inStock) {
      return { status: 'out', label: 'Out of Stock', variant: 'destructive' as const }
    } else if (quantity < 10) {
      return { status: 'low', label: 'Low Stock', variant: 'secondary' as const }
    } else {
      return { status: 'in', label: 'In Stock', variant: 'default' as const }
    }
  }

  const getTotalValue = () => {
    return products.reduce((total, product) => {
      const quantity = product.stockQuantity || 0
      return total + (product.price * quantity)
    }, 0)
  }

  const getLowStockCount = () => {
    return products.filter(product => (product.stockQuantity || 0) < 10 && (product.stockQuantity || 0) > 0).length
  }

  const getOutOfStockCount = () => {
    return products.filter(product => !product.inStock || (product.stockQuantity || 0) === 0).length
  }

  const getTotalProducts = () => {
    return products.length
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin()) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-2">Manage stock levels and monitor inventory across all products</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="Casual">Casual</option>
                <option value="Festive">Festive</option>
                <option value="Office">Office</option>
              </select>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Stock Levels</option>
                <option value="in">In Stock</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{getTotalProducts()}</p>
                </div>
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold text-orange-600">{getLowStockCount()}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">{getOutOfStockCount()}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-green-600">AED {getTotalValue().toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
            <CardDescription>
              Manage stock levels for all products. Click the stock quantity to edit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product)
                const currentQuantity = product.stockQuantity || 0
                const hasSizeStocks = product.stockBySize && product.stockBySize.length > 0
                
                return (
                  <div key={product._id} className="border rounded-lg p-4 hover:bg-gray-50">
                    {/* Product Header */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Package className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{product.category}</Badge>
                          <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                          {product.sizes && product.sizes.length > 0 && (
                            <span className="text-sm text-gray-500">
                              {product.sizes.length} sizes
                            </span>
                          )}
                          {product.colors && product.colors.length > 0 && (
                            <span className="text-sm text-gray-500">
                              {product.colors.length} colors
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">AED {product.price}</p>
                      </div>
                    </div>

                    {/* Stock by Size */}
                    {hasSizeStocks ? (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-700">Stock by Size:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {product.stockBySize?.map((sizeStock, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">{sizeStock.size}</Badge>
                                <Badge variant={sizeStock.inStock ? "default" : "secondary"} className="text-xs">
                                  {sizeStock.quantity}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleSizeStockUpdate(product._id, sizeStock.size, Math.max(0, sizeStock.quantity - 1))}
                                  disabled={isUpdating === product._id}
                                  className="h-6 w-6"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleSizeStockUpdate(product._id, sizeStock.size, sizeStock.quantity + 1)}
                                  disabled={isUpdating === product._id}
                                  className="h-6 w-6"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Legacy Stock Management */
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">Legacy Stock Management</p>
                          <p className="text-xs text-gray-500">This product uses the old stock system</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleStockUpdate(product._id, Math.max(0, currentQuantity - 1))}
                            disabled={isUpdating === product._id}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <div className="min-w-[60px] text-center">
                            {isUpdating === product._id ? (
                              <RefreshCw className="h-4 w-4 animate-spin mx-auto" />
                            ) : (
                              <span className="font-semibold text-lg">{currentQuantity}</span>
                            )}
                          </div>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleStockUpdate(product._id, currentQuantity + 1)}
                            disabled={isUpdating === product._id}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedCategory !== 'all' || stockFilter !== 'all'
                    ? 'Try adjusting your search terms or filters' 
                    : 'No products available'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
