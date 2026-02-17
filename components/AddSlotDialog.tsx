"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { createRecurringSchedule } from "@/app/actions/createRecurringSchedule";


const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type Day = (typeof DAYS)[number];



export default function AddSlotDialog() {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [selectedDays, setSelectedDays] = React.useState<Day[]>([]);
  const [maxStudents, setMaxStudents] = React.useState<number>(1);
  const [error, setError] = React.useState<string>("");

  function toggleDay(day: Day) {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartTime(value);

    // Re-validate end time if it exists
    if (endTime && endTime <= value) {
      setError("End time must be later than start time");
    } else {
      setError("");
    }
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndTime(value);

    if (startTime && value <= startTime) {
      setError("End time must be later than start time");
    } else {
      setError("");
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !startTime ||
      !endTime ||
      !startDate ||
      selectedDays.length === 0 ||
      maxStudents <= 0
    )
      return;

    await createRecurringSchedule({
      startTime,
      endTime,
      startDate,
      endDate: endDate || undefined,
      days: selectedDays,
      maxStudents,
    });

    window.dispatchEvent(new Event("schedule-created"));
    setOpen(false);
    setStartTime("");
    setEndTime("");
    setStartDate("");
    setEndDate("");
    setSelectedDays([]);
    setMaxStudents(1);
  }

  const isSubmitDisabled = !startTime || !endTime || !!error;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Slot +</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create slot</DialogTitle>
            <DialogDescription>
              Configure the time, days and capacity for this slot.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            {/* Start Time */}
            <div className="space-y-2">
              <Label htmlFor="time">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                required
              />
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                required
                min={startTime} // still helps for browser UI
              />
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>


            {/* Start date */}
            <div className="space-y-2">
              <Label htmlFor="startDate">Start date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            {/* End date (optional) */}
            <div className="space-y-2">
              <Label htmlFor="endDate">End date (optional)</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>


            {/* Days of week */}
            <div className="space-y-2">
              <Label>Days of the week</Label>

              <div className="grid grid-cols-2 gap-3">
                {DAYS.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={selectedDays.includes(day)}
                      onCheckedChange={() => toggleDay(day)}
                    />
                    <Label
                      htmlFor={day}
                      className="font-normal cursor-pointer"
                    >
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Max students */}
            <div className="space-y-2">
              <Label htmlFor="max">Max students</Label>
              <Input
                id="max"
                type="number"
                min={1}
                value={maxStudents}
                onChange={(e) => setMaxStudents(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="submit" disabled={isSubmitDisabled}>Create slot</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
