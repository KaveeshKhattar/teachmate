// app/actions/getTeacherStudents.ts
import prisma from "@/lib/prisma"

export async function getTeacherStudents(teacherUserId: number) {
  const teacher = await prisma.teacher.findUnique({
    where: { userId: teacherUserId },
    include: {
      Student: {
        include: {
          user: true, // fetch user info: email, firstName, lastName
        },
      },
    },
  });

  return teacher?.Student || [];
}
