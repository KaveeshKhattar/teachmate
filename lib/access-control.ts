import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export type WorkspaceRole = "TEACHER" | "STUDENT";

const STRICT_ENTITLEMENT = process.env.REQUIRE_ENTITLEMENT === "true";

function parseCsv(value: string | undefined): Set<string> {
  if (!value) return new Set();
  return new Set(
    value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
  );
}

function getEntitlementSets() {
  return {
    global: parseCsv(process.env.ENTITLED_USER_IDS),
    teacher: parseCsv(process.env.TEACHER_ENTITLED_USER_IDS),
    student: parseCsv(process.env.STUDENT_ENTITLED_USER_IDS),
  };
}

function isRoleEntitled(clerkUserId: string, role: WorkspaceRole): boolean {
  const sets = getEntitlementSets();
  const roleSet = role === "TEACHER" ? sets.teacher : sets.student;

  if (roleSet.size > 0) return roleSet.has(clerkUserId);
  if (sets.global.size > 0) return sets.global.has(clerkUserId);

  return !STRICT_ENTITLEMENT;
}

type AccessContext = {
  clerkUserId: string;
  appUserId: number;
  role: WorkspaceRole | null;
  teacherId: number | null;
  studentId: number | null;
  entitled: boolean;
};

export async function getAuthedAccessContext(): Promise<AccessContext | null> {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    select: {
      id: true,
      role: true,
      teacher: { select: { id: true } },
      student: { select: { id: true } },
    },
  });

  if (!user) return null;

  const role: WorkspaceRole | null = user.teacher?.id
    ? "TEACHER"
    : user.student?.id
      ? "STUDENT"
      : user.role === "TEACHER" || user.role === "STUDENT"
        ? user.role
        : null;

  return {
    clerkUserId,
    appUserId: user.id,
    role,
    teacherId: user.teacher?.id ?? null,
    studentId: user.student?.id ?? null,
    entitled: role ? isRoleEntitled(clerkUserId, role) : false,
  };
}

export async function getAuthedTeacherAccess(): Promise<{
  appUserId: number;
  teacherId: number;
  clerkUserId: string;
} | null> {
  const access = await getAuthedAccessContext();
  if (!access || access.role !== "TEACHER" || !access.teacherId || !access.entitled) {
    return null;
  }

  return {
    appUserId: access.appUserId,
    teacherId: access.teacherId,
    clerkUserId: access.clerkUserId,
  };
}

export async function getAuthedStudentAccess(): Promise<{
  appUserId: number;
  studentId: number;
  clerkUserId: string;
} | null> {
  const access = await getAuthedAccessContext();
  if (!access || access.role !== "STUDENT" || !access.studentId || !access.entitled) {
    return null;
  }

  return {
    appUserId: access.appUserId,
    studentId: access.studentId,
    clerkUserId: access.clerkUserId,
  };
}
