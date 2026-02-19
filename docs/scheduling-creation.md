# Scheduling Feature: Creation Architecture

## 1. Objective
The creation flow defines recurring teaching slots with:
- a time window (`startTime`, `endTime`)
- an activation interval (`startDate`, optional `endDate`)
- selected weekdays
- capacity (`maxStudents`)

Primary implementation points:
- `components/AddSlotDialog.tsx`
- `app/actions/createRecurringSchedule.ts`
- `app/api/recurring-schedules/route.ts`
- `prisma/schema.prisma`

## 2. Domain Model Design
The recurring model is normalized into:
- `RecurringSchedule`: time band, date bounds, capacity, teacher ownership
- `RecurringDay`: enabled weekdays per recurring schedule
- `RecurringException`: per-date override/delete markers
- `RecurringDayAssignment`: student assignment at schedule + weekday granularity

Why this is thoughtful:
- It separates stable recurrence rules from volatile per-date edits.
- It avoids materializing all future instances in the database.
- It supports editing one occurrence without mutating the base rule.

## 3. Request and Validation Pipeline
Client flow (`AddSlotDialog`):
- Captures input in structured controls (`time`, `date`, weekday checkboxes, numeric capacity).
- Performs immediate temporal validation (`endTime > startTime`) with inline feedback.
- Emits a browser event (`schedule-created`) for decoupled refresh.

Server action flow (`createRecurringSchedule`):
- Authenticates via Clerk and resolves teacher identity.
- Maps weekday labels to enum-like day tokens (`MON`...`SUN`).
- Persists schedule and child day rows in one create operation.

Time handling choice:
- `combine(date, time)` uses `new Date(...Z)` to force UTC interpretation.
- This intentionally reduces local timezone drift between server/client transforms.

## 4. Engineering Tradeoffs
### Pros
- Clear data boundaries: recurrence rule vs exception vs assignment.
- Good extensibility: future support for holiday closures and one-off shifts already fits model.
- Capacity stored at schedule level enables fast enrollment checks.

### Cons
- Dual input validation (client + server) is partial; some invariants are still implicit.
- Day mapping currently relies on string keys (`Monday` etc.), which is typo-sensitive.
- Creation currently uses a server action while edits use API routes, adding two integration styles.

### Tradeoffs Chosen
- **Normalization over denormalization**: more joins, but dramatically better correctness for edits.
- **UTC normalization over local times**: better cross-environment consistency, but less intuitive local-time debugging.
- **Event-based refresh over shared global state**: simpler local coupling, but weaker typing/traceability than a centralized state bus.

## 5. UI/UX Ingenuity in Creation
Notable UI decisions:
- Modal form isolates a high-impact operation from the main calendar.
- Constraint-driven input widgets (`time`, `date`, numeric min) reduce invalid payloads.
- Live validation keeps the user in-flow rather than failing after submit.

Why this is effective:
- Lowers user error rate before network round-trips.
- Keeps the primary scheduling surface visually uncluttered.
- Makes the creation task predictable and repeatable.

## 6. Operational Risks and Mitigations
Current risk surfaces:
- Potential timezone ambiguity if downstream consumers assume local times.
- No explicit conflict detection for overlapping schedules at creation time.
- Event-based cache refresh can miss updates if listener lifecycle changes.

Pragmatic mitigations:
- Add server-side invariant checks (`start < end`, `endDate >= startDate`, overlap policy).
- Standardize day/value types end-to-end with shared enums.
- Transition to explicit query invalidation (or a typed data-fetching layer) for refresh reliability.

## 7. Architectural Assessment
The creation feature is well designed for a production-grade scheduler:
- Model choices prioritize correctness under edits.
- API boundaries are straightforward and maintainable.
- UI choices are intentionally constrained to reduce invalid user states.

Main opportunity is consolidation: unify validation, transport style, and refresh strategy to reduce long-term complexity.
