import { NextResponse } from 'next/server';

export async function GET() {
  const serverKey = process.env.PAYTABS_SERVER_KEY;
  const profileId = process.env.PAYTABS_PROFILE_ID;
  
  return NextResponse.json({
    hasServerKey: !!serverKey,
    serverKeyLength: serverKey?.length || 0,
    serverKeyPrefix: serverKey?.substring(0, 10) || 'missing',
    hasProfileId: !!profileId,
    profileId: profileId || 'missing',
  });
}

