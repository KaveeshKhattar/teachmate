import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch teachers and their user data
    const teachers = await prisma.teacher.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            imageUrl: true,
          }
        }
      }
    });
    console.log(teachers);
    // Return the teacher data as a response using NextResponse
    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch teacher data:', error);
    return NextResponse.json({ error: 'Failed to fetch teacher data' }, { status: 500 });
  }
}
