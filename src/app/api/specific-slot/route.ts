import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Extract the query parameters (day and slot) from the URL
    const url = new URL(request.url);
    const day = parseInt(url.searchParams.get('day') || '', 10);
    const slot = parseInt(url.searchParams.get('slot') || '', 10);

    // Validate the parameters
    if (isNaN(day) || isNaN(slot)) {
        return NextResponse.json({ error: 'Invalid day or slot parameter' }, { status: 400 });
    }

    try {
        // Query the Slot table for the specific slot based on the day and slot number
        const slotData = await prisma.slot.findFirst({
            where: {
                day: day,
                slot_number: slot,
            },
            select: {
                start_time: true,
                end_time: true,
            },
        });

        // If no data found, return an error
        if (!slotData) {
            return NextResponse.json({ error: 'Slot not found' }, { status: 404 });
        }

        // Return the slot time data
        return NextResponse.json(slotData);
    } catch (error) {
        // Handle any errors that occur during the query
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
