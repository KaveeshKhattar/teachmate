import { SchedulerSkeleton, StudentsPanelSkeleton } from "@/components/dashboard-loading";

export default function TeacherDashboardLoading() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        <SchedulerSkeleton />
      </div>
      <div className="space-y-4">
        <StudentsPanelSkeleton />
      </div>
    </div>
  );
}
