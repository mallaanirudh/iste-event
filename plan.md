# The Mega Event Management Portal - Development Plan (`PLAN.md`)

## Phase 1: Project Setup & Infrastructure
- [x] **Objective 1.1:** Initialize Next.js project with App Router, TypeScript, and Tailwind CSS. (Completed)
- [x] **Objective 1.2:** Install and configure React Query (TanStack Query) for state management. (Completed)
- [x] **Objective 1.3:** Setup Supabase client and Auth configuration in the Next.js app.
  - *Note:* Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env variables.
- [x] **Objective 1.4:** Setup basic routing structure (`/`, `/register`, `/dashboard`, `/poc/scoring`, `/admin`) and layouts.

## Phase 2: Database Schema & Migration
- [x] **Objective 2.1:** Create Supabase SQL migration for `teams` table (`id`, custom `#TEAM001` ID, `is_auto_grouped`, `is_disqualified`, etc.).
- [x] **Objective 2.2:** Create Supabase SQL migration for `participants` table (`team_id` FK, `is_individual_registration`, `status`).
- [x] **Objective 2.3:** Create Supabase SQL migration for `events_sig` and `sig_pocs` tables (mapping SIG events, venues, timings, and POC users).
- [x] **Objective 2.4:** Create Supabase SQL migration for roles/permissions (`user_roles` to handle Participant, POC, SIG Head, Events Coordinator).
- [x] **Objective 2.5:** Create Supabase SQL migration for `round_scores_and_attendance` table (tracking attendance modes, SY points, SQ points, bonus points, penalties, and completion times).
- [x] **Objective 2.6:** Create Supabase SQL migration for `leaderboard_cache` table (storing snapshot publications).
- [x] **Objective 2.7:** Implement Row Level Security (RLS) policies across all tables based on the 4 RBAC roles.

## Phase 3: Authentication & Role-Based Access Control (RBAC)
- [x] **Objective 3.1:** Implement Supabase Auth UI (Magic Links for participants + Password option for Admins/POCs).
- [x] **Objective 3.2:** Build Next.js Middleware to protect routes based on RBAC roles (e.g., restrict `/admin` to Events Coordinators).
- [x] **Objective 3.3:** Create auth state context/hooks for client-side rendering.

## Phase 4: Core Features - Backend (Server Actions & API)
- [x] **Objective 4.1:** Implement Registration API / Server Actions:
  - Shared public form logic handling 3-member team registrations.
  - Solo/Individual registration entry into the unassigned participant pool.
- [x] **Objective 4.2:** Implement Team Management Server Actions:
  - Admin auto-grouping algorithm (combines 3 individual registrants into a team with auto-assigned `#TeamID`).
  - Member substitution & withdrawal workflows.
- [x] **Objective 4.3:** Implement Scoring & Rule Engine Server Actions:
  - Score logging with automatic duo-player bonus (+2 member attendance handling).
  - Scotland Yard (Max 20), Square One (Max 60), and Bonus (Max 10) calculation logic.
  - Misconduct flag handling (auto-zeroing round scores).
- [x] **Objective 4.4:** Implement Leaderboard & Tiebreaker Server Actions:
  - Top-3 tiebreaker logic using Scotland Yard scores as a multiplier/bonus.
  - Secondary tiebreaker using completion time (`completion_time_seconds`).
  - Admin manual snapshot trigger to push scores to `leaderboard_cache` (periodic, non-live).
- [x] **Objective 4.5:** Write unit/integration tests for critical Server Actions (score calculations, tiebreaking, auto-grouping).

## Phase 5: Core Features - Frontend UI (Shadcn UI + Tailwind)
- [x] **Objective 5.1:** Build Public Portal (`/`) & Registration Page (`/register`):
  - Interactive schedule, venues, and timings banner.
  - **Registration Form:** Toggle between "3-Member Team Registration" and "Individual Registration".
  - Interactive Dispute Flow Diagram (`POC -> SIG Head -> Event Coordinator`).
  - Public Searchable Leaderboard reading from published `leaderboard_cache` snapshots.
- [x] **Objective 5.2:** Build Participant Dashboard (`/dashboard`):
  - View assigned `#TeamID`, teammate details, event schedule, and round score history.
- [x] **Objective 5.3:** Build POC & SIG Head Workspace (`/poc/scoring`):
  - Mobile-optimized fast search by `#TeamID`.
  - Quick attendance logging (`Full 3`, `Duo 2 + Bonus`, `Absent`).
  - Score input with misconduct flag dialogs & instant verification request to SIG Heads.
- [x] **Objective 5.4:** Build Events Coordinator Admin Panel (`/admin`):
  - Unassigned Solo Registrant pool view with 1-click Auto-Grouping tool.
  - Dispute Resolution Console to log and publish official grievance rulings.
  - Leaderboard Control Room (Publish Snapshot button, Audit logs, Score Overrides).
  - One-click CSV/Excel export for team registries and master scorecards.

## Phase 6: Polish & Optimization
- [x] **Objective 6.1:** Add offline-resilient local caching (IndexedDB/LocalStorage) for the POC score entry page.
- [x] **Objective 6.2:** Ensure mobile responsiveness and dark-mode compatibility across all screens.
- [x] **Objective 6.3:** Run End-to-End (E2E) tests for core flows (Registration -> Scoring -> Tiebreaking -> Leaderboard Snapshot).