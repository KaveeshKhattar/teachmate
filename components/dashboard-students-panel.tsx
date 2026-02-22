import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAvatarColor, getInitials } from "@/lib/scheduler-utils";
import { cn } from "@/lib/utils";
import type { Student } from "@/types/scheduler";

interface DashboardStudentsPanelProps {
  students: Student[];
  assignedCountMap: Record<number, number>;
}

export function DashboardStudentsPanel({
  students,
  assignedCountMap,
}: DashboardStudentsPanelProps) {
  const onTargetCount = students.filter((student) => {
    const target = student.numOfClassesPerWeek ?? 0;
    if (target <= 0) return false;
    return (assignedCountMap[student.id] ?? 0) >= target;
  }).length;
  const needsAttentionCount = students.filter((student) => {
    const target = student.numOfClassesPerWeek ?? 0;
    if (target <= 0) return false;
    return (assignedCountMap[student.id] ?? 0) < target;
  }).length;

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Students</CardTitle>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="rounded-md border bg-muted/30 p-2">
            <p className="text-muted-foreground">Enrolled</p>
            <p className="text-sm font-semibold">{students.length}</p>
          </div>
          <div className="rounded-md border bg-emerald-50/70 p-2 dark:bg-emerald-950/20">
            <p className="text-muted-foreground">On Target</p>
            <p className="text-sm font-semibold">{onTargetCount}</p>
          </div>
          <div className="rounded-md border bg-amber-50/70 p-2 dark:bg-amber-950/20">
            <p className="text-muted-foreground">Needs Attention</p>
            <p className="text-sm font-semibold">{needsAttentionCount}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {students.length === 0 && (
          <p className="text-sm text-muted-foreground">No students found for this teacher.</p>
        )}

        <ScrollArea className="max-h-[520px] pr-2">
          <div className="space-y-2">
            {students.map((student, index) => {
              const assigned = assignedCountMap[student.id] ?? 0;
              const target = student.numOfClassesPerWeek ?? 0;
              const first = student.user.firstName || "Student";
              const last = student.user.lastName || "";
              const ratio = target > 0 ? Math.min(100, Math.round((assigned / target) * 100)) : 0;
              const onTarget = target > 0 && assigned >= target;

              return (
                <div
                  key={student.id}
                  className="rounded-md border p-2.5"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <div
                        className={cn(
                          "inline-flex h-7 w-7 items-center justify-center rounded text-[10px] font-bold",
                          getAvatarColor(index)
                        )}
                      >
                        {getInitials(student)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {first} {last}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {student.grade ?? "N/A"} · {student.board ?? "No board"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant={onTarget ? "default" : "secondary"}
                        className={cn("tabular-nums", !onTarget && "text-amber-700 dark:text-amber-300")}
                      >
                        {assigned}/{target || "?"}
                      </Badge>
                    </div>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        onTarget ? "bg-emerald-500" : "bg-amber-500"
                      )}
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
