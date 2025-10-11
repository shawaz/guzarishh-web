import { NextRequest, NextResponse } from 'next/server';
import {
  createDeliveryOrder,
  formatOrderDate,
  generateTrackingNumber,
  calculateWeight,
} from '@/lib/speedyorder';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      orderId,
      receiverName,
      receiverPhone,
      receiverEmail,
      receiverAddress,
      city,
      pieces,
      collectionAmount,
      productDescription,
      specialInstruction,
    } = body;

    // Validate required fields
    if (!orderId || !receiverName || !receiverPhone || !receiverAddress || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate tracking number
    const trackingNo = generateTrackingNumber();

    // Create delivery order with SpeedyOrder
    const deliveryOrder = await createDeliveryOrder({
      service_type: '6', // Other Cities - 4hr (adjust based on your needs)
      product: '1', // COD
      origin: 'Dubai', // Your origin city
      tracking_no: trackingNo,
      receiver_phone: receiverPhone,
      destination: city,
      receiver_name: receiverName,
      receiver_email: receiverEmail || '',
      receiver_address: receiverAddress,
      pieces: pieces || 1,
      weight: calculateWeight(pieces || 1),
      order_date: formatOrderDate(),
      collection_amount: collectionAmount || '0.00',
      product_description: productDescription || '',
      special_instruction: specialInstruction || '',
      order_id: orderId,
    });

    return NextResponse.json({
      success: true,
      trackingNumber: deliveryOrder.tracking_no,
      courierOrderId: deliveryOrder.id,
      message: deliveryOrder.message,
    });
  } catch (error) {
    console.error('Delivery order creation error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create delivery order',
      },
      { status: 500 }
    );
  }
}

