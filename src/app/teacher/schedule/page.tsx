/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

type Student = {
    id: number;
    board: string;
    grade: string;
    school: string;
    numberDaysAttendPerWeek: number;
    user: {
        imageUrl: string;
        firstName: string;
        lastName: string;
        email: string;
        clerkUserId: string;
    };
};

type DayState = {
    [key: string]: {
        checked: boolean;
        slots: number;
    };
};

type SelectedStudentState = {
    [key: number]: {
        selected: boolean;
        daysPerWeek: number;
    };
};

type SlotTime = {
    startTime: string;
    endTime: string;
};

type GroupedDataItem = {
    day: string; // e.g., "Monday", "Tuesday"
    slotTime: SlotTime;
    students: Student[]; // Replace `any` with the actual type of student objects if known
};

type GroupedData = GroupedDataItem[];

export default function SchedulePage() {

    const { user } = useUser();
    const clerkUserId = user?.id;

    const [students, setStudents] = useState<Student[]>([]);

    const slotsRequired: { [key: number]: number } = {};

    const [selectedStudents, setSelectedStudents] = useState<SelectedStudentState>({});
    Object.entries(selectedStudents).forEach(([id, state]) => {
        if (state.selected) {
            slotsRequired[Number(id)] = state.daysPerWeek;
        }
    });

    const fetchStudents = useCallback(async () => {
        const data = await fetch(
            `/api/fetch-students/?userClerkId=${clerkUserId}`
        );

        console.log("Called and parsing now...")

        if (data.ok) {
            const response = await data.json();
            console.log("response: ", response);
            const students: Student[] = response.students;
            setStudents(students);
            console.log("students: ", students);
        }

    }, [clerkUserId]);



    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const initialState: DayState = {
        monday: { checked: false, slots: 2 },
        tuesday: { checked: false, slots: 2 },
        wednesday: { checked: false, slots: 2 },
        thursday: { checked: false, slots: 2 },
        friday: { checked: false, slots: 2 },
    };

    const [selectedDays, setSelectedDays] = useState<DayState>(initialState);

    const handleCheckboxChange = (day: string, isChecked: boolean) => {
        setSelectedDays((prev) => ({
            ...prev,
            [day]: { ...prev[day], checked: isChecked },
        }));
    };

    const handleSlotsChange = (day: string, slots: number) => {
        setSelectedDays((prev) => ({
            ...prev,
            [day]: { ...prev[day], slots },
        }));
    };












    // Constants
    const DAYS: string[] = [];
    const SLOTS_PER_DAY: number[] = [];
    Object.entries(selectedDays).forEach(([day, state]) => {
        if (state.checked) {
            DAYS.push(day.charAt(0).toUpperCase() + day.slice(1));
            SLOTS_PER_DAY.push(state.slots);
        }
    });

    const handleStudentSelection = (studentId: number, isSelected: boolean, daysPerWeek: number) => {
        setSelectedStudents(prev => {
            const newState = { ...prev };
            if (isSelected) {
                newState[studentId] = {
                    selected: true,
                    daysPerWeek
                };
            } else {
                delete newState[studentId];  // Remove unselected students entirely
            }
            return newState;
        });
    };

    // Initialize the schedule and availability
    const schedule: { [key: number]: [number, number][] } = {}; // Schedule for each student
    for (const studentId in slotsRequired) {
        schedule[parseInt(studentId)] = [];
    }
    const slotCapacity: number[][] = SLOTS_PER_DAY.map(slots => Array(slots).fill(0)); // Track the number of students assigned to each slot


    function isValidSchedule(studentId: number, day: number, slot: number): boolean {
        // Ensure the student hasn't exceeded their required slots
        if (schedule[studentId].length >= slotsRequired[studentId]) {
            return false;
        }

        // Ensure the student is not assigned multiple slots on the same day
        const daysScheduled = new Set(schedule[studentId].map(([d]) => d));
        if (daysScheduled.has(day)) {
            return false;
        }

        // Ensure the slot can accommodate another student (up to 5 students per slot)
        if (slotCapacity[day][slot] >= 5) {
            return false;
        }

        return true;
    }

    function assignSlots(studentIndex: number): boolean {
        const studentIds = Object.keys(slotsRequired).map(id => parseInt(id)); // Get student IDs
        const studentId = studentIds[studentIndex]; // Get the current student ID

        // Base case: If we've assigned slots to all students
        if (studentIndex >= studentIds.length) {
            return true;
        }

        const requiredSlots = slotsRequired[studentId]; // Get the required slots for this student

        // Try every slot (day, time) and assign a slot to the current student
        for (let day = 0; day < DAYS.length; day++) {
            for (let slot = 0; slot < SLOTS_PER_DAY[day]; slot++) {
                if (isValidSchedule(studentId, day, slot)) {
                    // Assign the slot to the student
                    schedule[studentId] = schedule[studentId] || [];
                    schedule[studentId].push([day, slot]);
                    slotCapacity[day][slot]++;

                    // If the student has reached their required slots, move to the next student
                    if (schedule[studentId].length === requiredSlots) {
                        if (assignSlots(studentIndex + 1)) {
                            return true;
                        }
                    } else {
                        // If the student still needs more slots, try other available slots
                        if (assignSlots(studentIndex)) {
                            return true;
                        }
                    }

                    // Backtrack: undo the assignment
                    schedule[studentId].pop();
                    slotCapacity[day][slot]--;
                }
            }
        }

        return false;
    }

    function formatSchedule(): { [key: string]: string[] } {
        const formattedSchedule: { [key: string]: string[] } = {};

        // Reverse the schedule for the output format "day: slot - student"
        for (const [student, slots] of Object.entries(schedule)) {
            for (const [day, slot] of slots) {
                const daySlotKey = `${DAYS[day]}: Slot ${slot + 1}`;
                if (!formattedSchedule[daySlotKey]) {
                    formattedSchedule[daySlotKey] = [];
                }
                formattedSchedule[daySlotKey].push(`Student ${student}`);
            }
        }

        return formattedSchedule;
    }

    // Start assigning slots from student 1
    function generateSchedule(): { [key: string]: string[] } {
        if (assignSlots(0)) { // Start from the first student (index 0)
            // Format and print the final schedule
            const formattedSchedule = formatSchedule();
            for (const [daySlot, students] of Object.entries(formattedSchedule)) {
                console.log(`${daySlot}: ${students.join(", ")}`);
            }
            return formattedSchedule;
        } else {
            console.log("It's not possible to schedule all students with the given slot requirements.");
        }
        return {};
    }


    const sendScheduleToAPI = async () => {
        const DAY_MAPPING = {
            "Monday": 0,
            "Tuesday": 1,
            "Wednesday": 2,
            "Thursday": 3,
            "Friday": 4,
        };
        const formattedSchedule = generateSchedule();
        if (!formattedSchedule) return;

        const scheduleEntries: { studentId: number, day: number, slot: number }[] = [];
        console.log("scheduleEntries: ", scheduleEntries);

        // Convert formatted schedule into API-compatible data
        for (const [daySlot, students] of Object.entries(formattedSchedule)) {
            const [day, slot] = daySlot.split(": Slot "); // Extract day and slot
            const dayIndex = DAY_MAPPING[day as keyof typeof DAY_MAPPING]; // Convert day back to index
            const slotIndex = parseInt(slot, 10) - 1; // Convert slot back to zero-based index

            students.forEach((student) => {
                const studentId = parseInt(student.replace("Student ", ""), 10); // Extract student ID
                scheduleEntries.push({ studentId, day: dayIndex, slot: slotIndex });
            });
        }

        try {
            // Send a POST request to the API for each schedule entry
            for (const entry of scheduleEntries) {
                await fetch('/api/schedule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(entry),
                });
            }

            console.log("Schedule sent successfully!");
        } catch (error) {
            console.error("Failed to send schedule:", error);
        }
    };

    const [scheduleData, setScheduleData] = useState<GroupedData>([]);

    const fetchUser = async (studentId: number) => {
        // Fetch the student data based on the studentId
        const response = await fetch(`/api/fetchUser/?studentId=${studentId}`);
        const student = await response.json(); // Assuming the API returns the full student object
        return student;
    }

    const fetchScheduleFromAPI = async () => {
        try {
            const response = await fetch('/api/schedule'); // Adjust endpoint if necessary
            const data: { studentId: number, day: number, slot: number }[] = await response.json();
            const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

            const fetchSlotTime = async (day: number, slot: number) => {
                const slotResponse = await fetch(`/api/specific-slot?day=${day}&slot=${slot}`);
                const slotData = await slotResponse.json();
                return { startTime: slotData.start_time, endTime: slotData.end_time };
            };

            const groupedData = await data.reduce(async (accPromise, { studentId, day, slot }) => {
                const acc = await accPromise;
                const key = `${day}-${slot}`; // Create a unique key for day and slot
                if (!acc[key]) {
                    const time = await fetchSlotTime(day, slot);
                    acc[key] = { day: daysOfWeek[day], slotTime: time, students: [] }; // Add slot time
                }

                // Fetch the student details for the given studentId
                const student = await fetchUser(studentId);
                acc[key].students.push(student); // Add the full student object to the group
                return acc;
            }, Promise.resolve({} as Record<string, { day: string; slotTime: { startTime: string; endTime: string }; students: Student[] }>));

            const result = Object.values(groupedData);
            console.log("Dolla sign: ", result);
            result.forEach(({ day, slotTime, students }) => {
                console.log(`Day: ${day}, Slot Time: ${slotTime.startTime} - ${slotTime.endTime}`);
                console.log(`Students:`, students);
            });

            const schedule: { [key: number]: { day: string; slotTime: { startTime: string; endTime: string } }[] } = {};
            setScheduleData(result);

            // Transform the API response into the format required by `formatSchedule()`
            // data.forEach(({ studentId, day, slot }) => {
            //     if (!schedule[studentId]) {
            //         schedule[studentId] = [];
            //     }
            //     schedule[studentId].push([day, slot]);
            // });

            data.forEach(({ studentId, day, slot }) => {
                if (!schedule[studentId]) {
                    schedule[studentId] = [];
                }
                const time = result.find(
                    (item) => daysOfWeek.indexOf(item.day) === day && item.slotTime.startTime && item.slotTime.endTime
                )?.slotTime;
                if (time) {
                    schedule[studentId].push({ day: daysOfWeek[day], slotTime: time });
                }
            });

            console.log("schedule from GET API: ", schedule);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };



    useEffect(() => {
        fetchScheduleFromAPI();
        console.log("scheduleData: ", scheduleData)
    }, []);


    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl font-bold mb-4">Schedule</h1>
                {scheduleData ? (
                    <div className="flex-col space-y-4">
                        {scheduleData.map(({ day, slotTime, students }, index) => (
                            <Card className="w-[350px]" key={index}>
                                <CardHeader>
                                    <CardTitle>{day}</CardTitle>
                                    <CardDescription>
                                        {slotTime.startTime} - {slotTime.endTime}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <ul>
                                            {students.map((student, studentIndex) => (
                                                <li key={studentIndex}>{student.user.firstName}</li> // Replace with actual student data
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p>Loading schedule...</p>
                )}
            </div>

        </>
    );
}
