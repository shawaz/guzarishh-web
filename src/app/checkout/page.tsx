'use client'

import { useCart } from '@/contexts/CartContext'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, total, itemCount, clearCart } = useCart()
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

  const shippingCost = total > 200 ? 0 : 25
  const finalTotal = total + shippingCost

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleTelrPayment = async () => {
    setIsProcessing(true)
    
    try {
      // Telr payment gateway integration
      const paymentData = {
        store_id: process.env.NEXT_PUBLIC_TELR_STORE_ID,
        authkey: process.env.NEXT_PUBLIC_TELR_AUTH_KEY,
        tran_type: 'sale',
        tran_class: 'ecom',
        cart_id: `GZR_${Date.now()}`,
        cart_description: `Guzarishh Order - ${itemCount} items`,
        cart_currency: 'AED',
        cart_amount: finalTotal.toString(),
        return_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/payment/cancel`,
        customer_ref: customerInfo.email,
        billing_fname: customerInfo.firstName,
        billing_lname: customerInfo.lastName,
        billing_email: customerInfo.email,
        billing_phone: customerInfo.phone,
        billing_address: customerInfo.address,
        billing_city: customerInfo.city,
        billing_country: customerInfo.country,
        billing_zip: customerInfo.postalCode,
      }

      // Create form and submit to Telr
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = 'https://secure.telr.com/gateway/order.json'
      form.target = '_self'

      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = value || ''
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)
      
    } catch (error) {
      console.error('Payment error:', error)
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
                      <h4 className="font-semibold mb-2">Secure Payment with Telr</h4>
                      <p className="text-sm text-gray-600">
                        Your payment will be processed securely through Telr payment gateway. 
                        We accept all major credit and debit cards.
                      </p>
                    </div>
                    
                    <Button
                      className="w-full"
                      onClick={handleTelrPayment}
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
