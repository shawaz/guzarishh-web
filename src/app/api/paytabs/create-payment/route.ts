import { NextRequest, NextResponse } from 'next/server';
import { 
  createPayTabsPayment, 
  getClientIP,
  type PayTabsPaymentRequest 
} from '@/lib/paytabs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      amount,
      currency = 'AED',
      cartId,
      description,
      customerDetails,
    } = body;

    // Validate required fields
    if (!amount || !cartId || !description || !customerDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get client IP
    const clientIP = getClientIP(request);

    // Get base URL for callbacks
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                    request.headers.get('origin') || 
                    `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}`;

    // Prepare payment request
    const paymentRequest: PayTabsPaymentRequest = {
      profile_id: parseInt(process.env.PAYTABS_PROFILE_ID || '168330'),
      tran_type: 'sale',
      tran_class: 'ecom',
      cart_id: cartId,
      cart_description: description,
      cart_currency: currency,
      cart_amount: parseFloat(amount),
      callback: `${baseUrl}/api/paytabs/callback`,
      return: `${baseUrl}/payment/pending`,
      customer_details: {
        name: `${customerDetails.firstName} ${customerDetails.lastName}`,
        email: customerDetails.email,
        phone: customerDetails.phone,
        street1: customerDetails.address,
        city: customerDetails.city,
        state: customerDetails.state || '',
        country: customerDetails.country || 'AE',
        ip: clientIP,
      },
    };

    // Create payment with PayTabs
    const paymentResponse = await createPayTabsPayment(paymentRequest);

    // Check if response contains redirect_url (requires 3D Secure or additional verification)
    if ('redirect_url' in paymentResponse) {
      return NextResponse.json({
        success: true,
        requiresRedirect: true,
        redirectUrl: paymentResponse.redirect_url,
        tranRef: paymentResponse.tran_ref,
      });
    }

    // Direct payment result (rare for card payments)
    if ('payment_result' in paymentResponse) {
      return NextResponse.json({
        success: true,
        requiresRedirect: false,
        paymentResult: paymentResponse.payment_result,
        tranRef: paymentResponse.tran_ref,
      });
    }

    return NextResponse.json(
      { error: 'Unexpected response from payment gateway' },
      { status: 500 }
    );

  } catch (error) {
    console.error('PayTabs payment creation error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Payment creation failed',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

