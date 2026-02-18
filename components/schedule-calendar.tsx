"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { SlotCell } from "@/components/slot-cell";
import type { ScheduleSlot, Student, WeekDay } from "@/types/scheduler";
import { WEEKDAYS, DAY_SHORT, SLOT_COLORS } from "@/lib/scheduler-utils";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";

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
  const getAssignedStudents = (scheduleId: number, day: WeekDay): Student[] => {
    return students.filter((s) => assignments.has(makeKey(scheduleId, day, s.id)));
  };

  const isDragOver = (scheduleId: number, day: WeekDay): boolean =>
    dragOverKey === `${scheduleId}_${day}`;

  // Only show days that have at least one schedule
  const activeDays = WEEKDAYS.filter((day) =>
    schedules.some((s) => s.days.includes(day))
  );

  return (
    <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
      {/* Toolbar */}
      <div className="px-5 py-4 border-b flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Weekly Schedule
          </span>
        </div>
        {/* Legend */}
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
      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Day header row */}
          <div
            className="grid gap-3 mb-3"
            style={{ gridTemplateColumns: `repeat(${activeDays.length}, minmax(0, 1fr))` }}
          >
            {activeDays.map((day) => (
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
              style={{ gridTemplateColumns: `repeat(${activeDays.length}, minmax(0, 1fr))` }}
            >
              {activeDays.map((day) => {
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
      </ScrollArea>
    </div>
  );
}
