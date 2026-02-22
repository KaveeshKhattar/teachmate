# TeachMate

TeachMate is a role-based tuition management platform built with **Next.js App Router**, **Clerk**, **Prisma**, **PostgreSQL (Supabase)**, and **shadcn/ui**.

It helps teachers manage schedules, students, and monthly payments while giving students a clean interface to view classes and update payment status.

## Features

### Authentication and Role-Based Access
- Clerk-based sign in/sign up flow.
- Role-driven app routing (`TEACHER` / `STUDENT`) using Clerk `unsafeMetadata`.
- Protected teacher and student route groups.
- Onboarding flow that captures role-specific profile data and syncs it to Prisma.

### Teacher Features
- Teacher workspace home with quick navigation.
- Students page with editable fee and classes-per-week fields.
- Weekly schedule dashboard with:
  - recurring schedule visualization
  - one-off slot handling
  - slot drag/move support
  - edit and delete controls
  - add-slot dialog (custom days, date range, time, capacity)
- Monthly payments dashboard:
  - paid/unpaid student status
  - monthly navigation
  - completion summary

### Student Features
- Student workspace home with quick navigation.
- Student dashboard with read-only schedule view.
- Payments page where student marks current month as paid.
- Student profile page.
- Dedicated student sidebar for classes, payments, profile.

### Payments System
- Prisma-backed monthly payment model (`studentId + year + month` uniqueness).
- Student API endpoint to mark payment status.
- Teacher dashboard showing payment status by month.

### UX and Loading States
- Shadcn-based UI across pages.
- Suspense and skeleton loading states on dashboards.
- Improved onboarding error visibility and validation.

## Technical Proficiency Demonstrated

This project intentionally showcases full-stack engineering proficiency:

- **App Router architecture**: server components + client components used appropriately.
- **Secure API design**: auth-checked route handlers and role-aware data access.
- **Data modeling**: normalized Prisma schema for users, teacher/student relations, schedules, assignments, and payments.
- **State + async coordination**: scheduler hooks, optimistic/interactive updates, API synchronization.
- **Reliability engineering**: hardened onboarding/profile sync paths, defensive fallback logic, graceful error handling.
- **UI engineering**: componentized shadcn patterns, sidebars, dialogs, responsive layouts, accessible controls.
- **Type safety**: TypeScript-first implementation with runtime validation and typed API interactions.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Auth**: Clerk
- **ORM**: Prisma
- **Database**: PostgreSQL (Supabase)
- **UI**: shadcn/ui + Tailwind CSS
- **Icons**: lucide-react

## Project Structure

- `app/` - routes, layouts, pages, API handlers, server actions
- `components/` - reusable UI and feature components
- `prisma/` - schema and migrations
- `lib/` - Prisma client and utilities

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment variables (`.env`):
- Clerk keys
- Database connection strings (`DIRECT_URL`, etc.)
- Scheduler AI parsing (optional):
  - `SCHEDULER_AI_PROVIDER=openai|huggingface`
  - `OPENAI_API_KEY=...` (if using OpenAI)
  - `HF_TOKEN=...` (if using Hugging Face)
  - `HUGGINGFACE_MODEL=meta-llama/Llama-3.1-8B-Instruct:novita` (optional override)

3. Generate Prisma client:

```bash
pnpm prisma generate
```

4. Run migrations:

```bash
pnpm prisma migrate dev
```

5. Start development server:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm exec tsc --noEmit
```

## Notes

- If Clerk webhooks are delayed, profile synchronization still occurs via onboarding/API fallback logic.
- Role metadata (`TEACHER` / `STUDENT`) drives routing, layout, and API behavior.
