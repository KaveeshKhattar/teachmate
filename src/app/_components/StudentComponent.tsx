import TestSchool from "./TestSchool";
import TestTuition from "./TestTuition";

export default function StudentComponent({ clerkUserId }: { clerkUserId: string }) {

    console.log("clerkUserId: ", clerkUserId);

    return (
        <>
            <div className="flex flex-col gap-4 items-center">
                <TestTuition clerkUserId={clerkUserId} />
                <TestSchool clerkUserId={clerkUserId} />
            </div>
        </>
    )
}