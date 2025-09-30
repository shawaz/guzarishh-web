'use client'

import { useState, useRef, useCallback } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Id } from '@/convex/_generated/dataModel'

interface ImageUploadProps {
  onImageUpload: (url: string, storageId: Id<"_storage">) => void
  onImageRemove: (storageId: Id<"_storage">) => void
  images: Array<{ url: string; storageId: Id<"_storage"> }>
  maxImages?: number
  aspectRatio?: string
}

export default function ImageUpload({ 
  onImageUpload, 
  onImageRemove, 
  images = [], 
  maxImages = 6,
  aspectRatio = "aspect-[3/4]"
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl)
  const convex = useConvex()

  const handleFiles = useCallback(async (files: FileList) => {
    if (files.length === 0) return
    
    const file = files[0]
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }
    
    if (images.length >= maxImages) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }

    setUploading(true)
    
    try {
      // Get upload URL from Convex
      const uploadUrl = await generateUploadUrl()
      
      // Upload file to Convex storage
      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      
      const { storageId } = await result.json()
      
      // Get the proper Convex URL using the storage.getUrl function
      const convexUrl = await convex.query(api.storage.getImageUrl, { storageId })
      
      console.log('Upload details:', { uploadUrl, storageId, convexUrl })
      
      if (convexUrl) {
        // Call the callback with both URL and storage ID
        onImageUpload(convexUrl, storageId)
      } else {
        console.error('Failed to get Convex URL for storageId:', storageId)
        // Fallback: try to construct URL manually
        const fallbackUrl = `${uploadUrl.split('?')[0]}/${storageId}`
        console.log('Using fallback URL:', fallbackUrl)
        onImageUpload(fallbackUrl, storageId)
      }
      
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }, [images.length, maxImages, generateUploadUrl, onImageUpload])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={uploading || images.length >= maxImages}
        />
        
        <div className="flex flex-col items-center space-y-2">
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-gray-400" />
          )}
          
          <div className="text-sm text-gray-600">
            {uploading ? (
              'Uploading...'
            ) : images.length >= maxImages ? (
              `Maximum ${maxImages} images reached`
            ) : (
              <>
                <button
                  type="button"
                  onClick={onButtonClick}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Click to upload
                </button>
                {' '}or drag and drop
              </>
            )}
          </div>
          
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative group overflow-hidden">
              <CardContent className="p-0">
                <div className={`${aspectRatio} relative`}>
                  <img
                    src={image.url}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Remove button */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onImageRemove(image.storageId)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  
                  {/* Main image indicator */}
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Main
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {images.length < maxImages && !uploading && (
        <Button
          type="button"
          variant="outline"
          onClick={onButtonClick}
          className="w-full"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Add More Images ({images.length}/{maxImages})
        </Button>
      )}
    </div>
  )
}
