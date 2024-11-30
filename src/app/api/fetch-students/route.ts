import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userClerkId = searchParams.get("userClerkId");

    if (!userClerkId) {
        return NextResponse.json({ message: "clerkUserId is required" }, { status: 400 });
    }

    // Find the user using clerkUserId
    const user = await prisma.user.findUnique({
        where: { clerkUserId: userClerkId },
    });

    if (!user?.id) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find the teacher and their students
    const teacherWithStudents = await prisma.teacher.findUnique({
        where: { userId: user.id },
        include: {
            Student: {
                include: {
                    user: true,
                },
            },
            user: true,
        },
    });

    if (!teacherWithStudents) {
        return NextResponse.json({ message: "Teacher with students not found" }, { status: 404 });
    }

    // Return the teacher's students
    return NextResponse.json({ students: teacherWithStudents.Student }, { status: 200 });
}
