import type { Student } from "@/types/scheduler";

const DAY_ORDER = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;

export type PlannerDay = (typeof DAY_ORDER)[number];

export interface ClassHourConstraint {
  className: string;
  hoursPerWeek: number;
}

export interface SchedulerFilters {
  sameBoardOnly: boolean;
  sameGradeOnly: boolean;
}

export interface SchedulerConstraints {
  daysPerWeek: number;
  classesPerDay: number;
  studentsPerHour: number;
  classHours: ClassHourConstraint[];
  filters: SchedulerFilters;
  offDays: PlannerDay[];
  preferredDays: PlannerDay[];
}

interface StudentGroup {
  key: string;
  board: string | null;
  grade: string | null;
  studentIds: number[];
}

interface StudentBatch {
  batchId: string;
  board: string | null;
  grade: string | null;
  studentIds: number[];
}

interface DemandUnit {
  demandId: string;
  className: string;
  batch: StudentBatch;
}

export interface ScheduledSession {
  slotIndex: number;
  className: string;
  board: string | null;
  grade: string | null;
  studentIds: number[];
  studentCount: number;
}

export interface ScheduledDay {
  day: PlannerDay;
  sessions: ScheduledSession[];
}

export interface SchedulerPlanResult {
  constraints: SchedulerConstraints;
  totals: {
    totalStudents: number;
    totalGroups: number;
    totalBatches: number;
    requiredSessions: number;
    availableSessions: number;
    scheduledSessions: number;
    unscheduledSessions: number;
  };
  schedule: ScheduledDay[];
  unscheduled: Array<{
    className: string;
    board: string | null;
    grade: string | null;
    studentIds: number[];
  }>;
  warnings: string[];
}

function clampInt(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.trunc(value)));
}

function normalizeClassHours(value: unknown): ClassHourConstraint[] {
  if (!Array.isArray(value)) return [];

  const map = new Map<string, number>();

  value.forEach((row) => {
    if (!row || typeof row !== "object") return;
    const obj = row as Record<string, unknown>;
    const className = typeof obj.className === "string" ? obj.className.trim() : "";
    const rawHours = Number(obj.hoursPerWeek);
    if (!className || !Number.isFinite(rawHours) || rawHours <= 0) return;

    const normalizedName = className.slice(0, 60);
    map.set(normalizedName, (map.get(normalizedName) ?? 0) + clampInt(rawHours, 1, 40));
  });

  return [...map.entries()].map(([className, hoursPerWeek]) => ({ className, hoursPerWeek }));
}

function parseBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }
  return fallback;
}

export function sanitizeConstraints(value: unknown): SchedulerConstraints {
  const obj = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  const filters = (obj.filters && typeof obj.filters === "object"
    ? obj.filters
    : {}) as Record<string, unknown>;

  const classHours = normalizeClassHours(obj.classHours);

  const daysPerWeek = clampInt(Number(obj.daysPerWeek) || 5, 1, 7);
  const classesPerDay = clampInt(Number(obj.classesPerDay) || 4, 1, 24);
  const studentsPerHour = clampInt(Number(obj.studentsPerHour) || 4, 1, 100);
  const offDays = Array.isArray(obj.offDays)
    ? obj.offDays
        .filter((day): day is PlannerDay => typeof day === "string" && DAY_ORDER.includes(day as PlannerDay))
        .filter((day, index, arr) => arr.indexOf(day) === index)
    : [];
  const preferredDays = Array.isArray(obj.preferredDays)
    ? obj.preferredDays
        .filter((day): day is PlannerDay => typeof day === "string" && DAY_ORDER.includes(day as PlannerDay))
        .filter((day, index, arr) => arr.indexOf(day) === index)
    : [];

  return {
    daysPerWeek,
    classesPerDay,
    studentsPerHour,
    classHours,
    filters: {
      sameBoardOnly: parseBoolean(filters.sameBoardOnly, true),
      sameGradeOnly: parseBoolean(filters.sameGradeOnly, true),
    },
    offDays,
    preferredDays,
  };
}

function splitStudentsIntoGroups(
  students: Student[],
  filters: SchedulerFilters
): StudentGroup[] {
  const map = new Map<string, StudentGroup>();

  for (const student of students) {
    const board = student.board?.trim() || null;
    const grade = student.grade?.trim() || null;
    const boardPart = filters.sameBoardOnly ? board ?? "UNKNOWN_BOARD" : "ANY_BOARD";
    const gradePart = filters.sameGradeOnly ? grade ?? "UNKNOWN_GRADE" : "ANY_GRADE";
    const key = `${boardPart}|${gradePart}`;

    const group = map.get(key) ?? { key, board: boardPart === "ANY_BOARD" ? null : board, grade: gradePart === "ANY_GRADE" ? null : grade, studentIds: [] };
    group.studentIds.push(student.id);
    map.set(key, group);
  }

  return [...map.values()].sort((a, b) => a.key.localeCompare(b.key));
}

function buildBatches(groups: StudentGroup[], studentsPerHour: number): StudentBatch[] {
  const result: StudentBatch[] = [];

  for (const group of groups) {
    for (let i = 0; i < group.studentIds.length; i += studentsPerHour) {
      const studentIds = group.studentIds.slice(i, i + studentsPerHour);
      result.push({
        batchId: `${group.key}#${Math.floor(i / studentsPerHour) + 1}`,
        board: group.board,
        grade: group.grade,
        studentIds,
      });
    }
  }

  return result;
}

function buildDemand(
  constraints: SchedulerConstraints,
  batches: StudentBatch[],
  students: Student[]
): DemandUnit[] {
  const demand: DemandUnit[] = [];
  const defaultWeeklyClasses = constraints.classHours.reduce(
    (sum, classConfig) => sum + classConfig.hoursPerWeek,
    0
  );
  const remainingPerStudent = new Map<number, number>(
    students.map((student) => [
      student.id,
      Math.max(
        0,
        Math.trunc(student.numOfClassesPerWeek ?? defaultWeeklyClasses)
      ),
    ])
  );
  const batchCursor = new Map<string, number>();

  function pickStudentsForBatch(batch: StudentBatch): number[] {
    const active = batch.studentIds.filter(
      (studentId) => (remainingPerStudent.get(studentId) ?? 0) > 0
    );
    if (active.length === 0) return [];

    const batchOrder = batch.studentIds;
    const startCursor = batchCursor.get(batch.batchId) ?? 0;
    const ordered = [
      ...batchOrder.slice(startCursor),
      ...batchOrder.slice(0, startCursor),
    ].filter((studentId) => (remainingPerStudent.get(studentId) ?? 0) > 0);

    const chosen = ordered.slice(0, constraints.studentsPerHour);
    if (chosen.length === 0) return [];

    chosen.forEach((studentId) => {
      const remaining = remainingPerStudent.get(studentId) ?? 0;
      remainingPerStudent.set(studentId, Math.max(0, remaining - 1));
    });

    const lastChosen = chosen[chosen.length - 1];
    const nextIndex = batchOrder.findIndex((id) => id === lastChosen);
    batchCursor.set(
      batch.batchId,
      nextIndex >= 0 ? (nextIndex + 1) % batchOrder.length : 0
    );

    return chosen;
  }

  for (const classConfig of constraints.classHours) {
    for (let i = 0; i < classConfig.hoursPerWeek; i += 1) {
      for (const batch of batches) {
        const chosenStudentIds = pickStudentsForBatch(batch);
        if (chosenStudentIds.length === 0) continue;

        demand.push({
          demandId: `${batch.batchId}|${classConfig.className}|${i + 1}`,
          className: classConfig.className,
          batch: {
            ...batch,
            studentIds: chosenStudentIds,
          },
        });
      }
    }
  }

  // Deterministic distribution that avoids front-loading one class.
  demand.sort((a, b) => {
    if (a.className !== b.className) return a.className.localeCompare(b.className);
    return a.batch.batchId.localeCompare(b.batch.batchId);
  });

  return demand;
}

export function buildSchedulePlan(
  students: Student[],
  rawConstraints: unknown
): SchedulerPlanResult {
  const constraints = sanitizeConstraints(rawConstraints);
  const availableDays = DAY_ORDER.filter((day) => !constraints.offDays.includes(day));
  const preferredDaySet = new Set(
    constraints.preferredDays.filter((day) => availableDays.includes(day))
  );
  const prioritizedDays = [
    ...availableDays.filter((day) => preferredDaySet.has(day)),
    ...availableDays.filter((day) => !preferredDaySet.has(day)),
  ];
  const selectedDays = prioritizedDays.slice(0, constraints.daysPerWeek);
  const preferredDayRank = new Map(
    constraints.preferredDays.map((day, index) => [day, index] as const)
  );
  const warnings: string[] = [];

  if (constraints.classHours.length === 0) {
    warnings.push("No class-hour constraints were provided. Returning an empty schedule.");
  }
  if (selectedDays.length < constraints.daysPerWeek) {
    warnings.push(
      `Only ${selectedDays.length} teaching day(s) available after off-day preferences. Reduce days/week or remove off days.`
    );
  }

  const groups = splitStudentsIntoGroups(students, constraints.filters);
  const batches = buildBatches(groups, constraints.studentsPerHour);
  const demand = buildDemand(constraints, batches, students);
  const availableSessions = selectedDays.length * constraints.classesPerDay;

  const dayBuckets: ScheduledDay[] = selectedDays.map((day) => ({ day, sessions: [] }));
  const dayBatchMap: Array<Set<string>> = dayBuckets.map(() => new Set<string>());

  const unscheduled: DemandUnit[] = [];
  for (const unit of demand) {
    let placed = false;

    const orderedDayIndexes = dayBuckets
      .map((bucket, index) => ({
        index,
        day: bucket.day,
        load: bucket.sessions.length,
        hasBatch: dayBatchMap[index].has(unit.batch.batchId),
      }))
      .sort((a, b) => {
        const aPreferred = preferredDayRank.get(a.day) ?? Number.POSITIVE_INFINITY;
        const bPreferred = preferredDayRank.get(b.day) ?? Number.POSITIVE_INFINITY;
        if (aPreferred !== bPreferred) return aPreferred - bPreferred;
        if (a.hasBatch !== b.hasBatch) return Number(a.hasBatch) - Number(b.hasBatch);
        if (a.load !== b.load) return a.load - b.load;
        return a.index - b.index;
      })
      .map((entry) => entry.index);

    for (const dayIndex of orderedDayIndexes) {
      const bucket = dayBuckets[dayIndex];
      if (bucket.sessions.length >= constraints.classesPerDay) continue;
      if (dayBatchMap[dayIndex].has(unit.batch.batchId)) continue;

      bucket.sessions.push({
        slotIndex: bucket.sessions.length + 1,
        className: unit.className,
        board: unit.batch.board,
        grade: unit.batch.grade,
        studentIds: unit.batch.studentIds,
        studentCount: unit.batch.studentIds.length,
      });
      dayBatchMap[dayIndex].add(unit.batch.batchId);
      placed = true;
      break;
    }

    if (!placed) unscheduled.push(unit);
  }

  if (unscheduled.length > 0) {
    warnings.push(
      `Could not place ${unscheduled.length} session(s). Increase days per week, classes per day, or reduce required hours.`
    );
  }

  const unscheduledOutput = unscheduled.map((item) => ({
    className: item.className,
    board: item.batch.board,
    grade: item.batch.grade,
    studentIds: item.batch.studentIds,
  }));

  return {
    constraints,
    totals: {
      totalStudents: students.length,
      totalGroups: groups.length,
      totalBatches: batches.length,
      requiredSessions: demand.length,
      availableSessions,
      scheduledSessions: demand.length - unscheduled.length,
      unscheduledSessions: unscheduled.length,
    },
    schedule: dayBuckets,
    unscheduled: unscheduledOutput,
    warnings,
  };
}

function findNumeric(prompt: string, patterns: RegExp[], fallback: number): number {
  for (const pattern of patterns) {
    const match = prompt.match(pattern);
    if (match?.[1]) {
      const parsed = Number(match[1]);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return fallback;
}

function inferClassHoursFromPrompt(prompt: string): ClassHourConstraint[] {
  const captures = [...prompt.matchAll(/([A-Za-z][A-Za-z0-9\s]{1,30})\s*[:=-]\s*(\d+)\s*(?:h|hr|hrs|hour|hours)/gi)];
  if (captures.length === 0) {
    const genericHours = findNumeric(prompt, [/(?:hours?\s*per\s*class(?:es)?|each\s*class)\D{0,10}(\d+)/i], 1);
    return [{ className: "General Class", hoursPerWeek: clampInt(genericHours, 1, 40) }];
  }

  return captures
    .map((match) => ({
      className: match[1].trim().replace(/\s+/g, " ").slice(0, 60),
      hoursPerWeek: clampInt(Number(match[2]), 1, 40),
    }))
    .filter((item) => item.className.length > 0);
}

function inferOffDaysFromPrompt(prompt: string): PlannerDay[] {
  const dayMappings: Array<{ key: PlannerDay; pattern: RegExp }> = [
    { key: "MON", pattern: /\b(?:mon|monday)\b/i },
    { key: "TUE", pattern: /\b(?:tue|tues|tuesday)\b/i },
    { key: "WED", pattern: /\b(?:wed|wednesday)\b/i },
    { key: "THU", pattern: /\b(?:thu|thur|thurs|thursday)\b/i },
    { key: "FRI", pattern: /\b(?:fri|friday)\b/i },
    { key: "SAT", pattern: /\b(?:sat|saturday)\b/i },
    { key: "SUN", pattern: /\b(?:sun|sunday)\b/i },
  ];

  const normalized = prompt.toLowerCase();
  if (!/\b(?:off|day\s*off|no\s+class|no\s+classes|unavailable|leave|cancel|cancelled)\b/.test(normalized)) {
    return [];
  }

  return dayMappings
    .filter((entry) => entry.pattern.test(prompt))
    .map((entry) => entry.key);
}

function inferMoveDaysFromPrompt(prompt: string): { sourceDays: PlannerDay[]; targetDays: PlannerDay[] } {
  const dayTokenToCode = new Map<string, PlannerDay>([
    ["mon", "MON"],
    ["monday", "MON"],
    ["tue", "TUE"],
    ["tues", "TUE"],
    ["tuesday", "TUE"],
    ["wed", "WED"],
    ["wednesday", "WED"],
    ["thu", "THU"],
    ["thur", "THU"],
    ["thurs", "THU"],
    ["thursday", "THU"],
    ["fri", "FRI"],
    ["friday", "FRI"],
    ["sat", "SAT"],
    ["saturday", "SAT"],
    ["sun", "SUN"],
    ["sunday", "SUN"],
  ]);

  const matches = [...prompt.matchAll(/\b(?:move|shift|reassign|reschedule)\s+([a-z]+)\b[\s\S]{0,40}?\bto\s+([a-z]+)\b/gi)];
  const sourceDays: PlannerDay[] = [];
  const targetDays: PlannerDay[] = [];

  for (const match of matches) {
    const source = dayTokenToCode.get((match[1] ?? "").toLowerCase());
    const target = dayTokenToCode.get((match[2] ?? "").toLowerCase());
    if (source) sourceDays.push(source);
    if (target) targetDays.push(target);
  }

  return {
    sourceDays: sourceDays.filter((day, index, arr) => arr.indexOf(day) === index),
    targetDays: targetDays.filter((day, index, arr) => arr.indexOf(day) === index),
  };
}

function inferPreferredDaysFromPrompt(prompt: string): PlannerDay[] {
  const actionable = /\b(?:reassign|reschedule|move|shift|assign)\b/i.test(prompt);
  if (!actionable) return [];

  const patterns: Array<{ key: PlannerDay; pattern: RegExp }> = [
    { key: "MON", pattern: /\bto\s+(?:mon|monday)\b/i },
    { key: "TUE", pattern: /\bto\s+(?:tue|tues|tuesday)\b/i },
    { key: "WED", pattern: /\bto\s+(?:wed|wednesday)\b/i },
    { key: "THU", pattern: /\bto\s+(?:thu|thur|thurs|thursday)\b/i },
    { key: "FRI", pattern: /\bto\s+(?:fri|friday)\b/i },
    { key: "SAT", pattern: /\bto\s+(?:sat|saturday)\b/i },
    { key: "SUN", pattern: /\bto\s+(?:sun|sunday)\b/i },
  ];

  return patterns.filter((row) => row.pattern.test(prompt)).map((row) => row.key);
}

export function parseConstraintsFromPromptFallback(prompt: string): SchedulerConstraints {
  const daysPerWeek = clampInt(
    findNumeric(prompt, [/(?:days?\s*per\s*week|for)\D{0,10}(\d+)/i, /(\d+)\s*days?\s*(?:a|per)\s*week/i], 5),
    1,
    7
  );

  const classesPerDay = clampInt(
    findNumeric(prompt, [/(?:classes?\s*per\s*day|max\s*classes?\s*per\s*day)\D{0,10}(\d+)/i], 4),
    1,
    24
  );

  const studentsPerHour = clampInt(
    findNumeric(prompt, [/(?:students?\s*per\s*hour|per\s*hour)\D{0,10}(\d+)/i], 4),
    1,
    100
  );

  const normalizedPrompt = prompt.toLowerCase();
  const sameBoardOnly = /\bsame\s+board\b/.test(normalizedPrompt)
    ? true
    : /\bmix(?:ed)?\s+board\b/.test(normalizedPrompt)
      ? false
      : true;
  const sameGradeOnly = /\bsame\s+grade\b/.test(normalizedPrompt)
    ? true
    : /\bmix(?:ed)?\s+grade\b/.test(normalizedPrompt)
      ? false
      : true;
  const moveDays = inferMoveDaysFromPrompt(prompt);
  const offDays = [...new Set([...inferOffDaysFromPrompt(prompt), ...moveDays.sourceDays])];
  const preferredDays = [...new Set([...inferPreferredDaysFromPrompt(prompt), ...moveDays.targetDays])];

  return {
    daysPerWeek,
    classesPerDay,
    studentsPerHour,
    classHours: inferClassHoursFromPrompt(prompt),
    filters: { sameBoardOnly, sameGradeOnly },
    offDays,
    preferredDays,
  };
}
