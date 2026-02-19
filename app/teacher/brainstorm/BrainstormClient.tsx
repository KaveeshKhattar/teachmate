"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { StudentSidebar } from "@/components/student-sidebar";
import { ScheduleCalendar } from "@/components/schedule-calendar";
import { makeAssignmentKey } from "@/lib/scheduler-utils";
import type { DayAssignment, ScheduleSlot, Student, WeekDay } from "@/types/scheduler";

interface BrainstormClientProps {
  students: Student[];
  schedules: ScheduleSlot[];
  initialAssignments: DayAssignment[];
}

export default function BrainstormClient({
  students,
  schedules,
  initialAssignments,
}: BrainstormClientProps) {
  const [assignments, setAssignments] = useState<Set<string>>(() => {
    const set = new Set<string>();
    initialAssignments.forEach(({ scheduleId, day, studentId }) => {
      set.add(makeAssignmentKey(scheduleId, day, studentId));
    });
    return set;
  });

  const [draggingStudentId, setDraggingStudentId] = useState<number | null>(null);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  const assignedCountMap = useMemo(() => {
    const map: Record<number, number> = {};
    assignments.forEach((key) => {
      const studentId = Number(key.split("_")[2]);
      map[studentId] = (map[studentId] ?? 0) + 1;
    });
    return map;
  }, [assignments]);

  const handleDragStart = useCallback((studentId: number) => {
    setDraggingStudentId(studentId);
  }, []);

  const handleTouchSelect = useCallback((studentId: number) => {
    setDraggingStudentId(studentId);
    setDragOverKey(null);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggingStudentId(null);
    setDragOverKey(null);
  }, []);

  const handleDragOver = useCallback((scheduleId: number, day: WeekDay) => {
    setDragOverKey(`${scheduleId}_${day}`);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverKey(null);
  }, []);

  const handleDrop = useCallback(
    async (scheduleId: number, day: WeekDay) => {
      setDragOverKey(null);

      if (!draggingStudentId) return;

      const student = students.find((s) => s.id === draggingStudentId);
      const schedule = schedules.find((s) => s.id === scheduleId);
      if (!student || !schedule) return;

      const key = makeAssignmentKey(scheduleId, day, draggingStudentId);

      if (assignments.has(key)) {
        toast.warning(`${student.user.firstName} is already in this slot`);
        setDraggingStudentId(null);
        return;
      }

      const currentCount = students.filter((s) =>
        assignments.has(makeAssignmentKey(scheduleId, day, s.id))
      ).length;

      if (currentCount >= schedule.maxStudents) {
        toast.error(`This slot is full (max ${schedule.maxStudents} students)`);
        setDraggingStudentId(null);
        return;
      }

      setAssignments((prev) => new Set([...prev, key]));
      setDraggingStudentId(null);

      try {
        const res = await fetch("/api/recurring-day-assignments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recurringScheduleId: scheduleId,
            day,
            studentId: draggingStudentId,
          }),
        });

        if (!res.ok) {
          const payload = await res.json().catch(() => null);
          setAssignments((prev) => {
            const next = new Set(prev);
            next.delete(key);
            return next;
          });
          toast.error(payload?.error ?? "Could not assign student");
          return;
        }

        toast.success(
          `${student.user.firstName} assigned to ${day} · ${schedule.label}`,
          { description: `${schedule.startTime}–${schedule.endTime}` }
        );
      } catch {
        setAssignments((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
        toast.error("Network error while assigning student");
      }
    },
    [assignments, draggingStudentId, schedules, students]
  );

  const handleRemove = useCallback(
    async (scheduleId: number, day: WeekDay, studentId: number) => {
      const key = makeAssignmentKey(scheduleId, day, studentId);
      setAssignments((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });

      const student = students.find((s) => s.id === studentId);

      try {
        const res = await fetch("/api/recurring-day-assignments", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recurringScheduleId: scheduleId,
            day,
            studentId,
          }),
        });

        if (!res.ok) {
          setAssignments((prev) => new Set([...prev, key]));
          const payload = await res.json().catch(() => null);
          toast.error(payload?.error ?? "Could not remove assignment");
          return;
        }

        if (student) {
          toast.info(`${student.user.firstName} removed from ${day} slot`);
        }
      } catch {
        setAssignments((prev) => new Set([...prev, key]));
        toast.error("Network error while removing assignment");
      }
    },
    [students]
  );

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background lg:flex-row">
      <StudentSidebar
        students={students}
        assignedCountMap={assignedCountMap}
        draggingStudentId={draggingStudentId}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTouchSelect={handleTouchSelect}
      />
      <ScheduleCalendar
        schedules={schedules}
        students={students}
        assignments={assignments}
        draggingStudentId={draggingStudentId}
        dragOverKey={dragOverKey}
        makeKey={makeAssignmentKey}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onRemove={handleRemove}
      />
    </div>
  );
}
