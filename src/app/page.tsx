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
          {user?.unsafeMetadata.role === "TEACHER" ?
            <div className="flex flex-col space-y-4 items-center">
              <Link href="/teacher">
                <Button>
                  Teacher Dashboard
                </Button>
              </Link>

              <Link href="/teacher/schedule">
                <Button>
                  View Schedule
                </Button>
              </Link>

              <Link href="/teacher/schedule/create">
                <Button>
                  Create Schedule
                </Button>
              </Link>
            </div> :
            <div className="flex flex-col space-y-4 items-center">
              <Link href="/student">
                <Button>
                  Student Dashboard
                </Button>
              </Link>
              <Link href="/student/schedule">
                <Button>
                  View Schedule
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
