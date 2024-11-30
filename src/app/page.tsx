"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {

  const { user } = useUser();

  return (
    <>
      {user ?
        <div className="flex flex-col items-center justify-start h-screen">
          Welcome {user.firstName} {user.lastName}!
          {user?.unsafeMetadata.role === "TEACHER" ? <div>
            <Link href="/teacher">
              <Button>
                Teacher Dashboard
              </Button>
            </Link>
          </div> : <div>
            <Link href="/student">
              <Button>
                Student Dashboard
              </Button>
            </Link>
          </div>}
        </div>
        :
        <div className="flex flex-col items-center justify-start h-screen">
          <p>Welcome to the app!</p>
        </div>
      }
    </>
  );
}
