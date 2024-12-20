import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex justify-between items-center bg-[#d1d5db]">
            <div className="p-2">
                <Link href="/">
                    <p className="text-lg font-bold">Teachmate</p>
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