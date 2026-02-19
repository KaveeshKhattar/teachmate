# Scheduling Feature: Viewing and Rendering Architecture

## 1. Objective
The viewing flow renders a weekly calendar that merges:
- recurring slots expanded into concrete week occurrences
- one-off slots fetched directly from `Slot`
- per-day recurring student assignments
- per-date exception overrides/deletions

Primary implementation points:
- `components/SlotScheduler.tsx`
- `components/scheduler/useScheduler.ts`
- `components/scheduler/utils.ts`
- `components/scheduler/useDragSlot.ts`
- `app/api/recurring-schedules/route.ts`
- `app/api/slots/route.ts`
- `app/api/recurring-day-assignments/route.ts`

## 2. View Model Strategy
The viewer uses `UISlot` as a unified projection format for both recurring and single slots.

Thoughtful design choice:
- Back-end entities remain specialized.
- Front-end consumes one render contract (`UISlot`) to simplify layout logic.

This is implemented by:
- `expandForWeek(...)` for recurring schedules
- `mapDbSlotToUiSlot(...)` for single-instance slots
- `useScheduler` to compose datasets and enrich with assignment maps

## 3. Expansion Engine and Exception Semantics
`expandForWeek` is the core recurrence resolver:
- Computes week dates from `weekStart`.
- Filters by enabled weekday, `startDate`, and optional `endDate`.
- Applies exception map by date key.
- Treats exception rows without override times as deletion markers.

Why this is strong:
- Recurrence logic is deterministic and local to one utility boundary.
- Exception behavior is explicit and composable.
- Per-day assignments are layered cleanly after recurrence expansion.

## 4. UI Rendering Ingenuity
The calendar uses a dual-layer rendering approach:
- Base grid: static 30-minute cells and day columns.
- Overlay layer: absolutely positioned slot cards by minute offsets.

Positioning model:
- `top = (startMinutes / 30) * ROW_HEIGHT`
- `height = ((endMinutes - startMinutes) / 30) * ROW_HEIGHT`

Pros of this approach:
- Avoids expensive nested layout calculations per row.
- Gives precise visual placement and continuous drag feedback.
- Keeps time grid semantics stable while slot UI can evolve independently.

Additional intelligent details:
- Weekday highlighting and current-day emphasis improve scanability.
- Slot cards summarize occupancy and names with truncation controls.
- Loading/pending position state supports optimistic visual continuity during edits.

## 5. Interaction Model and Tradeoffs
Drag-reschedule flow:
- `useDragSlot` tracks pixel deltas and snaps to 30-minute increments.
- Drag end prompts scope decision (`instance` vs `all` recurrence).
- API routes apply either per-date exception patch or recurrence-wide patch.

### Pros
- Highly intuitive direct manipulation for schedule changes.
- Explicit scope choice prevents accidental global edits.
- Pending visual state reduces perceived latency.

### Cons
- Window-level mouse listeners add lifecycle complexity.
- Keyboard accessibility for drag behavior is limited.
- Optimistic state can briefly diverge from server truth if requests fail.

### Tradeoffs Chosen
- **Client-side expansion vs server-side pre-expansion**: lower backend complexity and flexible UI transforms, at cost of client compute.
- **Absolute overlay vs semantic table rows for slots**: better visual precision, with higher custom math responsibility.
- **Multiple fetch endpoints in parallel**: better latency profile, but requires reconciliation logic in `useScheduler`.

## 6. Performance and Scalability Characteristics
Current strengths:
- Parallel fetching (`Promise.all`) lowers initial wait.
- Memoized derived structures (`slotsByDay`, assignment maps) reduce repeated work.
- Week-bounded rendering keeps DOM size predictable.

Potential pressure points:
- Large schedule counts can increase client expansion cost.
- Full reload after edits is simple but not minimal-diff efficient.
- Repeated name formatting/mapping can become hot in very large datasets.

## 7. Architectural Assessment
The viewing feature shows strong product engineering:
- A robust intermediate model (`UISlot`) keeps rendering coherent.
- Recurrence + exception semantics are implemented with clear logic.
- UI rendering is intentionally engineered for precision and responsiveness.

The main long-term optimization path is incremental data syncing and stronger interaction accessibility, not a redesign of core architecture.
