# Scheduling Feature: Generate Flow and Architecture

## 1. Objective
The generate schedule feature produces a weekly assignment plan and applies it to recurring slots.

It supports two entry modes:
- deterministic generation from dropdown constraints
- natural-language adjustment layered on top of those constraints

Primary implementation points:
- `app/teacher/ai-scheduler/AISchedulerClient.tsx`
- `app/api/schedule/plan/route.ts`
- `lib/ai-scheduler.ts`
- `app/api/schedule/apply/route.ts`
- `app/api/schedule/create-missing-slots/route.ts`
- `prisma/schema.prisma`

## 2. Domain Model Fit
The generator does not create ad-hoc assignment tables. It writes into existing recurring scheduling tables:
- `RecurringSchedule`: the slot inventory (time window, days, capacity)
- `RecurringDay`: enabled weekdays per recurring slot
- `RecurringDayAssignment`: final student-to-slot/day mapping

Why this decision matters:
- Generated output remains compatible with manual scheduler views/edit flows.
- The system avoids maintaining two scheduling truths (AI vs non-AI).
- Capacity and weekday constraints are enforced against the same canonical model.

## 3. End-to-End Flow
### 3.1 UI planning
In `AISchedulerClient`:
- user sets base constraints (`days/week`, `hours/class`, `classes/day`, `students/class`, board/grade grouping mode)
- optional instruction is added for AI adjustment mode
- UI posts to `POST /api/schedule/plan`

Request patterns:
- create mode: `{ constraints }`
- adjust mode: `{ prompt, constraints }`

### 3.2 Constraint parsing and normalization
In `POST /api/schedule/plan`:
- auth is resolved via `getTeacherIdFromAuth()`
- prompt and/or direct constraints are accepted
- relative words in prompt are materialized (`today`, `tomorrow`) before parsing
- parser path:
  - preferred provider from `SCHEDULER_AI_PROVIDER` (`openai` or `huggingface`)
  - fallback chain if provider fails
  - final fallback to regex parser (`parseConstraintsFromPromptFallback`)
- final constraints are merged with UI-provided constraints and normalized via `sanitizeConstraints`

Output includes parser diagnostics:
- `parser`: `ai-sdk` | `fallback` | `direct-constraints`
- `parserReason`
- `aiProviderUsed`

### 3.3 Plan construction
In `buildSchedulePlan(...)` (`lib/ai-scheduler.ts`):
- students are grouped by board/grade depending on filter flags
- groups are chunked into batches by `studentsPerHour`
- demand units are generated from `classHours` and per-student class quotas (`numOfClassesPerWeek` when set)
- sessions are placed greedily into day buckets with constraints:
  - only selected teaching days (`daysPerWeek`, minus `offDays`)
  - max `classesPerDay`
  - avoid placing same batch multiple times on one day
  - prefer `preferredDays`, then lower-load buckets
- overflow is returned as `unscheduled` with warnings

### 3.4 Apply step
In `POST /api/schedule/apply`:
- validates and normalizes plan shape (`day`, `slotIndex`, `studentIds`)
- loads teacher recurring slots and student scope
- maps each planned `slotIndex` to nth slot for that day (ordered by start time)
- validates capacity and teacher ownership
- if required slot index exceeds current slot inventory, returns `409` with details
- on success:
  - deletes all existing recurring assignments for teacher
  - recreates assignments from generated plan (`createMany`, `skipDuplicates`)

### 3.5 Missing-slot recovery
If apply returns `409`, UI shows confirmation and calls:
- `POST /api/schedule/create-missing-slots`

This route:
- derives missing slot count per day from requested max `slotIndex`
- creates new `RecurringSchedule` rows for missing positions
- uses `hoursPerClass` to compute duration (`>= 30` min)
- seeds first new slot from last existing slot end-time (or default 09:00 UTC when none exists)
- assigns `maxStudents` from request/plan constraints fallback

UI then retries `POST /api/schedule/apply`.

## 4. Key Technical Decisions
### 4.1 Plan-first, write-later architecture
Decision:
- planner returns a preview (`plan`, totals, warnings) before mutating DB

Tradeoff:
- pro: safer UX, user can inspect output before destructive replace
- con: requires second network step and conflict handling between preview/apply

### 4.2 Layered parser strategy
Decision:
- AI provider parsing with strict schema intent, then deterministic fallback parser

Tradeoff:
- pro: resilient behavior when model/API unavailable
- con: fallback parser has lower semantic accuracy for complex instructions

### 4.3 Full replacement apply semantics
Decision:
- apply clears teacher recurring assignments and writes generated set

Tradeoff:
- pro: simple, deterministic state with no stale leftovers
- con: no partial merge semantics; concurrent edits can be overwritten

### 4.4 Slot-index abstraction
Decision:
- plan references slot positions (`slotIndex`) per day instead of schedule IDs

Tradeoff:
- pro: stable plan abstraction independent of DB IDs during generation
- con: requires consistent day-slot ordering and slot inventory reconciliation

### 4.5 Reuse of recurring model for generated slots
Decision:
- missing slots are created as standard `RecurringSchedule` records

Tradeoff:
- pro: generated slots immediately interoperable with calendar/editor
- con: automatic slot creation can change schedule topology more aggressively than some users expect

## 5. Validation and Safety Boundaries
Current safeguards:
- teacher-scoped auth on all schedule routes
- payload shape normalization before planning/apply
- capacity guard per target slot in apply
- 409 conflict for insufficient slot inventory
- dedupe key on `(scheduleId, day, studentId)` before write

Known limits:
- no optimistic concurrency/version check between preview and apply
- apply is teacher-wide replacement, not selective update
- slot creation defaults to UTC-day anchor and sequential extension, not local-time aware policies

## 6. Performance Characteristics
Strengths:
- planning is in-memory and linear over students/groups/demand units
- DB writes are batched (`createMany`) and wrapped in transactions
- parser/provider metadata helps operational debugging

Pressure points:
- large student sets can increase demand generation and greedy placement time
- apply currently performs delete-all then recreate, which can be heavy at scale
- repeated slot-creation loops are per-slot inserts inside transaction

## 7. Architectural Assessment
The generate feature is a pragmatic, production-usable design:
- clear separation between planning and mutation
- robust fallback path when AI parsing is unavailable
- safe integration with existing recurring schedule model

Main future improvements:
- add revision checks to prevent stale-plan apply
- support partial/targeted apply modes
- make slot auto-creation policy configurable (timezone and preferred hour windows)
