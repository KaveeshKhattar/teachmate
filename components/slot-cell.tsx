"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ScheduleSlot, Student } from "@/types/scheduler";
import { getAvatarColor, getInitials, SLOT_COLORS } from "@/lib/scheduler-utils";
import { X, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlotCellProps {
  schedule: ScheduleSlot;
  assignedStudents: Student[];
  allStudents: Student[];
  isDragOver: boolean;
  isDraggingActive: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: () => void;
  onRemove: (studentId: number) => void;
}

export function SlotCell({
  schedule,
  assignedStudents,
  allStudents,
  isDragOver,
  isDraggingActive,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemove,
}: SlotCellProps) {
  const colors = SLOT_COLORS[schedule.color];
  const isFull = assignedStudents.length >= schedule.maxStudents;
  const spotsLeft = schedule.maxStudents - assignedStudents.length;

  return (
    <Card
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => {
        if (isDraggingActive) {
          onDrop();
        }
      }}
      className={cn(
        "p-2.5 transition-all duration-150 border",
        colors.border,
        isDragOver && !isFull && colors.glow,
        isDragOver && isFull && "border-destructive/50 ring-1 ring-destructive/30",
        isDraggingActive && !isFull && "border-dashed",
      )}
    >
      {/* Time header */}
      <div className="flex items-start gap-2 mb-2">
        <div className={cn("w-0.5 rounded-full flex-shrink-0 mt-0.5", colors.bar)} style={{ height: "2.25rem" }} />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold leading-tight text-foreground">
            {schedule.startTime}–{schedule.endTime}
          </p>
          <p className="text-[10px] text-muted-foreground leading-tight truncate">
            {schedule.label}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <Users className="h-2.5 w-2.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">
              {assignedStudents.length}/{schedule.maxStudents}
            </span>
            {isFull && (
              <Badge variant="secondary" className="text-[9px] py-0 px-1 h-3.5 leading-none">Full</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Assigned students */}
      <div className="space-y-1">
        {assignedStudents.map((student) => {
          const idx = allStudents.findIndex((s) => s.id === student.id);
          return (
            <Tooltip key={student.id}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-1.5 py-1 group",
                    colors.chip
                  )}
                >
                  <div
                    className={cn(
                      "h-4 w-4 rounded flex-shrink-0 flex items-center justify-center text-[8px] font-bold",
                      getAvatarColor(idx)
                    )}
                  >
                    {getInitials(student)}
                  </div>
                  <span className="text-[11px] font-medium flex-1 truncate">
                    {student.user.firstName}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(student.id);
                    }}
                  >
                    <X className="h-2.5 w-2.5" />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{student.user.firstName} {student.user.lastName}</p>
                <p className="text-xs text-muted-foreground">Click × to unassign</p>
              </TooltipContent>
            </Tooltip>
          );
        })}

        {/* Drop zone */}
        {!isFull && (
          <div
            className={cn(
              "rounded-md border border-dashed px-1.5 py-1.5 text-center transition-all duration-150",
              isDragOver
                ? "border-foreground/40 bg-muted/50"
                : "border-muted-foreground/20",
              !isDraggingActive && "opacity-0"
            )}
          >
            <p className={cn("text-[10px]", isDragOver ? "text-foreground" : "text-muted-foreground")}>
              {isDragOver ? `Drop to assign` : `${spotsLeft} spot${spotsLeft > 1 ? "s" : ""} left`}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
