import { NextRequest, NextResponse } from 'next/server';
import { verifyPayTabsSignature, PayTabsStatus } from '@/lib/paytabs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Convert FormData to object
    const callbackData: Record<string, string> = {};
    formData.forEach((value, key) => {
      callbackData[key] = value.toString();
    });

    console.log('PayTabs Callback received:', callbackData);

    // Extract signature
    const signature = callbackData.signature;
    
    if (!signature) {
      console.error('Missing signature in callback');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify signature
    const isValid = verifyPayTabsSignature(callbackData, signature);
    
    if (!isValid) {
      console.error('Invalid signature in callback');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Extract payment details
    const {
      tranRef,
      cartId,
      respStatus,
      respCode,
      respMessage,
      acquirerRRN,
      acquirerMessage,
      token,
      customerEmail,
    } = callbackData;

    // Log transaction details
    console.log('Valid PayTabs transaction:', {
      tranRef,
      cartId,
      status: respStatus,
      message: respMessage,
    });

    // Here you would typically:
    // 1. Update order status in your database
    // 2. Send confirmation email
    // 3. Update inventory
    // 4. Log transaction details
    
    // For now, we'll just store in session or redirect appropriately
    // You might want to integrate with Convex to store order details

    // TODO: Add your business logic here
    // Example: Update order in Convex database
    // await updateOrderStatus(cartId, respStatus, tranRef);

    // Return success response (PayTabs expects 200 or 201)
    return NextResponse.json(
      { 
        success: true,
        message: 'Callback processed successfully',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('PayTabs callback error:', error);
    return NextResponse.json(
      { 
        error: 'Callback processing failed',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (in case PayTabs sends return callback as GET)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Convert search params to object
    const callbackData: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      callbackData[key] = value;
    });

    console.log('PayTabs Callback (GET) received:', callbackData);

    const signature = callbackData.signature;
    
    if (!signature) {
      return NextResponse.redirect(
        new URL('/payment/cancel', request.url)
      );
    }

    // Verify signature
    const isValid = verifyPayTabsSignature(callbackData, signature);
    
    if (!isValid) {
      return NextResponse.redirect(
        new URL('/payment/cancel', request.url)
      );
    }

    // Extract payment details
    const { respStatus, tranRef, cartId } = callbackData;

    // Redirect based on payment status
    if (respStatus === PayTabsStatus.AUTHORIZED) {
      return NextResponse.redirect(
        new URL(`/payment/success?tranRef=${tranRef}&cartId=${cartId}`, request.url)
      );
    } else {
      return NextResponse.redirect(
        new URL(`/payment/cancel?tranRef=${tranRef}`, request.url)
      );
    }

  } catch (error) {
    console.error('PayTabs callback (GET) error:', error);
    return NextResponse.redirect(
      new URL('/payment/cancel', request.url)
    );
  }
}

