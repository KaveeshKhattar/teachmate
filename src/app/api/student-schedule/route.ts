import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
    // Get studentId from the query parameters
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    // Check if studentId is provided and is a valid number
    if (!studentId || isNaN(Number(studentId))) {
        return NextResponse.json(
            { error: "Invalid or missing student ID" },
            { status: 400 }
        );
    }

    try {
        // Fetch the student's schedule and include the related student data
        const schedule = await prisma.schedule.findMany({
            where: {
                studentId: Number(studentId), // Filter by studentId
            },
        });

        // If no schedule found for the student
        if (schedule.length === 0) {
            return NextResponse.json(
                { message: "No schedule found for the student" },
                { status: 404 }
            );
        }

        // Return the student's schedule
        return NextResponse.json(schedule, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error fetching schedule" },
            { status: 500 }
        );
    }
}
