import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Get the clerkUserID from the query parameters
    const { searchParams } = new URL(req.url);
    const clerkUserId = searchParams.get("clerkUserID");

    console.log("Searching for user with clerkUserId:", clerkUserId);

    try {
        // Fetch the user by clerkUserId and include associated student data
        const user = await prisma.user.findUnique({
            where: {
                clerkUserId: clerkUserId?.trim() || "",  // Ensure it's not undefined or null
            },
            include: {
                Student: { 
                    select: {
                        id: true, 
                        grade: true,
                        school: true,
                        board: true,
                        fees: true,
                    },
                },
            },
        });
        
        if (!user) {
            console.log(`No user found for clerkUserId: ${clerkUserId}`);
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // If the user is found, return the user and associated student data
        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.error("Error fetching user with clerkUserId:", error);
        return NextResponse.json(
            { error: "Error fetching users" },
            { status: 500 }
        );
    }
}
