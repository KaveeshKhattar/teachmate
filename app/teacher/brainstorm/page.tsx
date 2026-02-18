import BrainstormClient from "./BrainstormClient";
import { getBrainstormData } from "@/app/actions/getBrainstormData";

export default async function TeacherSchedulerPage() {
  const { students, schedules, assignments } = await getBrainstormData();

  return (
    <BrainstormClient
      students={students}
      schedules={schedules}
      initialAssignments={assignments}
    />
  );
}
