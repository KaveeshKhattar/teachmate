"use client";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

type Student = {
    id: string;
    board: string;
    grade: string;
    school: string;
    user: {
        imageUrl: string;
        firstName: string;
        lastName: string;
        email: string;
        clerkUserId: string;
    };
};

export default function Teacher() {

    const { user } = useUser();
    const clerkUserId = user?.id;

    const [students, setStudents] = useState<Student[]>([]);

    const fetchStudents = useCallback(async () => {
        const data = await fetch(
            `/api/fetch-students/?userClerkId=${clerkUserId}`
        );

        console.log("Called and parsing now...")

        if (data.ok) {
            const response = await data.json();
            console.log("response: ", response);
            const students: Student[] = response.students;
            setStudents(students);
            console.log("students: ", students);
        }

    }, [clerkUserId]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);



    return (
        <div className="p-4 w-full space-y-4">
            {students.map((student) => (
                <Link
                    key={student.id}
                    href={{
                        pathname: `/teacher/student/${student.user.firstName}-${student.user.lastName}`,
                        query: { clerkUserId: student.user.clerkUserId },
                    }}
                    className="flex space-x-2 border border-zinc-500 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                    <Image
                        src={student.user.imageUrl}
                        alt={`${student.user.firstName} ${student.user.lastName}`}
                        width="40"
                        height="40"
                        className="rounded-md"
                    />
                    <div className="flex flex-col items-start">
                        <p>
                            {student.user.firstName} {student.user.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {student.user.email}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};
