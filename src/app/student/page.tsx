"use client";
import { useUser } from "@clerk/nextjs";
import StudentComponent from "../_components/StudentComponent";

export default function Student({ clerkUserId }: { clerkUserId: string }) {

    const { user } = useUser();

    return (
        <>
            <StudentComponent clerkUserId={user?.id ?? ''} />
        </>
    );
};