// app/student/dashboard/page.tsx
import SlotScheduler from "@/components/SlotScheduler";

export default function Page() {
    return (
        <div className="mx-auto max-w-6xl p-6">
            <SlotScheduler readOnly />
        </div>
    );
}