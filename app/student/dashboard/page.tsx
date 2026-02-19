// app/student/dashboard/page.tsx
import SlotScheduler from "@/components/SlotScheduler";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
                <SlotScheduler readOnly />
            </div>
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Payments</CardTitle>
                        <CardDescription>Mark your monthly payment in one click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/student/payments">Open payment page</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
