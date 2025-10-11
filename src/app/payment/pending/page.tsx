'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

function PendingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing')
  const [message, setMessage] = useState('Processing your payment...')

  useEffect(() => {
    // Get URL parameters from PayTabs return
    const tranRef = searchParams.get('tranRef')
    const cartId = searchParams.get('cartId')
    const respStatus = searchParams.get('respStatus')
    const respMessage = searchParams.get('respMessage')

    if (respStatus) {
      // Payment callback received via URL parameters
      if (respStatus === 'A') {
        // Authorized
        setStatus('success')
        setMessage('Payment successful! Redirecting...')
        setTimeout(() => {
          router.push(`/payment/success?tranRef=${tranRef}&cartId=${cartId}`)
        }, 2000)
      } else {
        // Failed or declined
        setStatus('failed')
        setMessage(respMessage || 'Payment failed')
        setTimeout(() => {
          router.push(`/payment/cancel?tranRef=${tranRef}`)
        }, 2000)
      }
    } else {
      // Still waiting for payment completion
      setMessage('Please complete the payment process in the popup window...')
      
      // Poll for status or wait for callback
      // In production, you might want to implement polling to check payment status
      const timeout = setTimeout(() => {
        setMessage('Taking longer than expected. Please wait...')
      }, 10000)

      return () => clearTimeout(timeout)
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
            <CardTitle className="text-2xl">
              {status === 'processing' && 'Processing Payment'}
              {status === 'success' && 'Payment Successful'}
              {status === 'failed' && 'Payment Failed'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">{message}</p>
              
              {status === 'processing' && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Please do not close this window or press the back button.
                  </p>
                  <p className="text-sm text-gray-500">
                    This may take a few moments.
                  </p>
                </div>
              )}
            </div>

            {status === 'processing' && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Secure payment powered by PayTabs
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <PendingContent />
    </Suspense>
  )
}

