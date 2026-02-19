import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SchedulerSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-5 w-36" />
        </div>
      </div>

      <div className="rounded-lg border p-3">
        <div className="grid grid-cols-8 gap-2">
          {Array.from({ length: 24 }).map((_, idx) => (
            <Skeleton key={idx} className="h-8 w-full rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function StudentsPanelSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-44" />
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-6 w-10 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
