import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
      const body = await req.json();
  
      const {
        clerkUserId,
        role,
        email,
        firstName,
        lastName,
        imageUrl,
  
        // student-only
        grade,
        school,
        board,
        fees,
        teacherId,
      } = body;
  
      if (!clerkUserId || !email || !role) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
  
      // -------------------------
      // 1. Upsert User
      // -------------------------
      const user = await prisma.user.upsert({
        where: { clerkUserId },
        update: {
          email,
          firstName,
          lastName,
          imageUrl,
          role,
        },
        create: {
          clerkUserId,
          email,
          firstName,
          lastName,
          imageUrl,
          role,
        },
      });
  
      // -------------------------
      // 2. Role specific
      // -------------------------
  
      if (role === "TEACHER") {
        await prisma.teacher.upsert({
          where: {
            userId: user.id,
          },
          update: {},
          create: {
            userId: user.id,
          },
        });
      }
  
      if (role === "STUDENT") {
        if (!teacherId) {
          return NextResponse.json(
            { error: "teacherId is required for student" },
            { status: 400 }
          );
        }
  
        await prisma.student.upsert({
          where: {
            userId: user.id,
          },
          update: {
            grade: grade ?? null,
            school: school ?? null,
            board: board ?? null,
            fees: typeof fees === "number" ? fees : null,
            teacherId: Number(teacherId),
          },
          create: {
            userId: user.id,
            teacherId: Number(teacherId),
            grade: grade ?? null,
            school: school ?? null,
            board: board ?? null,
            fees: typeof fees === "number" ? fees : null,
          },
        });
      }
  
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("POST /api/teachers error:", err);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
  