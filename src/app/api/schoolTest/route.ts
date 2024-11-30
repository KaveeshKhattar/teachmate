import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"; // Import NextRequest and NextResponse

export async function POST(req: NextRequest) {
    try {
        const { userId, testName, syllabus, date, marksScored, totalMarks } = await req.json();
        console.log("userId: ", userId);

        // Fetch student ID using the Clerk user ID
        const student = await prisma.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!student) {
            return NextResponse.json({ message: "Student not found." }, { status: 404 });
        }

        // Create a new test record
        await prisma.test_School.create({
            data: {
                name: testName,
                syllabus,
                date: new Date(date),
                marks_scored: parseInt(marksScored, 10) || 0,
                total_marks: parseInt(totalMarks, 10),
                test_status: marksScored !== null,
                studentId: student.id, // Use the fetched student ID
            },
        });

        // Return success response using NextResponse
        return NextResponse.json({ message: "Test created successfully." }, { status: 200 });

    } catch (error) {
        console.error(error);
        // Return error response using NextResponse
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {


    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    console.log("userId GET API: ", userId);

    if (!userId) {
        // Return an error if userId is not provided
        return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    try {
        // Fetch the student record based on the userId (Clerk user ID)
        const student = await prisma.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!student) {
            // Return an error if the student is not found
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        console.log("Student: ", student);

        // Fetch the tests associated with the student ID
        const tests = await prisma.test_School.findMany({
            where: { studentId: student.id },
        });

        console.log("tests: ", tests)

        // Return the fetched tests as JSON
        return NextResponse.json(tests);
    } catch (error) {
        console.error("Error fetching tests:", error);
        // Return a generic error message if something goes wrong
        return NextResponse.json({ message: "Error fetching tests" }, { status: 500 });
    }
}


export async function PUT(request: Request) {
    try {
        // Parse the JSON body
        const { testId, testName, syllabus, date, marksScored, totalMarks } = await request.json();

        // Check if `testId` is provided
        if (!testId) {
            return NextResponse.json({ error: 'Test ID is required' }, { status: 400 });
        }

        // Update the SchoolTest record
        const updatedTest = await prisma.test_School.update({
            where: { id: testId },
            data: {
                name: testName,
                syllabus,
                date: new Date(date), // Ensure date is converted to Date object
                marks_scored: marksScored ? parseInt(marksScored, 10) : 0, // Can be null
                total_marks: parseInt(totalMarks),
            },
        });

        // Return the updated record
        return NextResponse.json(updatedTest, { status: 200 });
    } catch (error) {
        console.error('Failed to update test:', error);
        return NextResponse.json(
            { error: 'An error occurred while updating the test' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    console.log("************CALLLED**************");
    try {
      const { testId } = await req.json();
      console.log("Test ID to delete:", testId);
  
      await prisma.test_School.delete({
        where: { id: testId },
      });
  
      return NextResponse.json({ message: "Test deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting test:", error);
      return NextResponse.json(
        { message: "Test not found or Internal Error" },
        { status: 404 }
      );
    }
  }