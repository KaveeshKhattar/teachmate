import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming you have a Prisma client setup

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Ensure the payload is valid
        if (!Array.isArray(body)) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
        }

        // Save data to database
        const records = await prisma.slot.createMany({
            data: body.map(({ day, slot_number, start_time, end_time }) => ({
                day,
                slot_number,
                start_time,
                end_time,
            })),
        });

        return NextResponse.json({ success: true, records });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to save schedule' }, { status: 500 });
    }
}
