"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TestData {
  date: string; // The date in YYYY-MM-DD format
  marks_scored: number;
  total_marks: number;
}

interface ChartData {
  month: string;
  marks: number;
}

interface TestSchoolProps {
  clerkUserId: string;
}

const TestSchool: React.FC<TestSchoolProps> = ({ clerkUserId }) => {
  const [testName, setTestName] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [date, setDate] = useState("");
  const [marksScored, setMarksScored] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const isBeforeToday = (selectedDate: string) => {
    const today = new Date();
    const selected = new Date(selectedDate);

    return selected < today;
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/schoolTest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: clerkUserId,
          testName,
          syllabus,
          date,
          marksScored: isBeforeToday(date) ? marksScored : null,
          totalMarks,
        }),
      });

      if (response.ok) {
        console.log("Creation was a success");
      } else {
        console.log("Creation was a fail");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllTestsForStudent = useCallback(async () => {
    if (!clerkUserId) {
      return;
    }

    try {
      console.log("Fetching school test data");
      const response = await fetch(`/api/schoolTest?userId=${clerkUserId}`, {
        method: "GET", // Use GET request
        headers: {
          "Content-Type": "application/json", // optional
        },
      });

      if (response.ok) {
        const data: TestData[] = await response.json();
        console.log("Tests fetched successfully", data);

        // Step 1: Group the data by month
        const groupedData = data.reduce(
          (acc: Record<string, number[]>, test) => {
            const date = new Date(test.date);
            const monthName = date.toLocaleString("default", { month: "long" });

            // Calculate marks ratio (marks_scored / total_marks) as a percentage
            const marksRatio = (test.marks_scored / test.total_marks) * 100;

            // Group data by month
            if (!acc[monthName]) {
              acc[monthName] = [];
            }
            acc[monthName].push(marksRatio);

            return acc;
          },
          {}
        );

        // Step 2: Calculate the average marks ratio for each month
        const chartData: ChartData[] = Object.keys(groupedData).map((month) => {
          const marksRatios = groupedData[month];
          const averageMarks =
            marksRatios.reduce((sum, ratio) => sum + ratio, 0) /
            marksRatios.length;

          return {
            month: month,
            marks: averageMarks, // The average marks percentage for the month
          };
        });

        const monthOrder = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        // Function to sort chartData by month
        const sortedChartData = chartData.sort((a, b) => {
          return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        });

        setChartData(sortedChartData);
        console.log("Processed chart data:", chartData);
      } else {
        console.error("Failed to fetch tests");
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  }, [clerkUserId]);

  useEffect(() => {
    fetchAllTestsForStudent();
  }, [fetchAllTestsForStudent]);

  const pathname = usePathname(); // Get the current pathname
  const role = pathname?.includes("/teacher") ? "TEACHER" : "STUDENT";

  // const chartData = [
  //   { month: "January", desktop: 80, mobile: 80 },
  //   { month: "February", desktop: 70, mobile: 200 },
  //   { month: "March", desktop: 78, mobile: 120 },
  //   { month: "April", desktop: 85, mobile: 190 },
  //   { month: "May", desktop: 84, mobile: 130 },
  //   { month: "June", desktop: 76, mobile: 140 },
  // ];

  const chartConfig = {
    marks: {
      label: "marks",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <>
      <Card className="w-[350px] mt-4">
        <CardHeader>
          <CardTitle>Tests (at School)</CardTitle>
          <CardDescription>
            Performance in the tests conducted at school. (as percentages from 0
            to 100)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                domain={[0, 100]} // Set Y-axis range from 0 to 100
                tickLine={false}
                axisLine={false}
              />
              <Bar dataKey="marks" fill="var(--color-marks)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex justify-between">
          {role === "STUDENT" ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Test</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Test (School)</DialogTitle>
                  <DialogDescription>
                    Add a school test that was, or is yet to be conducted. Click
                    save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Test Name
                    </Label>
                    <Input
                      id="name"
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="syllabus" className="text-right">
                      Syllabus
                    </Label>
                    <Input
                      id="syllabus"
                      value={syllabus}
                      onChange={(e) => setSyllabus(e.target.value)}
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="col-span-3"
                    />
                  </div>

                  {isBeforeToday(date) && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="marksScored" className="text-right">
                        Marks Scored
                      </Label>
                      <Input
                        id="marksScored"
                        value={marksScored}
                        onChange={(e) => setMarksScored(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="totalMarks" className="text-right">
                      Total Marks
                    </Label>
                    <Input
                      id="totalMarks"
                      value={totalMarks}
                      onChange={(e) => setTotalMarks(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSubmit}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <p></p>
          )}

          <Link href={role === "TEACHER" ?
            `/teacher/student/school-test?clerkUserId=${clerkUserId}` : `/student/tuition-test`
          }>
            <Button variant="outline">View Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default TestSchool;
