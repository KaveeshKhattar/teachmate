"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { StudentCard } from "@/components/student-card";
import type { Student } from "@/types/scheduler";

import { GraduationCap } from "lucide-react";

interface StudentSidebarProps {
  students: Student[];
  assignedCountMap: Record<number, number>;
  draggingStudentId: number | null;
  onDragStart: (studentId: number) => void;
  onDragEnd: () => void;
  onTouchSelect: (studentId: number) => void;
}

export function StudentSidebar({
  students,
  assignedCountMap,
  draggingStudentId,
  onDragStart,
  onDragEnd,
  onTouchSelect,
}: StudentSidebarProps) {
  const fullyScheduled = students.filter((s) => {
    const count = assignedCountMap[s.id] ?? 0;
    return s.numOfClassesPerWeek && count >= s.numOfClassesPerWeek;
  }).length;

  return (
    <div className="w-full shrink-0 border-b bg-muted/20 lg:w-72 lg:border-r lg:border-b-0">
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Students
          </span>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{students.length} enrolled</h2>
          <Badge variant="outline" className="text-xs">
            {fullyScheduled}/{students.length} scheduled
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Drag a student card onto a slot, or tap a card then tap a slot on touch devices.
        </p>
      </div>

      <Separator />

      {/* Student list */}
      <ScrollArea className="max-h-[40vh] lg:max-h-none lg:flex-1">
        <div className="p-3 space-y-2">
          {students.map((student, index) => (
            <StudentCard
              key={student.id}
              student={student}
              index={index}
              assignedCount={assignedCountMap[student.id] ?? 0}
              isDragging={draggingStudentId === student.id}
              onDragStart={() => onDragStart(student.id)}
              onDragEnd={onDragEnd}
              onTouchSelect={() => onTouchSelect(student.id)}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer hint */}
      <Separator />
      <div className="p-3 text-center">
        <p className="text-xs text-muted-foreground">
          {draggingStudentId
            ? "Drop or tap a slot to assign"
            : "Grab a card to start assigning"}
        </p>
      </div>
    </div>
  );
}
