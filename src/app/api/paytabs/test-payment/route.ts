import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const serverKey = process.env.PAYTABS_SERVER_KEY;
    const profileId = process.env.PAYTABS_PROFILE_ID;
    
    if (!serverKey || !profileId) {
      return NextResponse.json({
        error: 'Missing environment variables',
        hasServerKey: !!serverKey,
        hasProfileId: !!profileId,
      }, { status: 500 });
    }

    // Test PayTabs API directly
    const testPayload = {
      profile_id: parseInt(profileId),
      tran_type: 'sale',
      tran_class: 'ecom',
      cart_id: `TEST_${Date.now()}`,
      cart_description: 'Test Payment',
      cart_currency: 'AED',
      cart_amount: 1.00,
      callback: 'https://example.com/callback',
      return: 'https://example.com/return',
    };

    console.log('Testing PayTabs with server key:', serverKey);
    console.log('Profile ID:', profileId);
    console.log('Test payload:', testPayload);

    const response = await fetch('https://secure.paytabs.com/payment/request', {
      method: 'POST',
      headers: {
        'authorization': serverKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    const responseText = await response.text();
    console.log('PayTabs response status:', response.status);
    console.log('PayTabs response:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = { raw: responseText };
    }

    return NextResponse.json({
      status: response.status,
      ok: response.ok,
      serverKeyLength: serverKey.length,
      serverKey: serverKey,
      profileId: profileId,
      response: responseData,
    });
  } catch (error) {
    console.error('Test payment error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

