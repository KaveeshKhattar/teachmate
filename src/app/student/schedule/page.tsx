'use client';
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

export default function SchedulePageStudent() {
    const { user } = useUser();
    const clerkUserId = user?.id;
    const [studentId, setStudentId] = useState<number | null>(null);
    const [scheduleData, setScheduleData] = useState<{ day: string; slot: number; }[]>([]);

    const fetchUserByClerkUserID = async (clerkUserID: string) => {
        try {
            const response = await fetch(`/api/getUserFromClerkUserID?clerkUserID=${clerkUserID}`);
            const data = await response.json();

            if (data.error) {
                console.error("Error fetching users:", data.error);
                return null;
            }

            setStudentId(data.Student.id);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchScheduleFromAPI = async (studentId: number) => {
        try {
            const response = await fetch(`/api/student-schedule?studentId=${studentId}`);
            const data: { studentId: number; day: number; slot: number }[] = await response.json();

            if (!data || data.length === 0) {
                console.log("No schedule found for this student.");
                return;
            }

            const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            const groupedData = await data.reduce(async (accPromise, { studentId, day, slot }) => {
                const acc = await accPromise;
                const key = `${day}-${slot}`;

                if (!acc[key]) {
                    acc[key] = { day: daysOfWeek[day], slot };
                }
                
                return acc;
            }, Promise.resolve({} as Record<string, { day: string; slot: number;}>));

            const result = Object.values(groupedData);
            setScheduleData(result);
            console.log("Students: ", result)
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };

    useEffect(() => {
        if (clerkUserId) {
            const fetchData = async () => {
                await fetchUserByClerkUserID(clerkUserId);
            };
            fetchData();
        }
    }, [clerkUserId]);

    useEffect(() => {
        if (studentId) {
            fetchScheduleFromAPI(studentId);
        }
    }, [studentId]);

    return (
        <>
            <div>
                <h1>Schedule</h1>
                <h2>Upcoming classes...</h2>
                {/* Render the schedule here */}
                <div>
                    {scheduleData.length === 0 ? (
                        <p>No schedule available.</p>
                    ) : (
                        scheduleData.map((entry, index) => (
                            <div key={index}>
                                <p>{entry.day}, Slot: {entry.slot}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
