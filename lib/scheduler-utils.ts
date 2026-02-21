import type { Student, WeekDay } from "@/types/scheduler";

export const WEEKDAYS: WeekDay[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const DAY_LABELS: Record<WeekDay, string> = {
  MON: "Monday",
  TUE: "Tuesday",
  WED: "Wednesday",
  THU: "Thursday",
  FRI: "Friday",
  SAT: "Saturday",
  SUN: "Sunday",
};

export const DAY_SHORT: Record<WeekDay, string> = {
  MON: "Mon", TUE: "Tue", WED: "Wed",
  THU: "Thu", FRI: "Fri", SAT: "Sat", SUN: "Sun",
};

export const SLOT_COLORS = {
  blue:    { badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",    bar: "bg-blue-500",    border: "border-blue-500/30",  glow: "border-blue-400 ring-1 ring-blue-400/30", chip: "bg-blue-50 dark:bg-blue-950/50" },
  violet:  { badge: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300", bar: "bg-violet-500", border: "border-violet-500/30", glow: "border-violet-400 ring-1 ring-violet-400/30", chip: "bg-violet-50 dark:bg-violet-950/50" },
  emerald: { badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", bar: "bg-emerald-500", border: "border-emerald-500/30", glow: "border-emerald-400 ring-1 ring-emerald-400/30", chip: "bg-emerald-50 dark:bg-emerald-950/50" },
  amber:   { badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",   bar: "bg-amber-500",   border: "border-amber-500/30",  glow: "border-amber-400 ring-1 ring-amber-400/30", chip: "bg-amber-50 dark:bg-amber-950/50" },
} as const;

export const AVATAR_COLORS = [
  "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
];

export function getInitials(student: Student): string {
  const firstInitial = student.user.firstName?.trim()?.[0] ?? "";
  const lastInitial = student.user.lastName?.trim()?.[0] ?? "";
  return (firstInitial + lastInitial).toUpperCase() || "S";
}

export function getAvatarColor(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export function makeAssignmentKey(scheduleId: number, day: WeekDay, studentId: number): string {
  return `${scheduleId}_${day}_${studentId}`;
}
