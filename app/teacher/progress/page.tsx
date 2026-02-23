import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getTeacherIdFromAuth } from "@/lib/get-teacher-id-from-auth";
import { TeacherProgressCenter } from "@/components/teacher-progress-center";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function TeacherProgressPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    redirect("/");
  }

  const params = await searchParams;
  const studentIdParam = Array.isArray(params.studentId) ? params.studentId[0] : params.studentId;
  const initialStudentId = studentIdParam ? Number.parseInt(studentIdParam, 10) : null;

  const students = await prisma.student.findMany({
    where: {
      teacher: { id: teacherId },
    },
    select: {
      id: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });

  const studentOptions = students.map((student) => ({
    id: student.id,
    name: [student.user.firstName, student.user.lastName].filter(Boolean).join(" ").trim() || "Student",
  }));

  return (
    <TeacherProgressCenter
      students={studentOptions}
      initialStudentId={Number.isInteger(initialStudentId ?? NaN) ? initialStudentId : null}
    />
  );
}
