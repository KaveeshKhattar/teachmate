"use client"

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import React from "react"

type WeekDay = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN"

type Student = {
  id: number
  name: string
}

type Assignment = {
  studentId: number
  day: WeekDay
}

const days: WeekDay[] = ["MON", "WED", "FRI"]

// --------------------
// Draggable student
// --------------------
function DraggableStudent({ student }: { student: Student }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `student-${student.id}`,
      data: {
        studentId: student.id,
      },
    })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "cursor-grab rounded-md border bg-background px-3 py-1 text-sm",
        isDragging && "opacity-50"
      )}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      {student.name}
    </div>
  )
}

// --------------------
// Droppable day column
// --------------------
function DayColumn({
  day,
  assignments,
  studentsById,
}: {
  day: WeekDay
  assignments: Assignment[]
  studentsById: Map<number, Student>
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `day-${day}`,
    data: { day },
  })

  return (
    <Card
      ref={setNodeRef}
      className={cn(isOver && "ring-2 ring-primary")}
    >
      <CardHeader className="py-3">
        <CardTitle className="text-sm">{day}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        {assignments.map((a) => (
          <Badge key={a.studentId} variant="secondary">
            {studentsById.get(a.studentId)?.name}
          </Badge>
        ))}

        {assignments.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Drop student here
          </p>
        )}
      </CardContent>
    </Card>
  )
}

// --------------------
// Main board
// --------------------
export function RecurringAssignmentBoard() {
  const recurringScheduleId = 5

  const students: Student[] = [
    { id: 1, name: "Aarav" },
    { id: 2, name: "Riya" },
    { id: 3, name: "Kabir" },
  ]

  const studentsById = new Map(students.map((s) => [s.id, s]))

  const [assignments, setAssignments] = React.useState<Assignment[]>([
    { studentId: 1, day: "MON" },
  ])

  async function handleDrop(studentId: number, day: WeekDay) {
    // optimistic UI
    setAssignments((prev) => [
      ...prev,
      { studentId, day },
    ])

    await fetch("/api/recurring-day-assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recurringScheduleId,
        studentId,
        day,
      }),
    })
  }

  return (
    <DndContext
      onDragEnd={(event: DragEndEvent) => {
        const studentId = event.active.data.current?.studentId
        const day = event.over?.data.current?.day as WeekDay | undefined

        if (!studentId || !day) return

        const alreadyAssigned = assignments.some(
          (a) => a.studentId === studentId && a.day === day
        )

        if (alreadyAssigned) return

        handleDrop(studentId, day)
      }}
    >
      <div className="grid grid-cols-[240px_1fr] gap-6">
        {/* students */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Students</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {students.map((s) => (
              <DraggableStudent key={s.id} student={s} />
            ))}
          </CardContent>
        </Card>

        {/* days */}
        <div className="grid grid-cols-3 gap-4">
          {days.map((day) => (
            <DayColumn
              key={day}
              day={day}
              assignments={assignments.filter((a) => a.day === day)}
              studentsById={studentsById}
            />
          ))}
        </div>
      </div>
    </DndContext>
  )
}
