# Memory — Feature 04 Database Schema

Last updated: 2026-06-03 12:10 CEST

## What was built

Feature 04 — Database Schema is complete. Phase 1 Foundation is fully done.

- Logged into InsForge CLI (`npx @insforge/cli login --user-api-key ...`) and linked project `JSM_JobPilot` (`d52a8af6-92b5-4a2e-85e7-f04cba282d96`, region `eu-central`, appkey `2zu6ipjr`).
- InsForge skills (`insforge`, `insforge-cli`) installed globally via the link command.
- Created 5 migration files in `migrations/`:
  - `20260603114532_create-profiles.sql` — `profiles` table, 4 RLS policies, `on_profile_updated` trigger, `on_auth_user_created` trigger
  - `20260603114534_create-agent-runs.sql` — `agent_runs` table, 4 RLS policies
  - `20260603114535_create-jobs.sql` — `jobs` table, 4 RLS policies
  - `20260603114536_create-agent-logs.sql` — `agent_logs` table, 4 RLS policies
  - `20260603114724_create-storage-rls.sql` — enables RLS on `storage.objects`, 4 path-scoped RLS policies for the `resumes` bucket
- All 5 migrations applied and verified on the live InsForge backend.
- Created `resumes` storage bucket (private) via `npx @insforge/cli storage create-bucket resumes --private`.
- Created `types/index.ts` with `Profile`, `WorkExperience`, `Education`, `AgentRun`, `Job`, `AgentLog` TypeScript interfaces.
- Updated `context/progress-tracker.md` — Feature 04 marked complete, next set to Feature 05.

## Decisions made

- InsForge CLI is the mechanism for all backend infrastructure — migrations for schema, CLI for bucket creation. Never use the SDK for schema work.
- `profiles` table uses `id uuid PRIMARY KEY REFERENCES auth.users(id)` — the PK is the auth user ID, not a separate `user_id` column. RLS policy uses `auth.uid() = id` (not `= user_id`) on this table only.
- `on_auth_user_created` trigger on `auth.users` auto-inserts a minimal `profiles` row (`id`, `email`, `created_at`, `updated_at`) on every new signup. Features 06, 07, 10 can assume the row always exists.
- `on_profile_updated` trigger auto-sets `updated_at = now()` — application code never needs to set this explicitly.
- Storage RLS uses InsForge's column names `bucket` and `key` (not `bucket_id`/`name` as in Supabase). Path check: `auth.uid()::text = (string_to_array(key, '/'))[1]`.
- `types/index.ts` is the single source of truth for all DB-mapped TypeScript types. All future features import from there.

## Problems solved

- InsForge `storage.objects` uses different column names than Supabase: `bucket` (not `bucket_id`) and `key` (not `name`). First migration attempt failed — discovered via `db query` on `information_schema.columns`.
- RLS was not enabled on `storage.objects` by default — had to `ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY` in the migration before policies would take effect.
- `db triggers` CLI command only shows triggers on the `public` schema. `on_auth_user_created` is on `auth.users` (auth schema) so it doesn't appear there — verified by querying `information_schema.triggers` directly.

## Current state

- Phase 1 Foundation is 100% complete (Features 01–04).
- Live InsForge backend has all 4 tables, 20 RLS policies (16 table + 4 storage), 2 triggers, and 1 private storage bucket.
- `types/index.ts` exists and is ready to import.
- No app-level code touches the DB yet — that starts in Feature 06.
- The two open questions from the previous session (pageview events, `.posthog-events.json`) were not addressed this session and remain open.

## Next session starts with

Run `/architect` for Feature 05 — Profile Page Full UI. This is a UI-only feature (mock data, no save logic). The Profile page is the most complex UI in the project — it has a completion banner, connected accounts section, resume upload area, and a large multi-section form.

## Open questions

- Should `$pageview` events be kept as an intentional PostHog baseline or turned off after verification? (Carried over from Feature 03.)
- Should `.posthog-events.json` be deleted, ignored, or reconciled with `context/code-standards.md`? (Carried over from Feature 03.)
