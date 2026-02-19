import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId: authedClerkUserId } = await auth();
    const clerkUser = await currentUser();
    const unsafeMetadata = (clerkUser?.unsafeMetadata ?? {}) as Record<string, unknown>;

    const body = await req.json().catch(() => ({}));
    const {
      clerkUserId,
      role,
      email,
      firstName,
      lastName,
      imageUrl,
      grade,
      school,
      board,
      fees,
      teacherId,
    } = body ?? {};

    const rawTeacherIdFromBody = teacherId ?? null;
    const rawTeacherIdFromMetadata = unsafeMetadata.teacher_id ?? null;
    const rawTeacherId = rawTeacherIdFromBody ?? rawTeacherIdFromMetadata;
    const parsedTeacherId =
      typeof rawTeacherId === "number"
        ? rawTeacherId
        : typeof rawTeacherId === "string" && rawTeacherId.trim() !== ""
          ? Number(rawTeacherId)
          : null;

    const resolvedClerkUserId =
      clerkUserId ??
      authedClerkUserId ??
      clerkUser?.id ??
      null;

    const resolvedEmail =
      email ??
      clerkUser?.emailAddresses?.[0]?.emailAddress ??
      (resolvedClerkUserId ? `${resolvedClerkUserId}@clerk.local` : null);

    const rawRole = role ?? unsafeMetadata.role ?? unsafeMetadata.ROLE;
    const resolvedRole =
      rawRole === "TEACHER" || rawRole === "STUDENT"
        ? rawRole
        : parsedTeacherId
          ? "STUDENT"
          : "TEACHER";

    const resolvedFirstName = firstName ?? clerkUser?.firstName ?? null;
    const resolvedLastName = lastName ?? clerkUser?.lastName ?? null;
    const resolvedImageUrl = imageUrl ?? clerkUser?.imageUrl ?? null;

    if (!resolvedClerkUserId || !resolvedEmail) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: {
            hasClerkUserId: Boolean(resolvedClerkUserId),
            hasEmail: Boolean(resolvedEmail),
          },
        },
        { status: 400 }
      );
    }

    const parsedFees =
      typeof fees === "number"
        ? fees
        : typeof fees === "string" && fees.trim() !== ""
          ? Number(fees)
          : typeof unsafeMetadata.fees === "number"
            ? unsafeMetadata.fees
            : typeof unsafeMetadata.fees === "string" && unsafeMetadata.fees.trim() !== ""
              ? Number(unsafeMetadata.fees)
              : null;

    const resolvedGrade = grade ?? unsafeMetadata.grade ?? null;
    const resolvedSchool = school ?? unsafeMetadata.school ?? null;
    const resolvedBoard = board ?? unsafeMetadata.board ?? null;

    const user = await prisma.user.upsert({
      where: { clerkUserId: resolvedClerkUserId },
      update: {
        email: resolvedEmail,
        firstName: resolvedFirstName,
        lastName: resolvedLastName,
        imageUrl: resolvedImageUrl,
        role: resolvedRole,
      },
      create: {
        clerkUserId: resolvedClerkUserId,
        email: resolvedEmail,
        firstName: resolvedFirstName,
        lastName: resolvedLastName,
        imageUrl: resolvedImageUrl,
        role: resolvedRole,
      },
    });

    if (resolvedRole === "TEACHER") {
      await prisma.teacher.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id },
      });
    }

    if (resolvedRole === "STUDENT") {
      if (!parsedTeacherId || Number.isNaN(parsedTeacherId)) {
        return NextResponse.json(
          { error: "teacherId is required for student" },
          { status: 400 }
        );
      }

      await prisma.student.upsert({
        where: { userId: user.id },
        update: {
          grade: typeof resolvedGrade === "string" ? resolvedGrade : null,
          school: typeof resolvedSchool === "string" ? resolvedSchool : null,
          board: typeof resolvedBoard === "string" ? resolvedBoard : null,
          fees: parsedFees != null && !Number.isNaN(parsedFees) ? parsedFees : null,
          teacherId: parsedTeacherId,
        },
        create: {
          userId: user.id,
          teacherId: parsedTeacherId,
          grade: typeof resolvedGrade === "string" ? resolvedGrade : null,
          school: typeof resolvedSchool === "string" ? resolvedSchool : null,
          board: typeof resolvedBoard === "string" ? resolvedBoard : null,
          fees: parsedFees != null && !Number.isNaN(parsedFees) ? parsedFees : null,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/profile error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
  
