'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { useCart } from '@/contexts/CartContext'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Package, Mail, CreditCard } from 'lucide-react'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  
  const tranRef = searchParams.get('tranRef')
  const cartId = searchParams.get('cartId')
  const respMessage = searchParams.get('respMessage')
  
  useEffect(() => {
    // Clear cart on successful payment
    if (tranRef) {
      clearCart()
    }
  }, [tranRef, clearCart])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Thank you for your order! Your payment has been processed successfully.
              </p>
              {cartId && (
                <div className="bg-gray-50 p-3 rounded-lg mb-2">
                  <p className="text-sm font-medium text-gray-700">Order ID</p>
                  <p className="text-xs text-gray-600 font-mono">{cartId}</p>
                </div>
              )}
              {tranRef && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Transaction Reference</p>
                  <p className="text-xs text-gray-600 font-mono">{tranRef}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Confirmation Email</p>
                  <p className="text-xs text-gray-600">Check your email for order details</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Package className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Processing</p>
                  <p className="text-xs text-gray-600">Your order is being prepared for shipment</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <CreditCard className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-sm">Payment Confirmed</p>
                  <p className="text-xs text-gray-600">
                    {respMessage || 'Transaction completed successfully'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/products">
                <Button className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  View My Orders
                </Button>
              </Link>
            </div>

            <div className="text-center border-t pt-4">
              <p className="text-xs text-gray-500 mb-2">
                Need help? Contact us at{' '}
                <a href="mailto:info@guzarishh.com" className="text-primary hover:underline">
                  info@guzarishh.com
                </a>
              </p>
              <p className="text-xs text-gray-400">
                Powered by PayTabs Secure Payment Gateway
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
