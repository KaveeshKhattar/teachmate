import React from "react";
import { expandForWeek, mapDbSlotToUiSlot } from "./utils";

export function useScheduler(weekStart: Date) {
    const [schedules, setSchedules] = React.useState<RecurringScheduleDTO[]>([]);
    const [singleSlots, setSingleSlots] = React.useState<UISlot[]>([]);

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

    const slots = React.useMemo(() =>
        [...expandForWeek(schedules, weekStart), ...singleSlots],
        [schedules, weekStart, singleSlots]
    );

    const schedulesById = React.useMemo(() =>
        Object.fromEntries(schedules.map(s => [s.id, s])),
        [schedules]
    );

    return { slots, schedules, schedulesById, setSchedules, setSingleSlots, reloadAll };
}