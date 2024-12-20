"use client";
import { useUser } from "@clerk/nextjs";
import StudentComponent from "../_components/StudentComponent";

export default function Student() {

    const { user } = useUser();

    return (
        <>
            <StudentComponent clerkUserId={user?.id ?? ''} />
        </>
    );
};