'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  rating: number
  comment: string
  location: string
  image?: string
}

export default function DynamicTestimonials() {
  // Static testimonials for now - can be replaced with Convex data later
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Absolutely love the quality and design! The saree I ordered exceeded my expectations.',
      location: 'Mumbai, India'
    },
    {
      id: '2',
      name: 'Anita Patel',
      rating: 5,
      comment: 'Beautiful collection and excellent customer service. Will definitely order again!',
      location: 'Dubai, UAE'
    },
    {
      id: '3',
      name: 'Sneha Reddy',
      rating: 4,
      comment: 'Great variety of traditional wear. The delivery was fast and packaging was perfect.',
      location: 'Bangalore, India'
    }
  ]

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600">
            Real reviews from real customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}