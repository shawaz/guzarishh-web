'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Package, Search, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react'

interface TrackingEvent {
  tracking_no: string
  status: string
  created: string
}

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingHistory, setTrackingHistory] = useState<TrackingEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number')
      return
    }

    setLoading(true)
    setError('')
    setSearched(false)

    try {
      const response = await fetch(`/api/delivery/track?trackingNo=${encodeURIComponent(trackingNumber)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to track order')
      }

      setTrackingHistory(data.history || [])
      setSearched(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track order')
      setTrackingHistory([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes('delivered')) {
      return <CheckCircle2 className="h-6 w-6 text-green-600" />
    }
    if (lowerStatus.includes('cancel')) {
      return <XCircle className="h-6 w-6 text-red-600" />
    }
    return <Clock className="h-6 w-6 text-blue-600" />
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleString('en-AE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <Package className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Track Your Order</h1>
            <p className="text-gray-600">Enter your tracking number to see your delivery status</p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleTrack} className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter tracking number (e.g., 20210010236)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button type="submit" disabled={loading} className="min-w-[120px]">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Track
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="mb-8 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-red-600">
                  <XCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tracking Results */}
          {searched && !loading && trackingHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tracking History</CardTitle>
                <CardDescription>
                  Tracking Number: <span className="font-mono font-semibold">{trackingNumber}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingHistory.map((event, index) => (
                    <div key={index} className="relative pl-10">
                      {/* Timeline line */}
                      {index !== trackingHistory.length - 1 && (
                        <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-200" />
                      )}

                      {/* Icon */}
                      <div className="absolute left-0 top-0">
                        {getStatusIcon(event.status)}
                      </div>

                      {/* Content */}
                      <div className="pb-6">
                        <p className="font-semibold text-lg mb-1">{event.status}</p>
                        <p className="text-sm text-gray-500">{formatDate(event.created)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {searched && !loading && trackingHistory.length === 0 && !error && (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Tracking Information</h3>
                <p className="text-gray-600">
                  We couldn't find any tracking information for this number.
                  <br />
                  Please check the number and try again.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              You can find your tracking number in your order confirmation email
              <br />
              or in your order history in your account dashboard.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                View My Orders
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

