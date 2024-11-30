'use client';
import StudentComponent from "@/app/_components/StudentComponent";
import { useSearchParams } from "next/navigation";

export default function IndividualStudentPageForTeacher() {

    const searchParams = useSearchParams();
    const clerkUserId = searchParams.get('clerkUserId');

    return (
        <>
            <StudentComponent clerkUserId={clerkUserId ?? ''} />
        </>
    )
}