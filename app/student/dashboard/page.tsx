// app/student/dashboard/page.tsx
import SlotScheduler from "@/components/SlotScheduler";
import { SignedInProfileSection } from "@/components/signed-in-profile-section";

export default function Page() {
    return (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
                <SlotScheduler readOnly />
            </div>
            <SignedInProfileSection />
        </div>
    );
}
