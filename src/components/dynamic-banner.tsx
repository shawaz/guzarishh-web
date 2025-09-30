'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Banner {
  id: string
  title: string
  subtitle: string
  image: string
  link?: string
  buttonText?: string
  active: boolean
  order: number
}

export default function DynamicBanner() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners')
      const data = await response.json()
      setBanners(data.banners || [])
    } catch (error) {
      console.error('Error fetching banners:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  if (loading) {
    return (
      <div className="w-full h-96 bg-gradient-to-r from-pink-100 to-purple-100 animate-pulse rounded-lg">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mb-6"></div>
            <div className="h-10 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>
    )
  }

  if (banners.length === 0) {
    return (
      <div className="w-full h-96 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-600">
          <h2 className="text-2xl font-bold mb-2">Welcome to Guzarishh</h2>
          <p className="text-lg mb-6">Premium Indian Women's Fashion</p>
          <Button>Shop Now</Button>
        </div>
      </div>
    )
  }

  const currentBanner = banners[currentIndex]

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ backgroundImage: `url(${currentBanner.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-2xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {currentBanner.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {currentBanner.subtitle}
          </p>
          {currentBanner.buttonText && (
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100"
              onClick={() => currentBanner.link && (window.location.href = currentBanner.link)}
            >
              {currentBanner.buttonText}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}

      {/* Auto-rotate */}
      {banners.length > 1 && (
        <div className="absolute bottom-2 right-4 text-white text-xs opacity-75">
          Dynamic content
        </div>
      )}
    </div>
  )
}





