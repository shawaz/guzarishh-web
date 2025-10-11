'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Upload } from 'lucide-react'
import { Product } from '@/contexts/ConvexProductContext'
import { useConvexProducts } from '@/contexts/ConvexProductContext'
import ImageUpload from '@/components/image-upload'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Omit<Product, '_id'>) => void
  onCancel: () => void
  loading?: boolean
}

export default function ProductForm({ product, onSubmit, onCancel, loading = false }: ProductFormProps) {
  const { addProduct, updateProduct } = useConvexProducts()
  // For now, we'll use temporary URLs for preview and storage IDs for persistence
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    image: product?.image || '',
    images: product?.images || [],
    category: product?.category || 'Casual' as 'Casual' | 'Festive' | 'Office',
    description: product?.description || '',
    sizes: product?.sizes || [],
    colors: product?.colors || [],
    stockBySize: product?.stockBySize || [],
    inStock: product?.inStock ?? true,
    stockQuantity: product?.stockQuantity || 0,
    tags: product?.tags || [],
    featured: product?.featured ?? false,
    displayOrder: product?.displayOrder,
  })

  // State for managing uploaded images with storage IDs
  const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; storageId: Id<"_storage"> }>>(
    // Initialize with existing product images when editing
    product?.images ? product.images.map((url, index) => ({
      url,
      storageId: `existing_${index}` as Id<"_storage"> // Temporary ID for existing images
    })) : []
  )

  const [newColor, setNewColor] = useState('')
  const [newTag, setNewTag] = useState('')
  const [newSize, setNewSize] = useState('')

  // Image upload handlers
  const handleImageUpload = (url: string, storageId: Id<"_storage">) => {
    const newImage = { url, storageId }
    setUploadedImages(prev => [...prev, newImage])
    
    // Set the first uploaded image as the main image
    if (uploadedImages.length === 0) {
      setFormData(prev => ({ ...prev, image: url }))
    }
  }

  const handleImageRemove = (storageId: Id<"_storage">) => {
    setUploadedImages(prev => {
      const imageToRemove = prev.find(img => img.storageId === storageId)
      const updated = prev.filter(img => img.storageId !== storageId)
      
      // If we removed the main image, set the first remaining image as main
      if (imageToRemove && formData.image === imageToRemove.url) {
        setFormData(prevForm => ({
          ...prevForm,
          image: updated.length > 0 ? updated[0].url : ''
        }))
      }
      
      return updated
    })
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Get proper Convex URLs for uploaded images
      let imageUrls: string[] = []
      let mainImage = formData.image

      if (uploadedImages.length > 0) {
        // Use temporary URLs for now - they will be replaced with proper Convex URLs
        // The images are already uploaded to Convex storage with storage IDs
        imageUrls = uploadedImages.map(img => img.url)
        mainImage = uploadedImages[0].url
      } else {
        imageUrls = formData.images || []
      }

      // Prepare product data for Convex (remove sizes field as it's not in schema)
      const productData = {
        ...formData,
        image: mainImage,
        images: imageUrls
      }
      
      // Ensure sizes array is included
      if (!productData.sizes || productData.sizes.length === 0) {
        alert('Please add at least one size')
        return
      }
      
      // Debug: Log the data being sent to Convex
      console.log('Sending product data to Convex:', productData)
      
      if (product) {
        // Update existing product
        await updateProduct(product._id, productData)
      } else {
        // Add new product
        await addProduct(productData)
      }
      
      // Show success message
      alert(product ? 'Product updated successfully!' : 'Product added successfully!')
      
      // Close the form after successful submission
      onCancel()
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }


  const addSize = () => {
    if (newSize.trim() && !formData.sizes.includes(newSize.trim())) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize.trim()]
      }))
      setNewSize('')
    }
  }

  const removeSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size)
    }))
  }

  const addColor = () => {
    if (newColor.trim() && !formData.colors.includes(newColor.trim())) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, newColor.trim()]
      }))
      setNewColor('')
    }
  }

  const removeColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  // Stock by size management functions
  const generateStockBySize = () => {
    if (formData.sizes.length === 0) {
      alert('Please add at least one size before generating stock entries')
      return
    }

    const sizeStocks: Array<{ size: string; quantity: number; inStock: boolean }> = []
    
    formData.sizes.forEach(size => {
      // Check if size stock already exists
      const existingSizeStock = formData.stockBySize.find(s => s.size === size)
      if (!existingSizeStock) {
        sizeStocks.push({
          size,
          quantity: 0,
          inStock: false
        })
      }
    })

    setFormData(prev => ({
      ...prev,
      stockBySize: [...prev.stockBySize, ...sizeStocks]
    }))
  }

  const updateStockBySize = (size: string, quantity: number) => {
    setFormData(prev => ({
      ...prev,
      stockBySize: prev.stockBySize.map(sizeStock => 
        sizeStock.size === size
          ? { ...sizeStock, quantity, inStock: quantity > 0 }
          : sizeStock
      )
    }))
  }

  const removeStockBySize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      stockBySize: prev.stockBySize.filter(sizeStock => sizeStock.size !== size)
    }))
  }


  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
        <CardDescription>
          {product ? 'Update product information' : 'Fill in the details to add a new product'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
            <label className="block text-sm font-medium mb-2">Product Images *</label>
            <ImageUpload
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              images={uploadedImages}
              maxImages={6}
              aspectRatio="aspect-[3/4]"
            />
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter product name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'Casual' | 'Festive' | 'Office' }))}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="Casual">Casual</option>
                <option value="Festive">Festive</option>
                <option value="Office">Office</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price (AED) *</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                placeholder="Enter price"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Original Price (AED)</label>
              <Input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                placeholder="Enter original price"
                min="0"
              />
            </div>
          </div>

          {/* Stock Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="inStock"
                checked={formData.inStock}
                onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                className="rounded"
              />
              <label htmlFor="inStock" className="text-sm font-medium">In Stock</label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stock Quantity</label>
              <Input
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => setFormData(prev => ({ ...prev, stockQuantity: Number(e.target.value) }))}
                placeholder="Enter stock quantity"
                min="0"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter product description"
              className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none"
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium mb-2">Available Sizes *</label>
            <div className="flex space-x-2 mb-2">
              <select
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a size to add</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="One Size">One Size</option>
              </select>
              <Button type="button" onClick={addSize} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.sizes.map((size, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {size}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSize(size)} />
                </Badge>
              ))}
            </div>
            {formData.sizes.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">Please add at least one size</p>
            )}
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium mb-2">Colors</label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="Enter color (e.g., Red, Blue, Green)"
              />
              <Button type="button" onClick={addColor} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.colors.map((color, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {color}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeColor(color)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter tag (e.g., cotton, comfortable)"
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Stock Management */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium">Stock by Size</label>
              <Button 
                type="button" 
                onClick={generateStockBySize}
                size="sm"
                variant="outline"
                disabled={formData.sizes.length === 0}
              >
                Generate Size Stock
              </Button>
            </div>
            
            {formData.stockBySize.length > 0 && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="grid gap-3">
                  {formData.stockBySize.map((sizeStock, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">{sizeStock.size}</Badge>
                        <Badge variant={sizeStock.inStock ? "default" : "secondary"}>
                          {sizeStock.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={sizeStock.quantity}
                          onChange={(e) => updateStockBySize(sizeStock.size, Number(e.target.value))}
                          className="w-20"
                          min="0"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStockBySize(sizeStock.size)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {formData.stockBySize.length === 0 && (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                <p>No size stock configured</p>
                <p className="text-sm">Add sizes, then click "Generate Size Stock"</p>
              </div>
            )}
          </div>

          {/* Featured and Display Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="rounded"
              />
              <label htmlFor="featured" className="text-sm font-medium">Featured Product</label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Display Order (Homepage)</label>
              <Input
                type="number"
                value={formData.displayOrder ?? ''}
                onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: e.target.value ? Number(e.target.value) : undefined }))}
                placeholder="e.g., 1, 2, 3... (lower = shown first)"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Lower numbers appear first on homepage</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || loading}>
              {isSubmitting ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
