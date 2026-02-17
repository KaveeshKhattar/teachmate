"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AddSlotDialog from "./AddSlotDialog";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";



const ROW_HEIGHT = 40; // px per 30-min row

function getDurationMinutes(start: string, end: string) {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    return (eh * 60 + em) - (sh * 60 + sm);
}


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


const WEEK_ENUM_BY_INDEX = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;

const DAYS: Day[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

function format12h(time: string) {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}


function getMonday(d: Date) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    date.setDate(date.getDate() + diff);
    date.setHours(0, 0, 0, 0);
    return date;
}

function addDays(d: Date, n: number) {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
}

function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function formatHeader(d: Date) {
    return d.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
    });
}

function buildTimes() {
    const t: string[] = [];
    for (let h = 0; h < 24; h++) {
        for (let m of [0, 30]) {
            t.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
        }
    }
    return t;
}

const TIMES = buildTimes();

type RecurringScheduleDTO = {
    id: number;
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string | null;
    maxStudents: number;
    days: { day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN" }[];
    exceptions: { date: string }[];
};

function getTimePart(d: string) {
    const date = new Date(d);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
    ).padStart(2, "0")}`;
}

function timeToMinutes(t: string) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}

function dateToMinutes(d: string) {
    const dt = new Date(d);
    return dt.getHours() * 60 + dt.getMinutes();
}

function sameDate(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function expandForWeek(
    schedules: RecurringScheduleDTO[],
    weekStart: Date
): UISlot[] {
    const result: UISlot[] = [];

    const weekDates = DAYS.map((_, i) => addDays(weekStart, i));

    for (const sch of schedules) {
        const schStart = new Date(sch.startDate);
        const schEnd = sch.endDate ? new Date(sch.endDate) : null;

        const startTime = getTimePart(sch.startTime);
        const endTime = getTimePart(sch.endTime);

        const startMinutes = dateToMinutes(sch.startTime);
        const endMinutes = dateToMinutes(sch.endTime);
        const exceptionDates = new Set(
            (sch.exceptions ?? []).map(e =>
                new Date(e.date).toDateString()
            )
        );



        const allowedDays = new Set(sch.days.map((d) => d.day));
        console.log("allowedDays", allowedDays);


        weekDates.forEach((date, idx) => {
            const weekdayEnum = WEEK_ENUM_BY_INDEX[idx];

            const dayKey = date.toDateString();

            if (exceptionDates.has(dayKey)) return;

            if (!allowedDays.has(weekdayEnum)) return;

            if (date < schStart) return;
            if (schEnd && date > schEnd) return;

            result.push({
                recurringScheduleId: sch.id,
                day: DAYS[idx],
                date: date.toISOString(),
                startTime,
                endTime,
                maxStudents: sch.maxStudents,
                startMinutes,
                endMinutes,
                students: [], // fill later from API
            });
        });
    }


    console.log("generated", result);
    return result;
}


export default function SlotScheduler() {
    const [weekStart, setWeekStart] = React.useState(() =>
        getMonday(new Date())
    );

    const [schedules, setSchedules] = React.useState<RecurringScheduleDTO[]>([]);
    const [selectedSlot, setSelectedSlot] = React.useState<UISlot | null>(null);
    const [deleteOpen, setDeleteOpen] = React.useState(false);


    React.useEffect(() => {
        function reload() {
            fetch("/api/recurring-schedules")
                .then((r) => r.json())
                .then(setSchedules);
        }

        reload(); // ✅ THIS was missing

        window.addEventListener("schedule-created", reload);
        return () => window.removeEventListener("schedule-created", reload);
    }, []);


    const slots = React.useMemo(() => {
        return expandForWeek(schedules, weekStart);
    }, [schedules, weekStart]);


    const weekDays = DAYS.map((_, i) => addDays(weekStart, i));
    const today = new Date();

    const slotsByDay = React.useMemo(() => {
        const map: Record<Day, typeof slots> = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        };

        for (const s of slots) {
            map[s.day].push(s);
        }

        return map;
    }, [slots]);


    return (
        <div className="space-y-4">
            {/* toolbar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setWeekStart(addDays(weekStart, -7))}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setWeekStart(addDays(weekStart, 7))}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    <div className="ml-2 text-sm font-medium">
                        Week of{" "}
                        {weekStart.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })}
                    </div>

                </div>

                <div className="space-x-4">
                    <Button className="cursor-pointer">Create Schedule</Button>

                    <AddSlotDialog />
                </div>

            </div>

            {/* calendar */}
            <div className="rounded-lg border overflow-hidden bg-background">
                {/* header */}
                <div className="grid grid-cols-[72px_repeat(7,1fr)] border-b bg-muted/40">
                    <div />

                    {weekDays.map((date, i) => {
                        const isToday = isSameDay(date, today);
                        const isWeekend = i >= 5;

                        return (
                            <div
                                key={i}
                                className={[
                                    "border-l px-2 py-2 text-center text-sm",
                                    isWeekend && "bg-muted/30",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <div
                                    className={[
                                        "inline-flex rounded-md px-2 py-0.5",
                                        isToday &&
                                        "bg-primary text-primary-foreground text-xs",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                >
                                    {formatHeader(date)}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* body */}
                <div className="relative h-[620px] overflow-y-auto">
                    <div className="grid grid-cols-[72px_repeat(7,1fr)]">
                        {TIMES.map((time) => (
                            <React.Fragment key={time}>
                                <div
                                    className="relative border-b text-xs text-muted-foreground"
                                    style={{ height: ROW_HEIGHT }}
                                >
                                    {/* label next to the line */}
                                    <div className="absolute -top-[7px] right-1 z-10 bg-background px-1">
                                        {format12h(time)}
                                    </div>

                                </div>


                                {DAYS.map((day, col) => {
                                    const isWeekend = col >= 5;

                                    const daySlots = slots.filter((s) => s.day === day);

                                    return (
                                        <div
                                            key={day}
                                            className={[
                                                "relative border-l border-b",
                                                isWeekend && "bg-muted/20",
                                            ]
                                                .filter(Boolean)
                                                .join(" ")}
                                            style={{ height: ROW_HEIGHT }}
                                        >
                                            {/* slots will be rendered only in the first row */}

                                        </div>
                                    );
                                })}

                            </React.Fragment>
                        ))}

                        <div className="pointer-events-none absolute inset-0 grid grid-cols-[72px_repeat(7,1fr)]">
                            <div /> {/* time gutter */}

                            {DAYS.map((day, col) => (
                                <div key={day} className="relative">
                                    {slotsByDay[day].map((s, i) => {
                                        const top =
                                            (s.startMinutes / 30) * ROW_HEIGHT;

                                        const height =
                                            ((s.endMinutes - s.startMinutes) / 30) *
                                            ROW_HEIGHT;

                                        return (
                                            <div
                                                key={i}
                                                onClick={() => setSelectedSlot(s)}
                                                className="absolute left-1 right-1 rounded-md
             bg-primary/90 px-1 py-0.5
             text-[10px] text-primary-foreground shadow-sm
             pointer-events-auto cursor-pointer"
                                                style={{ top, height }}
                                            >

                                                <div className="font-medium">
                                                    {s.startTime} – {s.endTime}
                                                </div>
                                                <div className="opacity-80">
                                                    {s.maxStudents} students
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            <Dialog
                open={!!selectedSlot}
                onOpenChange={(o) => {
                    if (!o) {
                        setSelectedSlot(null);
                        setDeleteOpen(false);
                    }
                }}
            >

                <DialogContent className="sm:max-w-[420px]">
                    {selectedSlot && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Slot details</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-3 text-sm">

                                <div>
                                    <div className="text-muted-foreground">Date</div>
                                    <div>
                                        {new Date(selectedSlot.date).toLocaleDateString()}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-muted-foreground">Time</div>
                                    <div>
                                        {selectedSlot.startTime} – {selectedSlot.endTime}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-muted-foreground">Duration</div>
                                    <div>
                                        {getDurationMinutes(
                                            selectedSlot.startTime,
                                            selectedSlot.endTime
                                        )} minutes
                                    </div>
                                </div>

                                <div>
                                    <div className="text-muted-foreground">
                                        Students assigned
                                    </div>

                                    {selectedSlot.students.length === 0 ? (
                                        <div className="text-muted-foreground italic">
                                            No students assigned
                                        </div>
                                    ) : (
                                        <ul className="list-disc pl-4">
                                            {selectedSlot.students.map((s) => (
                                                <li key={s.id}>{s.name}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div>
                                    <div className="text-muted-foreground">Capacity</div>
                                    <div>
                                        {selectedSlot.students.length} /{" "}
                                        {selectedSlot.maxStudents}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <Button
                        variant="destructive"
                        onClick={() => setDeleteOpen(true)}
                    >
                        Delete
                    </Button>

                    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete slot</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Do you want to delete only this slot or the entire recurring schedule?
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>

                                <Button
                                    variant="outline"
                                    onClick={async () => {
                                        if (!selectedSlot) return;

                                        await fetch(
                                            `/api/recurring-schedules/occurrence/${encodeURIComponent(
                                                selectedSlot.date
                                            )}?scheduleId=${selectedSlot.recurringScheduleId}`,
                                            { method: "DELETE" }
                                        );

                                        setDeleteOpen(false);
                                        setSelectedSlot(null);

                                        window.dispatchEvent(new Event("schedule-created"));
                                    }}
                                >
                                    Just this one
                                </Button>


                                <Button
                                    variant="destructive"
                                    onClick={async () => {
                                        if (!selectedSlot) return;

                                        await fetch(
                                            `/api/recurring-schedules?scheduleId=${selectedSlot.recurringScheduleId}`,
                                            { method: "DELETE" }
                                        );

                                        setDeleteOpen(false);
                                        setSelectedSlot(null);

                                        window.dispatchEvent(new Event("schedule-created"));
                                    }}
                                >
                                    Delete all
                                </Button>

                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>


                </DialogContent>
            </Dialog>

        </div>
    );
}
