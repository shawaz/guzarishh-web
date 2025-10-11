'use client'

import { useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PaymentCancelPage() {
  const searchParams = useSearchParams()
  const tranRef = searchParams.get('tranRef')
  const respMessage = searchParams.get('respMessage')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Payment Cancelled</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Your payment was cancelled. No charges have been made to your account.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Your items are still saved in your cart and you can complete your purchase anytime.
              </p>
              
              {tranRef && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Transaction Reference</p>
                  <p className="text-xs text-gray-600 font-mono">{tranRef}</p>
                </div>
              )}
              
              {respMessage && (
                <div className="bg-red-50 p-3 rounded-lg mt-2">
                  <p className="text-sm font-medium text-red-700">Reason</p>
                  <p className="text-xs text-red-600">{respMessage}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Link href="/cart">
                <Button className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Cart
                </Button>
              </Link>
              <Link href="/checkout">
                <Button variant="outline" className="w-full">
                  Try Again
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            <div className="text-center border-t pt-4">
              <p className="text-xs text-gray-500">
                Need help? Contact us at{' '}
                <a href="mailto:info@guzarishh.com" className="text-primary hover:underline">
                  info@guzarishh.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
