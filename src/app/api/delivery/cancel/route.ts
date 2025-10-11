import { NextRequest, NextResponse } from 'next/server';
import { cancelDeliveryOrder } from '@/lib/speedyorder';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { trackingNo } = body;

    if (!trackingNo) {
      return NextResponse.json(
        { error: 'Tracking number is required' },
        { status: 400 }
      );
    }

    const result = await cancelDeliveryOrder(trackingNo);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Cancel delivery error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to cancel delivery',
      },
      { status: 500 }
    );
  }
}

