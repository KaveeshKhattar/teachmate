import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StudentHomeContent() {
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border-primary/20">
        <CardHeader className="">
          <CardTitle className="text-2xl">Student Workspace</CardTitle>
          <CardDescription>
            Check class schedule, mark monthly payment, and keep profile details
            updated.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/student/dashboard">View Classes</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/student/payments">Open Payments</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/student/profile">View Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">View Classes</CardTitle>
            <CardDescription>Stay on top of your weekly tuition slots.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/student/dashboard">Open classes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payments</CardTitle>
            <CardDescription>
              Mark your current month as paid in one click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/student/payments">Mark payment</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
            <CardDescription>Review your account and role information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/student/profile">Open profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
