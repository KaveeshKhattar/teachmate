"use client"; // Client-side rendering
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { useCallback, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type SchoolTest = {
    id: string;
    name: string;
    syllabus: string;
    date: string; // Change to string if the API returns a date string
    marks_scored: number;
    total_marks: number;
    student_id: number;
    status: "pending" | "completed";
};

function SchoolTestComponent() {
    const [tests, setTests] = useState<SchoolTest[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    const searchParams = useSearchParams();
    const clerkUserId = searchParams.get('clerkUserId');
    
    const fetchTests = useCallback(async () => {
        if (!clerkUserId) {
            setError("User is not available");
            return;
        }

        try {
            const response = await fetch(`/api/tuitionTest?userId=${clerkUserId}`, {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTests(data); 
                setError(null); // Reset error if fetch is successful
            } else {
                setError("Failed to fetch tests");
            }
        } catch (error) {
            setError("Error fetching tests: " + error);
        } finally {
            setLoading(false); 
        }
    }, [clerkUserId]);

    useEffect(() => {
        if (clerkUserId) {
            fetchTests();
        } else {
            setError("clerkUserId is not available");
        }
    }, [clerkUserId, fetchTests]);

    if (loading) {
        return <div>Loading tests...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

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

export default function WrappedSchoolTestComponent() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SchoolTestComponent />
        </Suspense>
    );
}
