'use client';
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

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
        slotTimings: Slot[];
    };
};

type Slot = {
    startTime: string
    endTime: string
}

type SelectedStudentState = {
    [key: number]: {
        selected: boolean;
        daysPerWeek: number;
    };
};

type ScheduleInput = {
    days: string[];
    slotsPerDay: number[];
    students: number;
    slotsRequired: { [key: number]: number };
};

export default function SchedulePage() {

    const { user } = useUser();
    const clerkUserId = user?.id;

    const [students, setStudents] = useState<Student[]>([]);

    const slotsRequired: { [key: number]: number } = {};
    const [slotTimes, setSlotTimes] = useState<{ [key: number]: { startTime: string, endTime: string }[] }>({});

    const handleSlotTimeChange = (studentId: number, day: string, slot: number, startTime: string, endTime: string) => {
        setSlotTimes((prev) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [`${day}-${slot}`]: { startTime, endTime },
            }
        }));
    };

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
        monday: { checked: false, slots: 2, slotTimings: [] },
        tuesday: { checked: false, slots: 2, slotTimings: [] },
        wednesday: { checked: false, slots: 2, slotTimings: [] },
        thursday: { checked: false, slots: 2, slotTimings: [] },
        friday: { checked: false, slots: 2, slotTimings: [] },
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

    const handleTimeChange = (day: string, index: number, field: "startTime" | "endTime", value: string) => {
        setSelectedDays((prevState) => {
            // Create a deep copy of the state for the specific day
            const updatedDay = { ...prevState[day] };
            const updatedSlotTimings = [...updatedDay.slotTimings];

            // Dynamically add slots if the index doesn't exist
            while (updatedSlotTimings.length <= index) {
                updatedSlotTimings.push({ startTime: "", endTime: "" });
            }

            // Update the specific field (startTime or endTime)
            updatedSlotTimings[index][field] = value;

            // Update the day's slotTimings and return the new state
            updatedDay.slotTimings = updatedSlotTimings;
            return { ...prevState, [day]: updatedDay };
        });

        console.log(selectedDays);
        const payload = Object.entries(selectedDays)
        .filter(([_, dayData]) => dayData.checked) // Only include checked days
        .flatMap(([day, dayData], dayIndex) => {
            const dayNumber = ["monday", "tuesday", "wednesday", "thursday", "friday"].indexOf(day);
            return dayData.slotTimings.map((slot, slotIndex) => ({
                day: dayNumber,
                slot_number: slotIndex,
                start_time: slot.startTime,
                end_time: slot.endTime,
            }));
        });

        console.log("payload: ", payload);
    };

    const handleSubmit = async () => {
        const payload = Object.entries(selectedDays)
        .filter(([_, dayData]) => dayData.checked) // Only include checked days
        .flatMap(([day, dayData], dayIndex) => {
            const dayNumber = ["monday", "tuesday", "wednesday", "thursday", "friday"].indexOf(day);
            return dayData.slotTimings.map((slot, slotIndex) => ({
                day: dayNumber,
                slot_number: slotIndex,
                start_time: slot.startTime,
                end_time: slot.endTime,
            }));
        });
    
        try {
            const response = await fetch('/api/slots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit data');
            }
    
            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
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
    const STUDENTS = Object.entries(selectedStudents)
        .filter(([_, state]) => state.selected)
        .length;
    console.log("STUDENTS: ", STUDENTS);
    console.log("selectedStudents: ", selectedStudents);

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
    for (let studentId in slotsRequired) {
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

        try {
            console.log("Sending slots info...")
            handleSubmit();
        } catch (error) {
            console.error("Failed to send slots:", error);   
        }
    };

    useEffect(() => {

        fetchStudents();
        students.map((student) => {
            slotsRequired[student.id] = student.numberDaysAttendPerWeek;
        })
        console.log("slotsRequired: ", slotsRequired);
    }, [fetchStudents]);


    const [startTimeInputs, setStartTimeInputs] = useState({});
    const [endTimeInputs, setEndTimeInputs] = useState({});
    const [slots, setSlots] = useState([]);

    return (
        <>
            <div>
                <div>
                    <h2>Select Days and Slots</h2>
                    {Object.keys(selectedDays).map((day) => (
                        <div key={day}>
                            <label>
                                <input
                                    type="checkbox"
                                    id={day}
                                    name={day}
                                    checked={selectedDays[day].checked}
                                    onChange={(e) => handleCheckboxChange(day, e.target.checked)}
                                />
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="5"
                                value={selectedDays[day].slots}
                                disabled={!selectedDays[day].checked}
                                className={`border-2 border-black ${!selectedDays[day].checked ? "opacity-50" : ""
                                    }`}
                                onChange={(e) =>
                                    handleSlotsChange(day, parseInt(e.target.value) || 0)
                                }
                            />
                            {/* {
                                Array.from({ length: selectedDays[day].slots }, (_, i) => (
                                    <div key={i} className={selectedDays[day].checked ? '' : 'opacity-50'}>
                                        <label>Start Time</label>
                                        <input
                                            type="time"
                                            className="border p-2"
                                            onChange={(e) => handleTimeChange(day, 0, "startTime", e.target.value)}
                                            disabled={!selectedDays[day].checked}
                                        />
                                        <label>End Time</label>
                                        <input
                                            type="time"
                                            className="border p-2"
                                            onChange={(e) => handleTimeChange(day, 0, "endTime", e.target.value)}
                                            disabled={!selectedDays[day].checked}
                                        />
                                    </div>
                                ))
                            } */}

                            {
                                <div key={day}>
                                    {[...Array(selectedDays[day].slots)].map((_, index) => (
                                        <div key={index} className={selectedDays[day].checked ? '' : 'opacity-50'}>
                                            <label>Start Time {index + 1}</label>
                                            <input
                                                type="time"
                                                value={selectedDays[day].slotTimings[index]?.startTime || ""}
                                                onChange={(e) => handleTimeChange(day, index, 'startTime', e.target.value)}
                                                disabled={!selectedDays[day].checked}
                                            />
                                            <label>End Time {index + 1}</label>
                                            <input
                                                type="time"
                                                value={selectedDays[day].slotTimings[index]?.endTime || ""}
                                                onChange={(e) => handleTimeChange(day, index, 'endTime', e.target.value)}
                                                disabled={!selectedDays[day].checked}
                                            />
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    ))}
                    <div>
                        {/* <pre>{JSON.stringify(DAYS, null, 2)}</pre>
                        <pre>{JSON.stringify(SLOTS_PER_DAY, null, 2)}</pre> */}
                    </div>
                </div>

                <div className="space-y-2">
                    <h1>Students: </h1>
                    {students.map((student) => (
                        <div key={student.id} className="flex items-center gap-4">
                            <input
                                type="checkbox"
                                id={`student-${student.id}`}
                                checked={selectedStudents[student.id]?.selected || false}
                                onChange={(e) => handleStudentSelection(
                                    student.id,
                                    e.target.checked,
                                    student.numberDaysAttendPerWeek
                                )}
                            />
                            <label
                                htmlFor={`student-${student.id}`}
                                className={`${!selectedStudents[student.id]?.selected ? 'opacity-50' : ''}`}
                            >
                                {student.user.firstName} {student.user.lastName}
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                defaultValue={student.numberDaysAttendPerWeek}
                                disabled={!selectedStudents[student.id]?.selected}
                                className={`border-2 border-black w-16 px-2 ${!selectedStudents[student.id]?.selected ? 'opacity-50' : ''}`}
                                onChange={(e) => {
                                    const newDaysPerWeek = parseInt(e.target.value, 10) || 1; // Default to 1 if input is invalid
                                    setSelectedStudents((prev) => ({
                                        ...prev,
                                        [student.id]: {
                                            ...prev[student.id],
                                            daysPerWeek: newDaysPerWeek,
                                        },
                                    }));
                                }}
                            />
                            <span className="text-sm text-gray-500">days per week</span>
                        </div>
                    ))}
                </div>
                <div>
                    {/* <pre>{JSON.stringify(slotsRequired, null, 2)}</pre> */}
                </div>
                <Button onClick={sendScheduleToAPI}>
                    Generate Schedule
                </Button>
            </div>
        </>
    );
}
