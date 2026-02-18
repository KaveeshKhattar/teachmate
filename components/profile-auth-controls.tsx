"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function ProfileAuthControls() {
  return (
    <div className="space-y-3">
      <SignedIn>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">Manage account</p>
          <UserButton />
        </div>
        <SignOutButton>
          <Button variant="destructive">Sign Out</Button>
        </SignOutButton>
      </SignedIn>

      <SignedOut>
        <p className="text-sm text-muted-foreground">You are signed out.</p>
        <div className="flex gap-2">
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button variant="secondary">Sign Up</Button>
          </SignUpButton>
        </div>
      </SignedOut>
    </div>
  );
}
