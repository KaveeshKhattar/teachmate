import React from "react";
import { expandForWeek, mapDbSlotToUiSlot } from "./utils";

export function useScheduler(weekStart: Date) {
    const [schedules, setSchedules] = React.useState<RecurringScheduleDTO[]>([]);
    const [recurringAssignments, setRecurringAssignments] = React.useState<RecurringDayAssignmentDTO[]>([]);
    const [singleSlots, setSingleSlots] = React.useState<UISlot[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const reloadAll = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const [nextSchedules, nextAssignments, nextSlots] = await Promise.all([
                fetch("/api/recurring-schedules").then((r) => r.json()),
                fetch("/api/recurring-day-assignments").then((r) => r.json()),
                fetch(`/api/slots?weekStart=${weekStart.toISOString()}`)
                    .then((r) => r.json())
                    .then((rows) => rows.map(mapDbSlotToUiSlot)),
            ]);

            setSchedules(nextSchedules);
            setRecurringAssignments(nextAssignments);
            setSingleSlots(nextSlots);
        } finally {
            setIsLoading(false);
        }
    }, [weekStart]);

    React.useEffect(() => {
        void reloadAll();
        window.addEventListener("schedule-created", reloadAll);
        return () => window.removeEventListener("schedule-created", reloadAll);
    }, [reloadAll]);

    const slots = React.useMemo(() => {
        const recurringSlots = expandForWeek(schedules, weekStart);
        const dayToEnum: Record<Day, RecurringDayAssignmentDTO["day"]> = {
            Monday: "MON",
            Tuesday: "TUE",
            Wednesday: "WED",
            Thursday: "THU",
            Friday: "FRI",
            Saturday: "SAT",
            Sunday: "SUN",
        };

        const assignmentMap = new Map<string, { id: number; name: string }[]>();
        recurringAssignments.forEach((assignment) => {
            const key = `${assignment.recurringScheduleId}_${assignment.day}`;
            const first = assignment.student.user.firstName ?? "";
            const last = assignment.student.user.lastName ?? "";
            const name = `${first} ${last}`.trim() || "Student";
            const current = assignmentMap.get(key) ?? [];
            current.push({ id: assignment.student.id, name });
            assignmentMap.set(key, current);
        });

        const recurringWithAssignments = recurringSlots.map((slot) => {
            const dayEnum = dayToEnum[slot.day];
            const key = `${slot.recurringScheduleId}_${dayEnum}`;
            return {
                ...slot,
                students: assignmentMap.get(key) ?? [],
            };
        });

        return [...recurringWithAssignments, ...singleSlots];
    }, [schedules, weekStart, recurringAssignments, singleSlots]);

    const schedulesById = React.useMemo(() =>
        Object.fromEntries(schedules.map(s => [s.id, s])),
        [schedules]
    );

    return { slots, schedules, schedulesById, setSchedules, setSingleSlots, reloadAll, isLoading };
}
