"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Student } from "@/types/scheduler";
import { getAvatarColor, getInitials } from "@/lib/scheduler-utils";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: Student;
  index: number;
  assignedCount: number;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onTouchSelect: () => void;
}

export function StudentCard({
  student,
  index,
  assignedCount,
  isDragging,
  onDragStart,
  onDragEnd,
  onTouchSelect,
}: StudentCardProps) {
  const target = student.numOfClassesPerWeek ?? 0;
  const isMet = target > 0 && assignedCount >= target;
  const isOver = target > 0 && assignedCount > target;
  const firstName = student.user.firstName ?? "";
  const lastName = student.user.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim() || "Student";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onPointerDown={(e) => {
            if (e.pointerType === "touch") {
              onTouchSelect();
            }
          }}
          className={cn(
            "flex items-center gap-3 p-3 cursor-grab select-none transition-all duration-150",
            "hover:shadow-md hover:border-border/80 active:cursor-grabbing",
            isDragging && "opacity-50 scale-95 ring-2 ring-primary/40"
          )}
        >
          {/* Drag handle */}
          <GripVertical className="h-4 w-4 text-muted-foreground/40 flex-shrink-0" />

          {/* Avatar */}
          <div
            className={cn(
              "h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0",
              getAvatarColor(index)
            )}
          >
            {getInitials(student)}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              {fullName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {student.grade} · {student.school}
            </p>
          </div>

          {/* Assignment counter */}
          <Badge
            variant="secondary"
            className={cn(
              "flex-shrink-0 text-xs font-semibold tabular-nums",
              isMet && !isOver && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
              isOver && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            )}
          >
            {assignedCount}/{target || "?"}
          </Badge>
        </Card>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p className="font-medium">{fullName}</p>
        <p className="text-xs text-muted-foreground">{student.school} · Grade {student.grade}</p>
        <p className="text-xs mt-1">{assignedCount} of {target || "?"} weekly slots assigned</p>
      </TooltipContent>
    </Tooltip>
  );
}
