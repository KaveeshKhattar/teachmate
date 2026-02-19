"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SlotCell } from "@/components/slot-cell";
import type { ScheduleSlot, Student, WeekDay } from "@/types/scheduler";
import { WEEKDAYS, DAY_SHORT, SLOT_COLORS } from "@/lib/scheduler-utils";
import { cn } from "@/lib/utils";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface ScheduleCalendarProps {
  schedules: ScheduleSlot[];
  students: Student[];
  assignments: Set<string>;
  draggingStudentId: number | null;
  dragOverKey: string | null;
  makeKey: (scheduleId: number, day: WeekDay, studentId: number) => string;
  onDragOver: (scheduleId: number, day: WeekDay) => void;
  onDragLeave: () => void;
  onDrop: (scheduleId: number, day: WeekDay) => void;
  onRemove: (scheduleId: number, day: WeekDay, studentId: number) => void;
}

export function ScheduleCalendar({
  schedules,
  students,
  assignments,
  draggingStudentId,
  dragOverKey,
  makeKey,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemove,
}: ScheduleCalendarProps) {
  type ViewMode = "ONE_DAY" | "THREE_DAYS" | "WEEK";
  const getAssignedStudents = (scheduleId: number, day: WeekDay): Student[] => {
    return students.filter((s) => assignments.has(makeKey(scheduleId, day, s.id)));
  };

  const isDragOver = (scheduleId: number, day: WeekDay): boolean =>
    dragOverKey === `${scheduleId}_${day}`;

  // Only show days that have at least one schedule
  const activeDays = WEEKDAYS.filter((day) =>
    schedules.some((s) => s.days.includes(day))
  );

  const [viewMode, setViewMode] = useState<ViewMode>("WEEK");
  const [startIndex, setStartIndex] = useState(0);

  const visibleDayCount = useMemo(() => {
    if (viewMode === "ONE_DAY") return 1;
    if (viewMode === "THREE_DAYS") return 3;
    return activeDays.length;
  }, [activeDays.length, viewMode]);

  const maxStartIndex = Math.max(0, activeDays.length - visibleDayCount);

  const clampedStartIndex = Math.min(startIndex, maxStartIndex);

  const visibleDays =
    viewMode === "WEEK"
      ? activeDays
      : activeDays.slice(clampedStartIndex, clampedStartIndex + visibleDayCount);

  const rangeLabel =
    visibleDays.length > 1
      ? `${DAY_SHORT[visibleDays[0]]} - ${DAY_SHORT[visibleDays[visibleDays.length - 1]]}`
      : visibleDays.length === 1
        ? DAY_SHORT[visibleDays[0]]
        : "No days";

  if (activeDays.length === 0) {
    return (
      <div className="flex min-w-0 flex-1 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        No recurring schedule days found. Create or enable schedule days to start assigning students.
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
      {/* Toolbar */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b px-3 py-3 sm:px-5 sm:py-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Schedule View
          </span>
          <Badge variant="outline" className="text-[10px]">
            {rangeLabel}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center rounded-md border bg-background p-1">
            <Button
              size="sm"
              variant={viewMode === "ONE_DAY" ? "default" : "ghost"}
              className="h-7 px-2 text-xs"
              onClick={() => setViewMode("ONE_DAY")}
            >
              1 day
            </Button>
            <Button
              size="sm"
              variant={viewMode === "THREE_DAYS" ? "default" : "ghost"}
              className="h-7 px-2 text-xs"
              onClick={() => setViewMode("THREE_DAYS")}
            >
              3 days
            </Button>
            <Button
              size="sm"
              variant={viewMode === "WEEK" ? "default" : "ghost"}
              className="h-7 px-2 text-xs"
              onClick={() => setViewMode("WEEK")}
            >
              Week
            </Button>
          </div>

          {viewMode !== "WEEK" ? (
            <div className="inline-flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() =>
                  setStartIndex((prev) => Math.max(0, Math.min(maxStartIndex, prev) - 1))
                }
                disabled={clampedStartIndex <= 0}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() =>
                  setStartIndex((prev) => Math.min(maxStartIndex, Math.min(maxStartIndex, prev) + 1))
                }
                disabled={clampedStartIndex >= maxStartIndex}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {schedules.map((s) => {
            const c = SLOT_COLORS[s.color];
            return (
              <Badge key={s.id} variant="secondary" className={cn("text-xs gap-1.5", c.badge)}>
                <span className={cn("inline-block h-1.5 w-1.5 rounded-full", c.bar)} />
                {s.label}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-3 sm:p-4">
          <div
            className="min-w-[320px]"
            style={{ minWidth: `${Math.max(320, visibleDays.length * 180)}px` }}
          >
          {/* Day header row */}
          <div
            className="grid gap-3 mb-3"
            style={{ gridTemplateColumns: `repeat(${visibleDays.length}, minmax(0, 1fr))` }}
          >
            {visibleDays.map((day) => (
              <div
                key={day}
                className="text-center py-2 rounded-lg bg-muted/40"
              >
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {DAY_SHORT[day]}
                </span>
              </div>
            ))}
          </div>

          {/* Slot rows — one row per unique time band */}
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="grid gap-3 mb-3"
              style={{ gridTemplateColumns: `repeat(${visibleDays.length}, minmax(0, 1fr))` }}
            >
              {visibleDays.map((day) => {
                const hasSlot = schedule.days.includes(day);

                if (!hasSlot) {
                  return (
                    <div
                      key={day}
                      className="rounded-lg border border-dashed border-muted/40 min-h-[80px]"
                    />
                  );
                }

                return (
                  <SlotCell
                    key={day}
                    schedule={schedule}
                    assignedStudents={getAssignedStudents(schedule.id, day)}
                    allStudents={students}
                    isDragOver={isDragOver(schedule.id, day)}
                    isDraggingActive={draggingStudentId !== null}
                    onDragOver={(e) => {
                      e.preventDefault();
                      onDragOver(schedule.id, day);
                    }}
                    onDragLeave={onDragLeave}
                    onDrop={() => onDrop(schedule.id, day)}
                    onRemove={(studentId) => onRemove(schedule.id, day, studentId)}
                  />
                );
              })}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
