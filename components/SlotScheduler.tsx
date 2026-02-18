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
import { EditInstanceDialogBody, EditRecurringDialogBody } from "./scheduler/EditDialogs";
import { useScheduler } from "./scheduler/useScheduler";
import { getMonday, addDays, isSameDay, formatHeader, format12h, expandForWeek, mapDbSlotToUiSlot, minutesToTime, getDurationMinutes, DAYS, TIMES, ROW_HEIGHT, WEEK_ENUM_BY_INDEX } from "../components/scheduler/utils";
import { useDragSlot } from "./scheduler/useDragSlot";

export default function SlotScheduler({ readOnly = false }: { readOnly?: boolean }) {
    const [weekStart, setWeekStart] = React.useState(() =>
        getMonday(new Date())
    );

    // const [schedules, setSchedules] = React.useState<RecurringScheduleDTO[]>([]);
    const [selectedSlot, setSelectedSlot] = React.useState<UISlot | null>(null);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [editInstanceOpen, setEditInstanceOpen] = React.useState(false);

    const { slots, schedulesById, setSchedules, setSingleSlots } = useScheduler(weekStart);

    const [loadingSlotId, setLoadingSlotId] = React.useState<string | null>(null);
    const [pendingPositions, setPendingPositions] = React.useState<Record<string, { startMinutes: number; endMinutes: number }>>({});
    const [pendingDrag, setPendingDrag] = React.useState<{
        slot: UISlot;
        newStartMinutes: number;
    } | null>(null);
    const [dragScopeOpen, setDragScopeOpen] = React.useState(false);

    async function applyDrag(scope: "instance" | "all") {
        if (!pendingDrag) return;
        const { slot, newStartMinutes } = pendingDrag;
        const slotId = `${slot.recurringScheduleId}-${slot.date}`;
        const duration = slot.endMinutes - slot.startMinutes;
        const newStart = minutesToTime(newStartMinutes);
        const newEnd = minutesToTime(newStartMinutes + duration);

        setPendingPositions(p => ({
            ...p,
            [slotId]: { startMinutes: newStartMinutes, endMinutes: newStartMinutes + duration }
        }));
        setLoadingSlotId(slotId);
        setDragScopeOpen(false);
        setPendingDrag(null);

        if (scope === "instance") {
            await fetch(
                `/api/recurring-schedules/occurrence/${encodeURIComponent(slot.date)}?scheduleId=${slot.recurringScheduleId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ startTime: newStart, endTime: newEnd }),
                }
            );
        } else {
            await fetch("/api/recurring-schedules", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    scheduleId: slot.recurringScheduleId,
                    startTime: newStart,
                    endTime: newEnd,
                    // need to preserve existing days/startDate — get from schedulesById
                    startDate: schedulesById[slot.recurringScheduleId].startDate.slice(0, 10),
                    days: schedulesById[slot.recurringScheduleId].days.map(d => d.day),
                }),
            });
        }

        await Promise.all([
            fetch("/api/recurring-schedules").then(r => r.json()).then(setSchedules),
            fetch(`/api/slots?weekStart=${weekStart.toISOString()}`).then(r => r.json()).then(rows => setSingleSlots(rows.map(mapDbSlotToUiSlot)))
        ]);

        setLoadingSlotId(null);
        setPendingPositions(p => { const n = { ...p }; delete n[slotId]; return n; });
    }

    React.useEffect(() => {
        fetch(`/api/slots?weekStart=${weekStart.toISOString()}`)
            .then(r => r.json())
            .then((rows) => {
                const mapped = rows.map(mapDbSlotToUiSlot);
                setSingleSlots(mapped);
            });
    }, [weekStart]);

    const weekDays = DAYS.map((_: Day, i: number) => addDays(weekStart, i));
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

    const { onMouseDown: onSlotMouseDown, dragState, didDragRef } = useDragSlot(
        (slot, newStartMinutes) => {
            setPendingDrag({ slot, newStartMinutes });
            setDragScopeOpen(true);
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
                                        const pending = pendingPositions[slotId];
                                        const displayStart = isDragging ? dragState!.startMinutes : pending ? pending.startMinutes : s.startMinutes;
                                        const displayEnd = isDragging ? dragState!.endMinutes : pending ? pending.endMinutes : s.endMinutes;

                                        const top = (displayStart / 30) * ROW_HEIGHT;
                                        const height = ((displayEnd - displayStart) / 30) * ROW_HEIGHT;

                                        return (
                                            <div
                                                key={i}
                                                onMouseDown={readOnly ? undefined : (e) => onSlotMouseDown(e, s)}
                                                onClick={() => {
                                                    if (!readOnly && didDragRef.current) {
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

                    {!readOnly && (
                        <>
                            <Button
                                variant="secondary"
                                className="dark:bg-white dark:text-black bg-black text-white"
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
                        </>
                    )}


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
                                <EditRecurringDialogBody slot={selectedSlot}
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

            <AlertDialog open={dragScopeOpen} onOpenChange={(o) => {
                if (!o) {
                    setPendingDrag(null);
                    setDragScopeOpen(false);
                }
            }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Move slot</AlertDialogTitle>
                        <AlertDialogDescription>
                            Do you want to move just this occurrence or all slots in this schedule?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button variant="outline" onClick={() => applyDrag("instance")}>
                            Just this one
                        </Button>
                        <Button onClick={() => applyDrag("all")}>
                            All slots
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}
