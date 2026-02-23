import { getAuthedTeacherAccess } from "@/lib/access-control";

export async function getTeacherIdFromAuth(): Promise<number | null> {
  const access = await getAuthedTeacherAccess();
  return access?.teacherId ?? null;
}
