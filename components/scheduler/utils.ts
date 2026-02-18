function getTimePart(d: string) {
    const date = new Date(d);
    return `${String(date.getUTCHours()).padStart(2, "0")}:${String(
        date.getUTCMinutes()
    ).padStart(2, "0")}`;
}

function dateToMinutes(d: string) {
    const dt = new Date(d);
    return dt.getUTCHours() * 60 + dt.getUTCMinutes();
}

function minutesToTime(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
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

function format12h(time: string) {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
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


const DAYS: Day[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const TIMES = buildTimes();

const WEEK_ENUM_BY_INDEX = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;

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

function getDurationMinutes(start: string, end: string) {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    return (eh * 60 + em) - (sh * 60 + sm);
}

const ROW_HEIGHT = 40; // px per 30-min row

export {
    ROW_HEIGHT,
    DAYS,
    TIMES,
    WEEK_ENUM_BY_INDEX,
    getDurationMinutes,
    getTimePart,
    dateToMinutes,
    minutesToTime,
    getMonday,
    addDays,
    isSameDay,
    formatHeader,
    format12h,
    buildTimes,
    expandForWeek,
    mapDbSlotToUiSlot,
};