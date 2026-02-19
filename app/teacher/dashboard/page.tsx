import { Suspense } from "react";
import SlotScheduler from "@/components/SlotScheduler";
import { DashboardStudentsPanel } from "@/components/dashboard-students-panel";
import { StudentsPanelSkeleton } from "@/components/dashboard-loading";
import { getDashboardStudents } from "@/app/actions/getDashboardStudents";

async function DashboardStudentsPanelSection() {
  const { students, assignedCountMap } = await getDashboardStudents();

  return (
    <DashboardStudentsPanel
      students={students}
      assignedCountMap={assignedCountMap}
    />
  );
}

export default function Page() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        <SlotScheduler />
      </div>
      <div className="space-y-4">
        <Suspense fallback={<StudentsPanelSkeleton />}>
          <DashboardStudentsPanelSection />
        </Suspense>
      </div>
    </div>
  );
}
