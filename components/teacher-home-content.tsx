import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TeacherHomeContent() {
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border-primary/20">
        <CardHeader className="">
          <CardTitle className="text-2xl">Teacher Workspace</CardTitle>
          <CardDescription>
            Keep classes, students, and monthly collections organized from one
            place.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/teacher/students">Manage Students</Link>
            </Button>
            <Button asChild>
              <Link href="/teacher/dashboard">View Schedule</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/teacher/payments">Open Payments</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Students</CardTitle>
            <CardDescription>
              Update fees and class load per student.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/teacher/students">Go to students</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Schedule Builder</CardTitle>
            <CardDescription>Create recurring time slots quickly.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/teacher/brainstorm">Create schedule</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payments</CardTitle>
            <CardDescription>See who has paid for the month.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/teacher/payments">Review payments</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
