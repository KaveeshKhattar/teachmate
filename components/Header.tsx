"use client";

import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./modeTogggle";

export default function Header() {
  const { user } = useUser();
  const role = user?.unsafeMetadata?.role ?? user?.unsafeMetadata?.ROLE;
  const workspaceHref =
    role === "TEACHER" ? "/teacher" : role === "STUDENT" ? "/student" : "/onboarding";

  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="shrink-0">
          <p className="text-lg font-bold">Teachmate</p>
        </Link>

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end sm:gap-3">
          <ModeToggle />

          <SignedOut>
            <div className="flex min-w-0 flex-1 flex-wrap gap-2 sm:flex-none">
              <SignInButton>
                <Button size="sm" className="flex-1 sm:flex-none">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size="sm" variant="secondary" className="flex-1 sm:flex-none">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:flex-none">
              <Button asChild size="sm" variant="outline" className="min-w-0 flex-1 sm:flex-none">
                <Link href={workspaceHref} className="truncate">
                  {role === "TEACHER"
                    ? "Teacher Home"
                    : role === "STUDENT"
                      ? "Student Home"
                      : "Complete Setup"}
                </Link>
              </Button>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
