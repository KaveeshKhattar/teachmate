import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Student } from "@/types/scheduler";

interface DashboardStudentsPanelProps {
  students: Student[];
  assignedCountMap: Record<number, number>;
}

export function DashboardStudentsPanel({
  students,
  assignedCountMap,
}: DashboardStudentsPanelProps) {
  const scheduledStudents = students.filter((student) => {
    const target = student.numOfClassesPerWeek ?? 0;
    if (target <= 0) return false;
    return (assignedCountMap[student.id] ?? 0) >= target;
  }).length;

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Students</CardTitle>
        <p className="text-sm text-muted-foreground">
          {students.length} enrolled · {scheduledStudents} on target
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {students.length === 0 && (
          <p className="text-sm text-muted-foreground">No students found for this teacher.</p>
        )}

        {students.map((student) => {
          const assigned = assignedCountMap[student.id] ?? 0;
          const target = student.numOfClassesPerWeek ?? 0;
          const first = student.user.firstName || "Student";
          const last = student.user.lastName || "";

          return (
            <div
              key={student.id}
              className="rounded-md border p-2.5 flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {first} {last}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {student.grade ?? "N/A"} · {student.school ?? "Unknown school"}
                </p>
              </div>
              <Badge variant="secondary" className="tabular-nums">
                {assigned}/{target || "?"}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
