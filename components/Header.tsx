"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./modeTogggle";

export default function Header() {
    const { user } = useUser();
    const role = user?.unsafeMetadata?.role ?? user?.unsafeMetadata?.ROLE;
    const workspaceHref =
        role === "TEACHER" ? "/teacher" : role === "STUDENT" ? "/student" : "/onboarding";

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-3 sm:px-4">
            <div className="py-2">
                <Link href="/">
                    <p className="text-lg font-bold">Teachmate</p>
                </Link>
            </div>
            <div className="flex w-full flex-wrap items-center justify-end gap-2 py-2 sm:w-auto sm:gap-3">
                <ModeToggle />
                <SignedOut>
                    <SignInButton>
                        <Button size="sm">
                            Sign In
                        </Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button size="sm" variant="secondary">
                            Sign Up
                        </Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <Button asChild size="sm" variant="outline">
                        <Link href={workspaceHref}>
                            {role === "TEACHER" ? "Teacher Home" : role === "STUDENT" ? "Student Home" : "Complete Setup"}
                        </Link>
                    </Button>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}
