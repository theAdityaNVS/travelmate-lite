import { NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { destination, budget, duration, style } = body;

    if (!destination || !budget || !duration || !style) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const plan = await generateItinerary(destination, budget, duration, style);

    return NextResponse.json(plan);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
}
