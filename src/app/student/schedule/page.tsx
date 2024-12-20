'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type SlotTime = {
    startTime: string;
    endTime: string;
};

type GroupedDataItem = {
    day: string; // e.g., "Monday", "Tuesday"
    slotTime: SlotTime;
};

type GroupedData = GroupedDataItem[];

export default function SchedulePageStudent() {
    const { user } = useUser();
    const clerkUserId = user?.id;
    const [studentId, setStudentId] = useState<number | null>(null);
    const [scheduleData, setScheduleData] = useState<GroupedData>([]);

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
            const data: { studentId: number, day: number, slot: number }[] = await response.json();
            const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

            if (!data || data.length === 0) {
                console.log("No schedule found for this student.");
                return;
            }

            const fetchSlotTime = async (day: number, slot: number) => {
                const slotResponse = await fetch(`/api/specific-slot?day=${day}&slot=${slot}`);
                const slotData = await slotResponse.json();
                return { startTime: slotData.start_time, endTime: slotData.end_time };
            };

            const groupedData = await data.reduce(async (accPromise, { day, slot }) => {
                const acc = await accPromise;
                const key = `${day}-${slot}`;

                if (!acc[key]) {
                    const time = await fetchSlotTime(day, slot);
                    acc[key] = { day: daysOfWeek[day], slotTime: time }; // Add slot time
                }
                return acc;
            }, Promise.resolve({} as Record<string, { day: string; slotTime: { startTime: string; endTime: string }; }>));

            const result = Object.values(groupedData);
            setScheduleData(result);
            console.log("Students: ", result)

            console.log("Dolla sign: ", result);
            result.forEach(({ day, slotTime }) => {
                console.log(`Day: ${day}, Slot Time: ${slotTime.startTime} - ${slotTime.endTime}`);
            });

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
            {/* Render the schedule here */}
            <div className="flex justify-center items-center">
                {scheduleData.length === 0 ? (
                    <p>No schedule available.</p>
                ) : (
                    <Card className="w-[400px] m-4">
                        <CardHeader>
                            <CardTitle>Schedule</CardTitle>
                            <CardDescription>Upcoming classes in the following week.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {scheduleData.map((entry, index) => (
                                <div key={index} className="mb-2">
                                    <div className="flex space-x-2">
                                        <label className="text-muted-foreground">Day:</label>
                                        <p className="font-medium">{entry.day}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <p className="text-muted-foreground">Time:</p>
                                        <p>{entry.slotTime.startTime} - {entry.slotTime.endTime}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}
