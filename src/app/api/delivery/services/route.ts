import { NextResponse } from 'next/server';
import { getProductsAndServices } from '@/lib/speedyorder';

export async function GET() {
  try {
    const servicesData = await getProductsAndServices();

    return NextResponse.json({
      success: true,
      ...servicesData,
    });
  } catch (error) {
    console.error('Get services error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch services',
      },
      { status: 500 }
    );
  }
}

// Enable caching for services (cache for 1 hour)
export const revalidate = 3600;

