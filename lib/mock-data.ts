
import type { ScheduleSlot, Student, WeekDay } from "@/types/scheduler";

export const MOCK_STUDENTS: Student[] = [
  {
    id: 1, userId: 2, teacherId: 1,
    user: { firstName: "Alex", lastName: "Rivera" },
    grade: "9th", school: "Lincoln High", numOfClassesPerWeek: 2,
  },
  {
    id: 2, userId: 3, teacherId: 1,
    user: { firstName: "Maya", lastName: "Patel" },
    grade: "10th", school: "West Academy", numOfClassesPerWeek: 3,
  },
  {
    id: 3, userId: 4, teacherId: 1,
    user: { firstName: "Ethan", lastName: "Kim" },
    grade: "8th", school: "Lincoln High", numOfClassesPerWeek: 2,
  },
  {
    id: 4, userId: 5, teacherId: 1,
    user: { firstName: "Priya", lastName: "Sharma" },
    grade: "11th", school: "East Prep", numOfClassesPerWeek: 1,
  },
  {
    id: 5, userId: 6, teacherId: 1,
    user: { firstName: "Leo", lastName: "Nguyen" },
    grade: "9th", school: "West Academy", numOfClassesPerWeek: 2,
  },
];

export const MOCK_SCHEDULES: ScheduleSlot[] = [
  {
    id: 1, teacherId: 1,
    startTime: "09:00", endTime: "10:00",
    maxStudents: 3,
    days: ["MON", "WED", "FRI"],
    color: "blue",
    label: "Morning Session",
  },
  {
    id: 2, teacherId: 1,
    startTime: "11:00", endTime: "12:00",
    maxStudents: 2,
    days: ["TUE", "THU"],
    color: "violet",
    label: "Midday Session",
  },
  {
    id: 3, teacherId: 1,
    startTime: "15:00", endTime: "16:30",
    maxStudents: 4,
    days: ["MON", "TUE", "WED", "THU", "FRI"],
    color: "emerald",
    label: "Afternoon Session",
  },
  {
    id: 4, teacherId: 1,
    startTime: "17:00", endTime: "18:00",
    maxStudents: 2,
    days: ["SAT"],
    color: "amber",
    label: "Weekend Session",
  },
];

export const INITIAL_ASSIGNMENTS: Array<{ scheduleId: number; day: WeekDay; studentId: number }> = [
  { scheduleId: 1, day: "MON", studentId: 1 },
  { scheduleId: 1, day: "WED", studentId: 2 },
  { scheduleId: 3, day: "MON", studentId: 3 },
  { scheduleId: 3, day: "TUE", studentId: 3 },
];
