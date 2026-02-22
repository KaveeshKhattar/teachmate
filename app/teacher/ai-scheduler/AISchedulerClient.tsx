"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleHelp, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { DayAssignment } from "@/types/scheduler";
import type { SchedulerPlanResult } from "@/lib/ai-scheduler";
import { getAvatarColor } from "@/lib/scheduler-utils";

type SchedulePlanApiResponse = {
  parser: "ai-sdk" | "fallback" | "direct-constraints";
  parserReason?: string | null;
  aiProviderUsed?: "openai" | "huggingface" | null;
  plan: SchedulerPlanResult;
};

type ApplyPlanApiResponse = {
  success: boolean;
  appliedAssignments: DayAssignment[];
  appliedCount: number;
  warnings: string[];
};

type ApplyPlanErrorResponse = {
  error?: string;
  details?: string[];
};

type PlannerStudent = {
  id: number;
  user: {
    firstName: string | null;
    lastName: string | null;
  };
};

type AISchedulerView = "create" | "adjust" | "both";
const AI_PROMPT_EXAMPLES = [
  "Keep Friday off and rebalance classes this week.",
  "Cancel Thursday classes and reassign to Saturday.",
  "Move Monday classes to Friday.",
  "Cancel today's classes and reassign to tomorrow.",
  "Reassign classes to Saturday, same board and same grade.",
] as const;

function InfoHint({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex h-5 w-5 items-center justify-center rounded-full border text-muted-foreground hover:bg-muted"
          aria-label="More info"
        >
          <CircleHelp className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent sideOffset={6}>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function AISchedulerClient({ view = "both" }: { view?: AISchedulerView }) {
  const router = useRouter();
  const [plannerDaysPerWeek, setPlannerDaysPerWeek] = useState("5");
  const [plannerHoursPerClass, setPlannerHoursPerClass] = useState("1");
  const [plannerClassesPerDay, setPlannerClassesPerDay] = useState("4");
  const [plannerStudentsPerClass, setPlannerStudentsPerClass] = useState("3");
  const [plannerBoardMode, setPlannerBoardMode] = useState<"same" | "mixed">("same");
  const [plannerGradeMode, setPlannerGradeMode] = useState<"same" | "mixed">("same");
  const [plannerInstruction, setPlannerInstruction] = useState("");
  const [isPlanning, setIsPlanning] = useState(false);
  const [isApplyingPlan, setIsApplyingPlan] = useState(false);
  const [plannerResult, setPlannerResult] = useState<SchedulePlanApiResponse | null>(null);
  const [students, setStudents] = useState<PlannerStudent[]>([]);
  const [confirmApplyOpen, setConfirmApplyOpen] = useState(false);
  const [confirmCreateSlotsOpen, setConfirmCreateSlotsOpen] = useState(false);
  const [missingSlotDetails, setMissingSlotDetails] = useState<string[]>([]);
  const showCreate = view !== "adjust";
  const showAdjust = view !== "create";
  const showBoth = showCreate && showAdjust;
  const pageTitle = showBoth
    ? "AI Scheduler"
    : showCreate
      ? "Create Schedule"
      : "AI Schedule Adjust";

  useEffect(() => {
    let cancelled = false;

    async function loadStudents() {
      try {
        const res = await fetch("/api/students");
        if (!res.ok) return;
        const payload = (await res.json().catch(() => null)) as PlannerStudent[] | null;
        if (!payload || cancelled) return;
        setStudents(payload);
      } catch {
        // keep preview working with ids even if student fetch fails
      }
    }

    loadStudents();
    return () => {
      cancelled = true;
    };
  }, []);

  const studentsById = useMemo(() => {
    const map = new Map<number, PlannerStudent>();
    students.forEach((student) => map.set(student.id, student));
    return map;
  }, [students]);

  const hoursPerClassValue = useMemo(() => Number(plannerHoursPerClass), [plannerHoursPerClass]);
  const daysPerWeekValue = useMemo(() => Number(plannerDaysPerWeek), [plannerDaysPerWeek]);
  const classesPerDayValue = useMemo(() => Number(plannerClassesPerDay), [plannerClassesPerDay]);
  const studentsPerClassValue = useMemo(
    () => Number(plannerStudentsPerClass),
    [plannerStudentsPerClass]
  );
  const mathHoursPerWeek = useMemo(() => {
    // Treat classes/day as max slots/day, not mandatory classes to fill.
    // Required weekly sessions come from teaching days.
    return Math.max(1, Math.round(daysPerWeekValue));
  }, [daysPerWeekValue]);

  const generatedBasePrompt = useMemo(
    () =>
      [
      "Create a schedule for Math.",
      `${plannerDaysPerWeek} days/week, up to ${plannerClassesPerDay} classes/day, ${plannerHoursPerClass} hours/class, ${plannerStudentsPerClass} students/class.`,
      `${plannerBoardMode === "same" ? "same board" : "mixed board"}, ${plannerGradeMode === "same" ? "same grade" : "mixed grade"}.`,
      ].join(" "),
    [
      plannerDaysPerWeek,
      plannerHoursPerClass,
      plannerClassesPerDay,
      plannerStudentsPerClass,
      plannerBoardMode,
      plannerGradeMode,
    ]
  );

  const generatedAiPrompt = useMemo(() => {
    const instruction = plannerInstruction.trim();
    if (instruction.length === 0) return generatedBasePrompt;

    return `${generatedBasePrompt} Additional instruction: ${instruction}`;
  }, [generatedBasePrompt, plannerInstruction]);

  const generatedConstraints = useMemo(
    () => ({
      daysPerWeek: daysPerWeekValue,
      classesPerDay: classesPerDayValue,
      // The scheduler engine uses this as slot capacity.
      studentsPerHour: studentsPerClassValue,
      classHours: [{ className: "Math", hoursPerWeek: mathHoursPerWeek }],
      filters: {
        sameBoardOnly: plannerBoardMode === "same",
        sameGradeOnly: plannerGradeMode === "same",
      },
    }),
    [
      daysPerWeekValue,
      classesPerDayValue,
      mathHoursPerWeek,
      studentsPerClassValue,
      plannerBoardMode,
      plannerGradeMode,
    ]
  );

  const handleGenerateGreedyPlan = useCallback(async () => {
    if (!Number.isFinite(hoursPerClassValue) || hoursPerClassValue <= 0) {
      toast.error("Set hours/class");
      return;
    }

    setIsPlanning(true);
    try {
      const res = await fetch("/api/schedule/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          constraints: generatedConstraints,
        }),
      });

      const payload = (await res.json().catch(() => null)) as
        | SchedulePlanApiResponse
        | { error?: string }
        | null;

      if (!res.ok || !payload || !("plan" in payload)) {
        toast.error((payload && "error" in payload && payload.error) || "Could not generate schedule");
        return;
      }

      setPlannerResult(payload);
      toast.success("Schedule generated");
    } catch {
      toast.error("Network error while generating schedule");
    } finally {
      setIsPlanning(false);
    }
  }, [generatedConstraints, hoursPerClassValue]);

  const handleGenerateAiAdjustmentPlan = useCallback(async () => {
    if (!Number.isFinite(hoursPerClassValue) || hoursPerClassValue <= 0) {
      toast.error("Set hours/class");
      return;
    }
    if (plannerInstruction.trim().length === 0) {
      toast.error("Enter an adjustment instruction");
      return;
    }

    setIsPlanning(true);
    try {
      const res = await fetch("/api/schedule/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: generatedAiPrompt,
          constraints: generatedConstraints,
        }),
      });

      const payload = (await res.json().catch(() => null)) as
        | SchedulePlanApiResponse
        | { error?: string }
        | null;

      if (!res.ok || !payload || !("plan" in payload)) {
        toast.error((payload && "error" in payload && payload.error) || "Could not adjust schedule");
        return;
      }

      setPlannerResult(payload);
      toast.success("AI-adjusted schedule generated");
    } catch {
      toast.error("Network error while adjusting schedule");
    } finally {
      setIsPlanning(false);
    }
  }, [generatedAiPrompt, generatedConstraints, hoursPerClassValue, plannerInstruction]);

  const handleApplyPlan = useCallback(async () => {
    if (!plannerResult?.plan) {
      toast.error("Generate a plan before applying it");
      return;
    }

    setIsApplyingPlan(true);
    try {
      const res = await fetch("/api/schedule/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plannerResult.plan }),
      });

      const payload = (await res.json().catch(() => null)) as
        | ApplyPlanApiResponse
        | ApplyPlanErrorResponse
        | null;

      if (res.status === 409 && payload && "details" in payload && Array.isArray(payload.details)) {
        setMissingSlotDetails(payload.details);
        setConfirmCreateSlotsOpen(true);
        return;
      }

      if (!res.ok || !payload || !("success" in payload) || !payload.success) {
        toast.error((payload && "error" in payload && payload.error) || "Could not apply schedule");
        return;
      }

      if (payload.warnings.length > 0) {
        toast.warning(`Applied ${payload.appliedCount} assignments with warnings`);
      } else {
        toast.success(`Applied ${payload.appliedCount} assignments`);
      }
      router.push("/teacher/dashboard");
      router.refresh();
    } catch {
      toast.error("Network error while applying schedule");
    } finally {
      setIsApplyingPlan(false);
    }
  }, [plannerResult, router]);

  const handleCreateSlotsAndApply = useCallback(async () => {
    if (!plannerResult?.plan) return;

    setConfirmCreateSlotsOpen(false);
    setIsApplyingPlan(true);

    try {
      const createRes = await fetch("/api/schedule/create-missing-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: plannerResult.plan,
          hoursPerClass: hoursPerClassValue,
          studentsPerClass: studentsPerClassValue,
        }),
      });

      const createPayload = (await createRes.json().catch(() => null)) as
        | { success?: boolean; createdCount?: number; error?: string }
        | null;

      if (!createRes.ok || !createPayload?.success) {
        toast.error(createPayload?.error ?? "Could not create missing slots");
        return;
      }

      const applyRes = await fetch("/api/schedule/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plannerResult.plan }),
      });

      const applyPayload = (await applyRes.json().catch(() => null)) as
        | ApplyPlanApiResponse
        | ApplyPlanErrorResponse
        | null;

      if (!applyRes.ok || !applyPayload || !("success" in applyPayload) || !applyPayload.success) {
        toast.error((applyPayload && "error" in applyPayload && applyPayload.error) || "Could not apply schedule");
        return;
      }

      if (applyPayload.warnings.length > 0) {
        toast.warning(`Created slots and applied ${applyPayload.appliedCount} assignments with warnings`);
      } else {
        toast.success(`Created slots and applied ${applyPayload.appliedCount} assignments`);
      }
      router.push("/teacher/dashboard");
      router.refresh();
    } catch {
      toast.error("Network error while creating slots and applying schedule");
    } finally {
      setIsApplyingPlan(false);
    }
  }, [hoursPerClassValue, plannerResult, router, studentsPerClassValue]);

  return (
    <>
      <AlertDialog open={confirmCreateSlotsOpen} onOpenChange={setConfirmCreateSlotsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create missing slots?</AlertDialogTitle>
            <AlertDialogDescription>
              Your plan needs more slots than currently available. Create missing slots and continue applying this plan?
            </AlertDialogDescription>
          </AlertDialogHeader>
          {missingSlotDetails.length > 0 ? (
            <div className="rounded-md border p-2 text-xs text-muted-foreground">
              {missingSlotDetails.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>
          ) : null}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isApplyingPlan}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreateSlotsAndApply} disabled={isApplyingPlan}>
              {isApplyingPlan ? "Creating..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmApplyOpen} onOpenChange={setConfirmApplyOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm apply?</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace current recurring assignments with the generated plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isApplyingPlan}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmApplyOpen(false);
                void handleApplyPlan();
              }}
              disabled={isApplyingPlan}
            >
              {isApplyingPlan ? "Applying..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TooltipProvider>
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <Card className="border-dashed">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-amber-500" />
            {pageTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className={`grid gap-3 ${showBoth ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
            {showCreate ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{showBoth ? "1) Create Schedule" : "Create Schedule"}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Uses deterministic constraints from dropdowns.
                </p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex flex-wrap items-center gap-2 leading-relaxed">
              <span>Create a schedule for</span>
              <Select value={plannerDaysPerWeek} onValueChange={setPlannerDaysPerWeek}>
                <SelectTrigger className="w-[88px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                    <SelectItem key={value} value={String(value)}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="inline-flex items-center gap-1">
                days/week
                <InfoHint text="How many days in a week classes should run." />
              </span>
              <Select value={plannerHoursPerClass} onValueChange={setPlannerHoursPerClass}>
                <SelectTrigger className="w-[88px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((value) => (
                    <SelectItem key={value} value={String(value)}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="inline-flex items-center gap-1">
                hours/class
                <InfoHint text="Duration of each class slot in hours." />
              </span>
              <Select value={plannerClassesPerDay} onValueChange={setPlannerClassesPerDay}>
                <SelectTrigger className="w-[88px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                    <SelectItem key={value} value={String(value)}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="inline-flex items-center gap-1">
                classes/day
                <InfoHint text="How many class slots to schedule per day." />
              </span>
              <Select value={plannerStudentsPerClass} onValueChange={setPlannerStudentsPerClass}>
                <SelectTrigger className="w-[88px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <SelectItem key={value} value={String(value)}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="inline-flex items-center gap-1">
                students/class, keep
                <InfoHint text="Maximum students allowed in one class slot." />
              </span>
              <Select
                value={plannerBoardMode}
                onValueChange={(value) => setPlannerBoardMode(value as "same" | "mixed")}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="same">same board</SelectItem>
                  <SelectItem value="mixed">mixed board</SelectItem>
                </SelectContent>
              </Select>
              <InfoHint text="Choose same board to avoid mixing different school boards in one class." />
              <span>and</span>
              <Select
                value={plannerGradeMode}
                onValueChange={(value) => setPlannerGradeMode(value as "same" | "mixed")}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="same">same grade</SelectItem>
                  <SelectItem value="mixed">mixed grade</SelectItem>
                </SelectContent>
              </Select>
              <InfoHint text="Choose same grade to avoid mixing different grades in one class." />
              <span>students together.</span>
                </div>
                {showCreate ? (
                  <div>
                    <Button onClick={handleGenerateGreedyPlan} disabled={isPlanning}>
                      {isPlanning ? "Generating..." : "Generate Schedule"}
                    </Button>
                  </div>
                ) : null}
                <div className="rounded-md border bg-muted/20 p-3">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">AI Prompt Overview</p>
                  <p className="text-sm">{generatedBasePrompt}</p>
                </div>
              </CardContent>
            </Card>
            ) : null}

            {showAdjust ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{showBoth ? "2) Adjust Schedule (AI)" : "Adjust Schedule (AI)"}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Use natural language to rebalance while keeping dropdown constraints as the base.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <textarea
                  value={plannerInstruction}
                  onChange={(event) => setPlannerInstruction(event.target.value)}
                  placeholder="Example: Keep Friday as an off day and rebalance those classes to other days this week."
                  className="min-h-20 w-full resize-y rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <div className="rounded-md border bg-muted/20 p-3">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">Possible prompts</p>
                  <div className="flex flex-wrap gap-1.5">
                    {AI_PROMPT_EXAMPLES.map((example) => (
                      <button
                        key={example}
                        type="button"
                        onClick={() => setPlannerInstruction(example)}
                        className="inline-flex"
                      >
                        <Badge
                          variant="secondary"
                          className="cursor-pointer rounded-full px-2.5 py-1 text-[11px] hover:bg-secondary/80"
                        >
                          {example}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Button onClick={handleGenerateAiAdjustmentPlan} disabled={isPlanning}>
                    {isPlanning ? "Generating..." : "Generate AI-Adjusted Schedule"}
                  </Button>
                </div>
              </CardContent>
            </Card>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmApplyOpen(true)}
              disabled={isApplyingPlan || !plannerResult}
            >
              {isApplyingPlan ? "Applying..." : "Apply Plan"}
            </Button>
            {plannerResult ? (
              <div className="text-xs text-muted-foreground">
                <p>Parser: {plannerResult.parser}</p>
                {plannerResult.aiProviderUsed ? (
                  <p>Provider: {plannerResult.aiProviderUsed}</p>
                ) : null}
                {plannerResult.parserReason ? (
                  <p>{plannerResult.parserReason}</p>
                ) : null}
              </div>
            ) : null}
          </div>

          {plannerResult ? (
            <div className="space-y-3 rounded-md border p-3">
              <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
                <div>Students: {plannerResult.plan.totals.totalStudents}</div>
                <div>Required Sessions: {plannerResult.plan.totals.requiredSessions}</div>
                <div>Scheduled: {plannerResult.plan.totals.scheduledSessions}</div>
                <div>Unscheduled: {plannerResult.plan.totals.unscheduledSessions}</div>
              </div>

              {plannerResult.plan.warnings.length > 0 ? (
                <div className="space-y-1 text-xs text-amber-700">
                  {plannerResult.plan.warnings.map((warning) => (
                    <p key={warning}>{warning}</p>
                  ))}
                </div>
              ) : null}

              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                {plannerResult.plan.schedule.map((day) => (
                  <div key={day.day} className="rounded-md border p-2">
                    <p className="text-sm font-medium">{day.day}</p>
                    {day.sessions.length === 0 ? (
                      <p className="mt-1 text-xs text-muted-foreground">No sessions</p>
                    ) : (
                      <div className="mt-1 space-y-1">
                        {day.sessions.map((session) => (
                          <div
                            key={`${day.day}-${session.slotIndex}-${session.className}`}
                            className="rounded border px-2 py-1 text-xs"
                          >
                            <p className="font-medium">
                              Slot {session.slotIndex}: {session.className}
                            </p>
                            <p className="text-muted-foreground">
                              {session.board ?? "Mixed board"} · {session.grade ?? "Mixed grade"} · {session.studentCount} students
                            </p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {session.studentIds.map((studentId) => {
                                const student = studentsById.get(studentId);
                                const firstName = student?.user.firstName?.trim() ?? "";
                                const lastName = student?.user.lastName?.trim() ?? "";
                                const label = `${firstName} ${lastName}`.trim() || `Student #${studentId}`;
                                const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "S";
                                const studentIndex = students.findIndex((entry) => entry.id === studentId);
                                const colorClass = getAvatarColor(studentIndex >= 0 ? studentIndex : 0);

                                return (
                                  <Badge key={`${day.day}-${session.slotIndex}-${studentId}`} variant="secondary" className="gap-1 rounded-full px-1.5 py-0.5 text-[10px]">
                                    <span className={`inline-flex h-4 w-4 items-center justify-center rounded ${colorClass}`}>
                                      {initials}
                                    </span>
                                    <span>{label}</span>
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </CardContent>
        </Card>
        </div>
      </TooltipProvider>
    </>
  );
}
