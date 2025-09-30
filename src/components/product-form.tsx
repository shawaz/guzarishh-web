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
    size: product?.size || '',
    colors: product?.colors || [],
    inStock: product?.inStock ?? true,
    stockQuantity: product?.stockQuantity || 0,
    tags: product?.tags || [],
    featured: product?.featured ?? false,
  })

  // State for managing uploaded images with storage IDs
  const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; storageId: Id<"_storage"> }>>([])

  const [newColor, setNewColor] = useState('')
  const [newTag, setNewTag] = useState('')

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
      const updated = prev.filter(img => img.storageId !== storageId)
      
      // If we removed the main image, set the first remaining image as main
      if (formData.image === prev.find(img => img.storageId === storageId)?.url) {
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
      
      // Remove the sizes field if it exists (it's not in the Convex schema)
      delete (productData as any).sizes
      
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
              <label className="block text-sm font-medium mb-2">Price (₹) *</label>
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
              <label className="block text-sm font-medium mb-2">Original Price (₹)</label>
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
            <p className="text-sm text-gray-500 mt-2">
              Upload images to preview them. Images will be saved when you submit the form.
            </p>
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium mb-2">Size *</label>
            <select
              value={formData.size}
              onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="One Size">One Size</option>
            </select>
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

          {/* Featured */}
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
