import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { studentId, day, slot } = await req.json();

        // Step 1: Check the most recent `createdAt` for this `studentId`
        const latestEntry = await prisma.schedule.findFirst({
            where: { studentId },
            orderBy: { createdAt: 'desc' }, // Get the latest entry
        });

        if (latestEntry) {
            const twoMinutesAgo = new Date(Date.now() - 10 * 1000); // Calculate the timestamp for 2 minutes ago

            // Step 2: If the latest entry exceeds 2 minutes, delete all rows for this studentId
            if (new Date(latestEntry.createdAt) < twoMinutesAgo) {
                await prisma.schedule.deleteMany({
                    where: { studentId },
                });
            }
        }

        // Step 3: Create the new schedule entry
        const newSchedule = await prisma.schedule.create({
            data: {
                studentId,
                day,
                slot,
                createdAt: new Date(), // Ensure createdAt is set correctly
            },
        });

        // Return the newly created schedule
        return new Response(JSON.stringify(newSchedule), { status: 201 });
    } catch (error) {
        console.error("Error processing schedule:", error);
        return new Response("Failed to process schedule", { status: 500 });
    }
}

export async function GET() {
    try {
        const schedules = await prisma.schedule.findMany();
        return NextResponse.json(schedules);
    } catch (error) {
        console.error("Error fetching schedules:", error);
        return new Response("Failed to fetch schedules", { status: 500 });
    }
}