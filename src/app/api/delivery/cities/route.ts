import { NextResponse } from 'next/server';
import { getCitiesList } from '@/lib/speedyorder';

export async function GET() {
  try {
    const citiesData = await getCitiesList();

    return NextResponse.json({
      success: true,
      cities: citiesData.data,
    });
  } catch (error) {
    console.error('Get cities error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch cities',
      },
      { status: 500 }
    );
  }
}

// Enable caching for cities list (cache for 1 hour)
export const revalidate = 3600;

