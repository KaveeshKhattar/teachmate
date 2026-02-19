/* eslint-disable @typescript-eslint/no-unused-vars */

type Day =
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";

type UISlot = {
    recurringScheduleId: number;
    day: Day;
    date: string;          // ISO date of that occurrence
    startTime: string;
    endTime: string;
    maxStudents: number;
    startMinutes: number;
    endMinutes: number;
    students: { id: number; name: string }[];
};

type RecurringScheduleDTO = {
    id: number;
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string | null;
    maxStudents: number;
    days: { day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN" }[];
    exceptions: { date: string; startTime?: string; endTime?: string }[]; // ← add these
    recurringDayAssignments: {
        day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
        student: {
            id: number;
            user: {
                firstName: string | null;
                lastName: string | null;
            };
        };
    }[];
};

type SlotWithAssignmentsDTO = {
    id: number;
    startTime: string;
    endTime: string;
    maxStudents: number;
    assignments: {
        student: {
            id: number;
            user: {
                firstName: string | null;
                lastName: string | null;
            };
        };
    }[];
};

type RecurringDayAssignmentDTO = {
    recurringScheduleId: number;
    day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    student: {
        id: number;
        user: {
            firstName: string | null;
            lastName: string | null;
        };
    };
};
