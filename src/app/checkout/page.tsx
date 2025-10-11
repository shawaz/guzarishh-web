'use client'

import { useCart } from '@/contexts/CartContext'
import { useConvexAuth } from '@/contexts/ConvexAuthContext'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, total, itemCount, clearCart } = useCart()
  const { user, loading } = useConvexAuth()
  const router = useRouter()
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'UAE'
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/checkout')
    }
  }, [user, loading, router])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-center">Login Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-gray-600">
                  Please log in to proceed with checkout.
                </p>
                <Button 
                  onClick={() => router.push('/login?redirect=/checkout')}
                  className="w-full"
                >
                  Go to Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const shippingCost = total > 200 ? 0 : 25
  const finalTotal = total + shippingCost

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
  }

  const handlePayTabsPayment = async () => {
    setIsProcessing(true)
    
    try {
      // Generate unique cart ID
      const cartId = `GZR_${Date.now()}_${Math.random().toString(36).substring(7)}`
      
      // Create payment request
      const response = await fetch('/api/paytabs/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalTotal,
          currency: 'AED',
          cartId: cartId,
          description: `Guzarishh Order - ${itemCount} item${itemCount > 1 ? 's' : ''}`,
          customerDetails: {
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: customerInfo.address,
            city: customerInfo.city,
            state: '',
            country: customerInfo.country,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Payment creation failed')
      }

      if (data.requiresRedirect && data.redirectUrl) {
        // Redirect to PayTabs payment page
        window.location.href = data.redirectUrl
      } else if (!data.requiresRedirect && data.paymentResult) {
        // Direct payment result (rare case)
        if (data.paymentResult.response_status === 'A') {
          // Clear cart on successful payment
          clearCart()
          router.push(`/payment/success?tranRef=${data.tranRef}&cartId=${cartId}`)
        } else {
          throw new Error(data.paymentResult.response_message || 'Payment failed')
        }
      } else {
        throw new Error('Unexpected payment response')
      }
      
    } catch (error) {
      console.error('Payment error:', error)
      alert(error instanceof Error ? error.message : 'Payment failed. Please try again.')
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">No items to checkout</h2>
            <p className="text-gray-600 mb-6">Add some items to your cart first!</p>
            <a href="/products">
              <Button>Shop Now</Button>
            </a>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <Input
                        name="firstName"
                        value={customerInfo.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <Input
                        name="lastName"
                        value={customerInfo.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      name="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input
                      name="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="+971 XX XXX XXXX"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Address *</label>
                    <Input
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <Input
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Postal Code *</label>
                      <Input
                        name="postalCode"
                        value={customerInfo.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <Input
                      name="country"
                      value={customerInfo.country}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.size} | {item.color} | Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold">
                          AED {item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                    
                    <hr />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>AED {total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                          {shippingCost === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `AED ${shippingCost}`
                          )}
                        </span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>AED {finalTotal}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Secure Payment with PayTabs</h4>
                      <p className="text-sm text-gray-600">
                        Your payment will be processed securely through PayTabs payment gateway. 
                        We accept all major credit and debit cards.
                      </p>
                    </div>
                    
                    <Button
                      className="w-full"
                      onClick={handlePayTabsPayment}
                      disabled={isProcessing || !customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone || !customerInfo.address || !customerInfo.city || !customerInfo.postalCode}
                    >
                      {isProcessing ? 'Processing...' : `Pay AED ${finalTotal}`}
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      By clicking "Pay", you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
