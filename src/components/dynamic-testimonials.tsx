'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  content: string
  rating: number
  image?: string
  product?: string
  verified: boolean
  featured: boolean
}

export default function DynamicTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      const data = await response.json()
      setTestimonials(data.testimonials || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center text-gray-600 py-12">
        <h3 className="text-xl font-semibold mb-2">No testimonials available</h3>
        <p>Check back later for customer reviews!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600">
          Real reviews from real customers • Updated from Notion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`bg-white p-6 rounded-lg shadow-md border ${
              testimonial.featured ? 'border-pink-300 ring-2 ring-pink-100' : 'border-gray-200'
            }`}
          >
            {/* Header */}
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                {testimonial.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  {testimonial.verified && (
                    <div className="ml-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  {renderStars(testimonial.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {testimonial.rating}/5
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-700 mb-4 italic">
              "{testimonial.content}"
            </p>

            {/* Product */}
            {testimonial.product && (
              <div className="text-sm text-gray-500 border-t pt-3">
                <span className="font-medium">Product:</span> {testimonial.product}
              </div>
            )}

            {/* Featured Badge */}
            {testimonial.featured && (
              <div className="mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                  ⭐ Featured Review
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Notion Integration Notice */}
      <div className="text-center text-xs text-gray-500 mt-8">
        💡 Testimonials are managed dynamically through Notion CMS
      </div>
    </div>
  )
}





