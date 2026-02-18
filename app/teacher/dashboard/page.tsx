import SlotScheduler from "@/components/SlotScheduler";
import { DashboardStudentsPanel } from "@/components/dashboard-students-panel";
import { getDashboardStudents } from "@/app/actions/getDashboardStudents";

export default async function Page() {
  const { students, assignedCountMap } = await getDashboardStudents();
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        <SlotScheduler />
      </div>
      <div className="space-y-4">
        <DashboardStudentsPanel
          students={students}
          assignedCountMap={assignedCountMap}
        />
      </div>
    </div>
  );
}
