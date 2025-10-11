import { NextRequest, NextResponse } from 'next/server';
import { trackOrder } from '@/lib/speedyorder';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const trackingNo = searchParams.get('trackingNo');

    if (!trackingNo) {
      return NextResponse.json(
        { error: 'Tracking number is required' },
        { status: 400 }
      );
    }

    const trackingHistory = await trackOrder(trackingNo);

    return NextResponse.json({
      success: true,
      trackingNumber: trackingNo,
      history: trackingHistory,
    });
  } catch (error) {
    console.error('Order tracking error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to track order',
      },
      { status: 500 }
    );
  }
}

