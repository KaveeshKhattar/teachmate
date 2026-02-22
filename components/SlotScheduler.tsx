"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AddSlotDialog from "./AddSlotDialog";
import { Badge } from "@/components/ui/badge";

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
import { SchedulerSkeleton } from "@/components/dashboard-loading";
import { EditInstanceDialogBody, EditRecurringDialogBody } from "./scheduler/EditDialogs";
import { useScheduler } from "./scheduler/useScheduler";
import { getMonday, addDays, isSameDay, formatHeader, format12h, minutesToTime, getDurationMinutes, DAYS, TIMES, ROW_HEIGHT } from "../components/scheduler/utils";
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

    const { slots, schedulesById, updateSchedules, reloadAll, isLoading } = useScheduler(weekStart);

    const [loadingSlotId, setLoadingSlotId] = React.useState<string | null>(null);
    const [pendingPositions, setPendingPositions] = React.useState<Record<string, { startMinutes: number; endMinutes: number }>>({});
    const [pendingDrag, setPendingDrag] = React.useState<{
        slot: UISlot;
        newStartMinutes: number;
    } | null>(null);
    const [dragScopeOpen, setDragScopeOpen] = React.useState(false);
    const [dragError, setDragError] = React.useState<string | null>(null);

    async function applyDrag(scope: "instance" | "all") {
        if (!pendingDrag) return;
        const { slot, newStartMinutes } = pendingDrag;
        const slotId = `${slot.recurringScheduleId}-${slot.date}`;
        const duration = slot.endMinutes - slot.startMinutes;
        const newStart = minutesToTime(newStartMinutes);
        const newEnd = minutesToTime(newStartMinutes + duration);
        const targetSchedule = schedulesById[slot.recurringScheduleId];

        if (!targetSchedule) {
            setDragError("Unable to find this schedule. Please refresh and try again.");
            return;
        }

        setDragError(null);
        setPendingPositions(p => ({
            ...p,
            [slotId]: { startMinutes: newStartMinutes, endMinutes: newStartMinutes + duration }
        }));
        setLoadingSlotId(slotId);
        setDragScopeOpen(false);
        setPendingDrag(null);

        try {
            if (scope === "instance") {
                const response = await fetch(
                    `/api/recurring-schedules/occurrence/${encodeURIComponent(slot.date)}?scheduleId=${slot.recurringScheduleId}`,
                    {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ startTime: newStart, endTime: newEnd }),
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to update this occurrence");
                }

                const updatedException = await response.json();
                const normalizedDateKey = new Date(updatedException.date).toISOString().slice(0, 10);

                updateSchedules((current) =>
                    current.map((schedule) => {
                        if (schedule.id !== slot.recurringScheduleId) return schedule;

                        const existingExceptions = schedule.exceptions ?? [];
                        const remaining = existingExceptions.filter(
                            (exception) =>
                                new Date(exception.date).toISOString().slice(0, 10) !== normalizedDateKey
                        );

                        return {
                            ...schedule,
                            exceptions: [...remaining, updatedException],
                        };
                    })
                );
            } else {
                const response = await fetch("/api/recurring-schedules", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        scheduleId: slot.recurringScheduleId,
                        startTime: newStart,
                        endTime: newEnd,
                        startDate: targetSchedule.startDate.slice(0, 10),
                        days: targetSchedule.days.map(d => d.day),
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to update this recurring schedule");
                }

                const scheduleDate = targetSchedule.startDate.slice(0, 10);

                updateSchedules((current) =>
                    current.map((schedule) => {
                        if (schedule.id !== slot.recurringScheduleId) return schedule;

                        return {
                            ...schedule,
                            startTime: new Date(`${scheduleDate}T${newStart}:00Z`).toISOString(),
                            endTime: new Date(`${scheduleDate}T${newEnd}:00Z`).toISOString(),
                        };
                    })
                );
            }
        } catch (error) {
            console.error("Failed to apply drag update", error);
            setDragError("Could not save this change. The slot was restored.");
        } finally {
            setLoadingSlotId(null);
            setPendingPositions(p => { const n = { ...p }; delete n[slotId]; return n; });
        }
    }

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

    if (isLoading && slots.length === 0) {
        return <SchedulerSkeleton />;
    }
    
    return (
        <div className="space-y-4">
            {/* toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2">
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
                {!readOnly ? <AddSlotDialog onCreated={reloadAll} /> : null}

            </div>
            {dragError ? (
                <p className="text-sm text-destructive">{dragError}</p>
            ) : null}

            {/* calendar */}
            <div className="overflow-x-auto rounded-lg border bg-background">
                <div className="min-w-[760px]">
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
                <div className="relative max-h-[550px] overflow-y-auto">
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

                            {DAYS.map((day) => (
                                <div key={day} className="relative">
                                    {slotsByDay[day].map((s, i) => {
                                        const slotId = `${s.recurringScheduleId}-${s.date}`;
                                        const isDragging = dragState?.slotId === slotId;
                                        const isLoading = loadingSlotId === slotId; // ← add
                                        const pending = pendingPositions[slotId];
                                        const displayStart = isDragging ? dragState!.startMinutes : pending ? pending.startMinutes : s.startMinutes;
                                        const displayEnd = isDragging ? dragState!.endMinutes : pending ? pending.endMinutes : s.endMinutes;
                                        const fillRatio = Math.min(1, s.students.length / Math.max(1, s.maxStudents));
                                        const isNearCapacity = fillRatio >= 0.8;
                                        const isFull = s.students.length >= s.maxStudents;

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
                                                    "absolute left-1 right-1 rounded-md border px-1.5 py-1",
                                                    "text-[10px] shadow-sm transition-colors",
                                                    "pointer-events-auto",
                                                    readOnly ? "cursor-pointer" : "cursor-grab",
                                                    isDragging
                                                        ? "bg-primary/25 border-primary/40 text-foreground opacity-90 cursor-grabbing"
                                                        : isNearCapacity
                                                            ? "bg-amber-500/15 border-amber-500/40 text-foreground"
                                                            : "bg-primary/15 border-primary/35 text-foreground",
                                                ].join(" ")}
                                                style={{ top, height }}
                                            >
                                                <div className="mb-1 flex items-center justify-between gap-1">
                                                    <div className="font-semibold tracking-tight">
                                                    {isLoading ? "Saving..." : `${minutesToTime(displayStart)} – ${minutesToTime(displayEnd)}`}
                                                    </div>
                                                    <Badge
                                                        variant="secondary"
                                                        className={[
                                                            "h-4 px-1.5 text-[9px] tabular-nums",
                                                            isFull ? "bg-destructive/15 text-destructive" : "",
                                                        ].join(" ")}
                                                    >
                                                        {s.students.length}/{s.maxStudents}
                                                    </Badge>
                                                </div>

                                                <div className="h-1 w-full overflow-hidden rounded-full bg-muted/60">
                                                    <div
                                                        className={[
                                                            "h-full rounded-full transition-all",
                                                            isFull ? "bg-destructive/80" : isNearCapacity ? "bg-amber-500/80" : "bg-primary/80",
                                                        ].join(" ")}
                                                        style={{ width: `${Math.max(6, Math.round(fillRatio * 100))}%` }}
                                                    />
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

                <DialogContent className="sm:max-w-[520px]">
                    {selectedSlot && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    Slot details
                                    <Badge variant="outline">{selectedSlot.day}</Badge>
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4 text-sm">
                                <div className="grid gap-2 sm:grid-cols-3">
                                    <div className="rounded-md border bg-muted/30 p-2">
                                        <p className="text-xs text-muted-foreground">Date</p>
                                        <p className="font-medium">
                                            {new Date(selectedSlot.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="rounded-md border bg-muted/30 p-2">
                                        <p className="text-xs text-muted-foreground">Time</p>
                                        <p className="font-medium">
                                            {selectedSlot.startTime} – {selectedSlot.endTime}
                                        </p>
                                    </div>
                                    <div className="rounded-md border bg-muted/30 p-2">
                                        <p className="text-xs text-muted-foreground">Duration</p>
                                        <p className="font-medium">
                                            {getDurationMinutes(
                                                selectedSlot.startTime,
                                                selectedSlot.endTime
                                            )} minutes
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-md border p-3">
                                    <div className="mb-2 flex items-center justify-between">
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                            Students assigned
                                        </p>
                                        <Badge variant="secondary">
                                            {selectedSlot.students.length}/{selectedSlot.maxStudents}
                                        </Badge>
                                    </div>

                                    {selectedSlot.students.length === 0 ? (
                                        <p className="text-sm italic text-muted-foreground">
                                            No students assigned
                                        </p>
                                    ) : (
                                        <div className="flex max-h-36 flex-wrap gap-1.5 overflow-y-auto pr-1">
                                            {selectedSlot.students.map((s) => (
                                                <Badge key={s.id} variant="outline" className="rounded-full px-2 py-1">
                                                    {s.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {!readOnly && (
                        <div className="grid gap-2 sm:grid-cols-3">
                            <Button
                                variant="secondary"
                                className="dark:bg-white dark:text-black bg-black text-white"
                                onClick={() => setEditInstanceOpen(true)}
                            >
                                Edit this slot
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={() => setEditOpen(true)}
                            >
                                Edit recurring
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={() => setDeleteOpen(true)}
                            >
                                Delete
                            </Button>
                        </div>
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
                                        await reloadAll();
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
                                        await reloadAll();
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
                                    onSaved={reloadAll}
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
                                    onSaved={reloadAll}
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
