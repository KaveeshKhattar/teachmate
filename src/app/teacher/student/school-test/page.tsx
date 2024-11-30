"use client"; // Client-side rendering
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type SchoolTest = {
    id: string;
    name: string;
    syllabus: string;
    date: Date;
    marks_scored: number;
    total_marks: number;
    student_id: number;
    status: "pending" | "completed";
};


export default function SchoolTest() {
    const [tests, setTests] = useState<SchoolTest[]>([]);

    const searchParams = useSearchParams();
    const clerkUserId = searchParams.get('clerkUserId');

    const [testName, setTestName] = useState("");
    const [syllabus, setSyllabus] = useState("");
    const [date, setDate] = useState("");
    const [marksScored, setMarksScored] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    
    const fetchTests = useCallback(async () => {
        if (!clerkUserId) {
            console.error("User is not available");
            return;
        }

        try {
            const response = await fetch(`/api/tuitionTest?userId=${clerkUserId}`, {
                method: "GET", // Use GET request here
                headers: {
                    "Content-Type": "application/json", // optional
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTests(data); // Set the data to state
                console.log("Tests fetched successfully", data);
            } else {
                console.error("Failed to fetch tests");
            }
        } catch (error) {
            console.error("Error fetching tests:", error);
        }
    }, [clerkUserId]);

    // useEffect to handle the asynchronous fetch
    useEffect(() => {
        fetchTests();
    }, [fetchTests, clerkUserId]); // Trigger fetch when user.id is available

    return (
        <div>
            <ul>
                {tests.length > 0 ? (
                    tests.map((test) => (
                        <div
                            className="flex flex-col justify-center items-center mb-4"
                            key={test.id}
                        >
                            <Card className="w-[350px]">
                                <CardHeader>
                                    <CardTitle>{test.name}</CardTitle>
                                    <CardDescription>Test (School)</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <p>Syllabus: {test.syllabus}</p>
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            <p>Date: {new Date(test.date).toLocaleDateString()}</p>
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            Marks Scored: {test.marks_scored}
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            Total Marks: {test.total_marks}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p className="flex items-center justify-center mt-8">
                        No tests found
                    </p>
                )}
            </ul>
        </div>
    );
}
