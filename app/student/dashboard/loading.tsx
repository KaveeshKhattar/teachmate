import { SchedulerSkeleton } from "@/components/dashboard-loading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentDashboardLoading() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        <SchedulerSkeleton />
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-44" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-9 w-full rounded-md" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
