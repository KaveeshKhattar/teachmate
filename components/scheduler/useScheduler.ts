import React from "react";
import { expandForWeek, mapDbSlotToUiSlot } from "./utils";

export function useScheduler(weekStart: Date) {
    const [schedules, setSchedules] = React.useState<RecurringScheduleDTO[]>([]);
    const [singleSlots, setSingleSlots] = React.useState<UISlot[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const reloadAll = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const [nextSchedules, nextSlots] = await Promise.all([
                fetch("/api/recurring-schedules").then((r) => r.json()),
                fetch(`/api/slots?weekStart=${weekStart.toISOString()}`)
                    .then((r) => r.json())
                    .then((rows) => rows.map(mapDbSlotToUiSlot)),
            ]);

            setSchedules(nextSchedules);
            setSingleSlots(nextSlots);
        } finally {
            setIsLoading(false);
        }
    }, [weekStart]);

    React.useEffect(() => {
        void reloadAll();
    }, [reloadAll]);

    const slots = React.useMemo(() => {
        const recurringSlots = expandForWeek(schedules, weekStart);
        return [...recurringSlots, ...singleSlots];
    }, [schedules, weekStart, singleSlots]);

    const schedulesById = React.useMemo(() =>
        Object.fromEntries(schedules.map(s => [s.id, s])),
        [schedules]
    );

    const updateSchedules = React.useCallback(
        (updater: (current: RecurringScheduleDTO[]) => RecurringScheduleDTO[]) => {
            setSchedules((current) => updater(current));
        },
        []
    );

    return { slots, schedulesById, updateSchedules, reloadAll, isLoading };
}
