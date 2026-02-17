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

function EditRecurringDialogBody({
    slot,
    schedule,
    onClose,
}: {
    slot: UISlot;
    schedule: RecurringScheduleDTO;
    onClose: () => void;
}) {

    const [days, setDays] = React.useState<Day[]>([]);

    React.useEffect(() => {
        if (!schedule) return;

        setDays(
            schedule.days.map((d) =>
                d.day === "MON" ? "Monday"
                    : d.day === "TUE" ? "Tuesday"
                        : d.day === "WED" ? "Wednesday"
                            : d.day === "THU" ? "Thursday"
                                : d.day === "FRI" ? "Friday"
                                    : d.day === "SAT" ? "Saturday"
                                        : "Sunday"
            )
        );
    }, [schedule.id]);

    const [startDate, setStartDate] = React.useState(
        schedule.startDate.slice(0, 10)
    );
    const [startTime, setStartTime] = React.useState(slot.startTime);
    const [endTime, setEndTime] = React.useState(slot.endTime);
    const [loading, setLoading] = React.useState(false);

    function toggleDay(d: Day) {
        setDays((prev) =>
            prev.includes(d)
                ? prev.filter((x) => x !== d)
                : [...prev, d]
        );
    }

    async function save() {
        setLoading(true);

        await fetch("/api/recurring-schedules", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                scheduleId: slot.recurringScheduleId,
                startDate,
                startTime,
                endTime,
                days: days.map((d) =>
                    d === "Monday" ? "MON"
                        : d === "Tuesday" ? "TUE"
                            : d === "Wednesday" ? "WED"
                                : d === "Thursday" ? "THU"
                                    : d === "Friday" ? "FRI"
                                        : d === "Saturday" ? "SAT"
                                            : "SUN"
                ),
            }),
        });

        window.dispatchEvent(new Event("schedule-created"));
        setLoading(false);
        onClose();
    }



    return (
        <>
            <DialogHeader>
                <DialogTitle>Edit recurring schedule</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">

                {/* Days */}
                <div className="space-y-2">
                    <div className="text-sm font-medium">Days of week</div>

                    <div className="grid grid-cols-4 gap-2">
                        {DAYS.map((d) => (
                            <Button
                                key={d}
                                type="button"
                                variant={days.includes(d) ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleDay(d)}
                            >
                                {d.slice(0, 3)}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Start date */}
                <div className="space-y-1">
                    <div className="text-sm font-medium">Start date</div>
                    <input
                        type="date"
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                {/* Times */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <div className="text-sm font-medium">Start time</div>
                        <input
                            type="time"
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="text-sm font-medium">End time</div>
                        <input
                            type="time"
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={save}
                        disabled={
                            loading ||
                            days.length === 0 ||
                            startTime >= endTime
                        }
                    >
                        Save changes
                    </Button>
                </div>
            </div>
        </>
    );
}

function EditInstanceDialogBody({
    slot,
    onClose,
}: {
    slot: UISlot;
    onClose: () => void;
}) {
    const [startTime, setStartTime] = React.useState(slot.startTime);
    const [endTime, setEndTime] = React.useState(slot.endTime);
    const [loading, setLoading] = React.useState(false);

    async function save() {
        setLoading(true);

        await fetch(
            `/api/recurring-schedules/occurrence/${encodeURIComponent(slot.date)}?scheduleId=${slot.recurringScheduleId}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    startTime,
                    endTime,
                }),
            }
        );

        window.dispatchEvent(new Event("schedule-created"));
        setLoading(false);
        onClose();
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Edit this slot</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
                {/* Times */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <div className="text-sm font-medium">Start time</div>
                        <input
                            type="time"
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="text-sm font-medium">End time</div>
                        <input
                            type="time"
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={save}
                        disabled={loading || startTime >= endTime}
                    >
                        Save changes
                    </Button>
                </div>
            </div>
        </>
    );
}


function useDragSlot(onDrop: (slot: UISlot, newStartMinutes: number) => void) {

    const draggingRef = React.useRef<{
        slot: UISlot;
        startY: number;
        originalStartMinutes: number;
    } | null>(null);

    const [dragState, setDragState] = React.useState<{
        slotId: string; // `${recurringScheduleId}-${date}`
        startMinutes: number;
        endMinutes: number;
    } | null>(null);

    // need a ref to read latest dragState inside mouseup closure
    const dragStateRef = React.useRef(dragState);
    React.useEffect(() => {
        dragStateRef.current = dragState;
    }, [dragState]);

    const didDragRef = React.useRef(false);

    const onMouseDown = React.useCallback(
        (e: React.MouseEvent, slot: UISlot) => {
            e.stopPropagation();
            draggingRef.current = {
                slot,
                startY: e.clientY,
                originalStartMinutes: slot.startMinutes,
            };

            function onMouseMove(e: MouseEvent) {
                if (!draggingRef.current) return;
                didDragRef.current = true; // ← add this
                const { slot, startY, originalStartMinutes } = draggingRef.current;
                const duration = slot.endMinutes - slot.startMinutes;

                const deltaY = e.clientY - startY;
                const deltaMinutes = Math.round(deltaY / ROW_HEIGHT) * 30;

                let newStart = originalStartMinutes + deltaMinutes;
                // clamp to day bounds
                newStart = Math.max(0, Math.min(23 * 60 + 30 - duration, newStart));
                // snap to 30
                newStart = Math.round(newStart / 30) * 30;

                setDragState({
                    slotId: `${slot.recurringScheduleId}-${slot.date}`,
                    startMinutes: newStart,
                    endMinutes: newStart + duration,
                });
            }

            function onMouseUp() {
                if (!draggingRef.current || !dragStateRef.current) {
                    draggingRef.current = null;
                    setDragState(null);
                    window.removeEventListener("mousemove", onMouseMove);
                    window.removeEventListener("mouseup", onMouseUp);
                    return;
                }

                // read latest dragState via ref
                onDrop(draggingRef.current.slot, dragStateRef.current!.startMinutes);
                draggingRef.current = null;
                setDragState(null);
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
            }

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        },
        []
    );



    return { onMouseDown, dragState, didDragRef };
}

function minutesToTime(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
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
    exceptions: { date: string; startTime?: string; endTime?: string }[]; // ← add these
};

function getTimePart(d: string) {
    const date = new Date(d);
    return `${String(date.getUTCHours()).padStart(2, "0")}:${String(
        date.getUTCMinutes()
    ).padStart(2, "0")}`;
}

function timeToMinutes(t: string) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}


function dateToMinutes(d: string) {
    const dt = new Date(d);
    return dt.getUTCHours() * 60 + dt.getUTCMinutes();
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

        const defaultStartTime = getTimePart(sch.startTime);
        const defaultEndTime = getTimePart(sch.endTime);
        const defaultStartMinutes = dateToMinutes(sch.startTime);
        const defaultEndMinutes = dateToMinutes(sch.endTime);

        // Build a map of date string -> exception for quick lookup
        const exceptionMap = new Map(
            (sch.exceptions ?? []).map((e) => {
                // e.date is like "2026-02-26T00:00:00.000Z"
                // extract just the YYYY-MM-DD part in UTC
                const key = new Date(e.date).toISOString().slice(0, 10);
                return [key, e];
            })
        );

        const allowedDays = new Set(sch.days.map((d) => d.day));

        weekDates.forEach((date, idx) => {
            const weekdayEnum = WEEK_ENUM_BY_INDEX[idx];
            const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            if (!allowedDays.has(weekdayEnum)) return;
            if (date < schStart) return;
            if (schEnd && date > schEnd) return;

            const exception = exceptionMap.get(dayKey);

            // If exception exists but has NO override times → it's a deletion, skip
            if (exception && !exception.startTime && !exception.endTime) return;

            // Use override times if present, otherwise use schedule defaults
            const startTime = exception?.startTime
                ? getTimePart(exception.startTime)
                : defaultStartTime;
            const endTime = exception?.endTime
                ? getTimePart(exception.endTime)
                : defaultEndTime;
            const startMinutes = exception?.startTime
                ? dateToMinutes(exception.startTime)
                : defaultStartMinutes;
            const endMinutes = exception?.endTime
                ? dateToMinutes(exception.endTime)
                : defaultEndMinutes;

            result.push({
                recurringScheduleId: sch.id,
                day: DAYS[idx],
                date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`, // "2026-02-17"
                startTime,
                endTime,
                maxStudents: sch.maxStudents,
                startMinutes,
                endMinutes,
                students: [],
            });
        });
    }

    return result;
}

function mapDbSlotToUiSlot(slot: any): UISlot {
    const date = new Date(slot.startTime);

    const dayIndex = (date.getUTCDay() + 6) % 7; // Monday=0, using UTC
    const day = DAYS[dayIndex];

    const startTime = getTimePart(slot.startTime);
    const endTime = getTimePart(slot.endTime);

    return {
        recurringScheduleId: -1,
        day,
        date: `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`,
        startTime,
        endTime,
        maxStudents: slot.maxStudents,
        startMinutes: dateToMinutes(slot.startTime),
        endMinutes: dateToMinutes(slot.endTime),
        students: [],
    };
}





export default function SlotScheduler() {
    const [weekStart, setWeekStart] = React.useState(() =>
        getMonday(new Date())
    );

    const [schedules, setSchedules] = React.useState<RecurringScheduleDTO[]>([]);
    const [selectedSlot, setSelectedSlot] = React.useState<UISlot | null>(null);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [editInstanceOpen, setEditInstanceOpen] = React.useState(false);
    const [singleSlots, setSingleSlots] = React.useState<UISlot[]>([]);
    const [loadingSlotId, setLoadingSlotId] = React.useState<string | null>(null);

    React.useEffect(() => {
        fetch(`/api/slots?weekStart=${weekStart.toISOString()}`)
            .then(r => r.json())
            .then((rows) => {
                const mapped = rows.map(mapDbSlotToUiSlot);
                setSingleSlots(mapped);
            });
    }, [weekStart]);

    const slots = React.useMemo(() => {
        const generated = expandForWeek(schedules, weekStart);

        return [...generated, ...singleSlots];
    }, [schedules, weekStart, singleSlots]);


    function reloadAll() {
        fetch("/api/recurring-schedules")
            .then((r) => r.json())
            .then(setSchedules);

        fetch(`/api/slots?weekStart=${weekStart.toISOString()}`)
            .then(r => r.json())
            .then(rows => setSingleSlots(rows.map(mapDbSlotToUiSlot)));
    }

    React.useEffect(() => {
        reloadAll();

        window.addEventListener("schedule-created", reloadAll);
        return () => window.removeEventListener("schedule-created", reloadAll);
    }, [weekStart]);


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

    const schedulesById = React.useMemo(() => {
        return Object.fromEntries(
            schedules.map((s) => [s.id, s])
        );
    }, [schedules]);

    const { onMouseDown: onSlotMouseDown, dragState, didDragRef } = useDragSlot(
        async (slot, newStartMinutes) => {
            const slotId = `${slot.recurringScheduleId}-${slot.date}`;
            const duration = slot.endMinutes - slot.startMinutes;
            const newStart = minutesToTime(newStartMinutes);
            const newEnd = minutesToTime(newStartMinutes + duration);
            setLoadingSlotId(slotId); // ← add

            await fetch(
                `/api/recurring-schedules/occurrence/${encodeURIComponent(slot.date)}?scheduleId=${slot.recurringScheduleId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ startTime: newStart, endTime: newEnd }),
                }
            );

            window.dispatchEvent(new Event("schedule-created"));
            setLoadingSlotId(null); // ← add
        }
    );

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
                                        const slotId = `${s.recurringScheduleId}-${s.date}`;
                                        const isDragging = dragState?.slotId === slotId;
                                        const isLoading = loadingSlotId === slotId; // ← add

                                        const displayStart = isDragging ? dragState!.startMinutes : s.startMinutes;
                                        const displayEnd = isDragging ? dragState!.endMinutes : s.endMinutes;

                                        const top = (displayStart / 30) * ROW_HEIGHT;
                                        const height = ((displayEnd - displayStart) / 30) * ROW_HEIGHT;

                                        return (
                                            <div
                                                key={i}
                                                onMouseDown={(e) => onSlotMouseDown(e, s)}
                                                onClick={() => {
                                                    if (didDragRef.current) {
                                                        didDragRef.current = false;
                                                        return;
                                                    }
                                                    setSelectedSlot(s);
                                                }}
                                                className={[
                                                    "absolute left-1 right-1 rounded-md px-1 py-0.5",
                                                    "text-[10px] text-primary-foreground shadow-sm",
                                                    "pointer-events-auto cursor-grab",
                                                    isDragging
                                                        ? "bg-primary/60 opacity-80 cursor-grabbing"
                                                        : "bg-primary/90",
                                                ].join(" ")}
                                                style={{ top, height }}
                                            >
                                                <div className="font-medium">
                                                    {isLoading ? "Saving..." : `${minutesToTime(displayStart)} – ${minutesToTime(displayEnd)}`}
                                                </div>
                                                <div className="opacity-80">{s.maxStudents} students</div>
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
                        variant="secondary"
                        className="dark:bg-white dark:hover:bg-zinc-300 dark:text-black bg-black text-white"
                        onClick={() => setEditInstanceOpen(true)}
                    >
                        Edit Slot
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => setEditOpen(true)}
                    >
                        Edit schedule
                    </Button>

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

                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogContent className="sm:max-w-[420px]">
                            {selectedSlot && (
                                <EditRecurringDialogBody
                                    slot={selectedSlot}
                                    schedule={schedulesById[selectedSlot.recurringScheduleId]}
                                    onClose={() => setEditOpen(false)}
                                />

                            )}
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        open={editInstanceOpen}
                        onOpenChange={setEditInstanceOpen}
                    >
                        <DialogContent className="sm:max-w-[420px]">
                            {selectedSlot && (
                                <EditInstanceDialogBody
                                    slot={selectedSlot}
                                    onClose={() => setEditInstanceOpen(false)}
                                />
                            )}
                        </DialogContent>
                    </Dialog>




                </DialogContent>
            </Dialog>

        </div>
    );
}
