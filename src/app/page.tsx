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

          {user?.unsafeMetadata.role === "TEACHER" ?

            <>
              <div className="flex flex-col items-center justify-start h-screen w-full">

                <div className="flex flex-col justify-end items-center bg-gradient-to-r from-[#67e8f9] to-[#a5f3fc] w-full h-[300px] ml-2 mr-2 mb-2 p-2">
                  <p className="text-2xl font-bold mt-2">Teacher Dashboard</p>

                  <Link href="/teacher">
                    <Button className="mt-4">
                      View Dashboard
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-col justify-end items-center bg-gradient-to-r from-[#7dd3fc] to-[#bae6fd] w-full h-[300px] ml-2 mr-2 mb-2 p-2">
                  <p className="text-2xl font-bold mt-2">Schedule</p>

                  <div className="flex space-x-2 mt-4">
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
                  </div>

                </div>
              </div>
            </>

            :

            <div className="flex flex-col items-center justify-start h-screen w-full">

              <div className="flex flex-col justify-end items-center bg-gradient-to-r from-[#67e8f9] to-[#a5f3fc] w-full h-[300px] ml-2 mr-2 mb-2 p-2">
                <p className="text-2xl font-bold mt-2">Student Dashboard</p>

                <Link href="/student">
                  <Button className="mt-4">
                    View Dashboard
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col justify-end items-center bg-gradient-to-r from-[#7dd3fc] to-[#bae6fd] w-full h-[300px] ml-2 mr-2 mb-2 p-2">
                <p className="text-2xl font-bold mt-2">Student Schedule</p>

                <Link href="/student/schedule">
                  <Button className="mt-4">
                    View Schedule
                  </Button>
                </Link>
              </div>
            </div>

          }
        </div>
        :
        <div className="flex flex-col items-center justify-start h-screen">

          <div className="flex flex-col justify-end items-center bg-gradient-to-r from-[#86efac] to-[#bbf7d0] w-full h-[300px] ml-2 mr-2 mb-2 p-2">
            <p className="text-2xl font-bold mt-2">Welcome to TeachMate!</p>
            <p className="text-md">Sign up today as a student or teacher</p>
          </div>

          <div className="flex flex-col justify-end items-center bg-gradient-to-r from-[#6ee7b7] to-[#a7f3d0] w-full h-[300px] ml-2 mr-2 mb-2 p-2">
            <p className="text-2xl font-bold">Student Performance</p>
            <p className="text-center">Gain a comprehensive view of student progress at class and in school via descriptive charts</p>
          </div>

          <div className="flex flex-col justify-end items-center bg-gradient-to-r from-[#bef264] to-[#99f6e4] w-full h-[300px] ml-2 mr-2 p-2">
            <p className="text-2xl font-bold">Student Schedules</p>
            <p className="text-center">Streamline your workflow and say goodbye to logistical challenges with on-the-go scheduling</p>
          </div>

          <div className="bg-[#d1d5db] mt-2 w-full text-center">
            <p className="pt-4">© TeachMate 2024, All Rights reserved.</p>
          </div>

        </div>
      }
    </>
  );
}
