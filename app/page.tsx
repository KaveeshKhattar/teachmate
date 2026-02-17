"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";

type Role = "TEACHER" | "STUDENT" | "GUEST";

function getRole(user: ReturnType<typeof useUser>["user"]): Role {
  if (!user) return "GUEST";
  const role = user.unsafeMetadata?.role;
  if (role === "TEACHER" || role === "STUDENT") return role;
  return "GUEST";
}

export default function Home() {
  const { user } = useUser();
  const role = getRole(user);

  const heroSubtitle =
    role === "TEACHER"
      ? "TeachMate keeps your tuition timetable organised so you can spend your energy on teaching, not admin."
      : role === "STUDENT"
        ? "A calm view of all your lessons in one place, so you can focus on learning, not chasing times."
        : "A tuition-first schedule hub for teachers, parents, and students who want clarity without the chaos.";

  const howItWorksRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = () => {
    howItWorksRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-24 px-4 pb-24 pt-16 sm:px-6 md:px-8 lg:gap-32 lg:pb-32 lg:pt-24">
      {/* Hero */}
      <section className="grid gap-16 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center md:gap-20">
        <div className="space-y-8">
          <p className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-900 dark:text-emerald-300 dark:ring-emerald-800">
            Less management. More studying.
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Tuition schedules that feel calm, not chaotic.
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground md:text-base">
            {heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              onClick={() => {
                if (!isSignedIn) {
                  openSignIn({
                    redirectUrl: "/calendar",
                  });
                } else {
                  router.push("/calendar");
                }
              }}
            >
              {isSignedIn ? "View calendar" : "Sign in to view calendar"}
            </Button>

            <Button onClick={scrollToSection}>
              See how it works
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-emerald-700">10x</span>{" "}
              fewer back-and-forth messages on lesson times.
            </div>
            <div>
              <span className="font-medium text-emerald-700">1 place</span> for
              teachers, parents, and students to stay in sync.
            </div>
          </div>
        </div>

        {/* Abstract “calendar” preview, purely visual */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-emerald-100/60 via-emerald-50 to-sky-50 dark:via-emerald-500 dark:to-sky-500 blur-2xl" />
          <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                Weekly tuition view
              </span>
              <span>Always in sync</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-[11px]">
              <div className="space-y-2">
                <p className="text-muted-foreground">Mon</p>
                <div className="h-16 rounded-lg bg-emerald-50 dark:bg-emerald-900 px-2 py-1">
                  <p className="truncate text-[11px] font-medium">
                    Physics
                  </p>
                  <p className="text-[10px] text-emerald-700 dark:text-green-200">4:00 – 5:30 PM</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">Tue</p>
                <div className="h-16 rounded-lg bg-sky-50 dark:bg-blue-900 px-2 py-1">
                  <p className="truncate text-[11px] font-medium">
                    Algebra
                  </p>
                  <p className="text-[10px] text-sky-700 dark:text-sky-200">7:00 – 8:00 PM</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">Wed</p>
                <div className="h-16 rounded-lg bg-sky-50 dark:bg-blue-900 px-2 py-1">
                  <p className="truncate text-[11px] font-medium">
                    Chemistry
                  </p>
                  <p className="text-[10px] text-sky-700 dark:text-sky-200">5:00 – 6:00 PM</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">Thu</p>
                <div className="h-16 rounded-lg bg-sky-50 dark:bg-emerald-900 px-2 py-1">
                  <p className="truncate text-[11px] font-medium">
                    English
                  </p>
                  <p className="text-[10px] dark:text-green-200">3:30 – 5:00 PM</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-[11px] text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">
                  Designed for tuition.
                </p>
                <p>Block out admin and keep the focus on learning time.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="grid gap-8 md:grid-cols-2 md:gap-10">

        <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            For tutors
          </p>
          <h2 className="mt-4 text-base font-semibold sm:text-lg">
            Set schedules.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Set schedules without wrestling with managing schedules every week.
            Add or change times without having to share the schedule manually.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
          <p className="text-xs font-medium uppercase tracking-wide text-sky-700">
            For students & parents
          </p>
          <h2 className="mt-4 text-base font-semibold sm:text-lg">
            No more “what time is class?” texts.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Everyone sees the same up-to-date timetable, so you can focus on
            revision, not rescheduling. Check the calendar on your phone before you leave.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border pt-24">
        <div className="text-center max-w-2xl mx-auto mb-16" ref={howItWorksRef}>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Simple to set up. Easy to use.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base leading-relaxed">
            Create a schedule and everyone stays in sync.
          </p>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
          <div className="space-y-4 text-center">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 font-semibold">1</span>
            <h3 className="text-base font-semibold">Add your lessons</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enter slots for each day. <br />
              One-off or recurring.
            </p>
          </div>
          <div className="space-y-4 text-center">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 font-semibold">2</span>
            <h3 className="text-base font-semibold">Everyone stays updated</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Change a time or add a class. <br />
              Everyone sees it right away. No emails or group chats.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border pt-16">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <p className="text-xl font-semibold">TeachMate</p>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/launch" className="hover:text-foreground transition-colors">Get started</Link>
            <Link href="/" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
        </div>
        <p className="mt-12 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TeachMate. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
