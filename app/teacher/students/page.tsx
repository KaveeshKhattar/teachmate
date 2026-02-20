import { redirect } from "next/navigation";
import { getTeacherIdFromAuth } from "@/lib/get-teacher-id-from-auth";
import prisma from "@/lib/prisma";
import TeacherStudentsTable, { type TeacherStudent } from "@/components/teacher-students-table";

export default async function TeacherStudentsPage() {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    redirect("/");
  }

  const students = await prisma.student.findMany({
    where: {
      teacher: {
        id: teacherId,
      },
    },
    include: {
      user: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });

  return <TeacherStudentsTable initialStudents={students as TeacherStudent[]} />;
}
