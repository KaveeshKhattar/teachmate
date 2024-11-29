import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUp, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex justify-between items-center">
            <div className="p-2">
                <Link href="/">
                    Teachmate
                </Link>
            </div>
            <div className="flex gap-4 p-2">
                <SignedOut>
                    <SignInButton>
                        <Button>
                            Sign In
                        </Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button variant="secondary">
                            Sign Up
                        </Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}