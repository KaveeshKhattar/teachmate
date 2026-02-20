import React from "react";
import {
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DAYS } from "./utils";

export function EditRecurringDialogBody({
    slot,
    schedule,
    onSaved,
    onClose,
}: {
    slot: UISlot;
    schedule: RecurringScheduleDTO;
    onSaved?: () => void | Promise<void>;
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
    }, [schedule]);

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

        await onSaved?.();
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

export function EditInstanceDialogBody({
    slot,
    onSaved,
    onClose,
}: {
    slot: UISlot;
    onSaved?: () => void | Promise<void>;
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

        await onSaved?.();
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
