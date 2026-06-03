# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 1 — Foundation
**Last completed:** 04 Database Schema
**Next:** 05 Profile Page — Full UI

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [x] 03 PostHog Initialization
- [x] 04 Database Schema

### Phase 2 — Profile Page

- [ ] 05 Profile Page — Full UI
- [ ] 06 Profile Save Logic
- [ ] 07 AI Profile Extraction from Resume
- [ ] 08 Resume PDF Generation from Profile
- [ ] 09 LinkedIn Connection via Browserbase Context
- [ ] 10 Smart Redirect + Profile Completion Check

### Phase 3 — Find Jobs Page

- [ ] 11 Find Jobs Page — Full UI
- [ ] 12 LinkedIn Browsing + Dual Extraction
- [ ] 13 LinkedIn Detail Page Enrichment + Description Cleaning
- [ ] 14 URL Input — Fetch + Extract + Score + Save
- [ ] 15 Filter + Sort + Pagination

### Phase 4 — Job Details Page

- [ ] 16 Job Details Page — Full UI
- [ ] 17 Cover Letter Generation
- [ ] 18 Resume Tailoring — GPT-4o Rewrite
- [ ] 19 Tailored Resume PDF Generation + Storage
- [ ] 20 Score Recalculation + Comparison Display
- [ ] 21 Previous + Next Job Navigation

### Phase 5 — Dashboard

- [ ] 22 Dashboard Page — Full UI
- [ ] 23 Stats Bar — Real Data
- [ ] 24 Recent Activity — Real Data
- [ ] 25 Analytics Charts — PostHog Data

---

## Decisions Made During Build

- Homepage built as reusable App Router components: `Navbar`, `Hero`, `HowItWorks`, `Features`, `SuccessStory`, `CTASection`, and `Footer`.
- Landing page visuals rely on shared token-driven helpers in `app/globals.css` (`landing-panel`, `landing-grid`, `landing-hero-glow`, `landing-divider`) instead of component-level hardcoded color values.
- Landing CTA styling now uses `text-[var(--color-accent-foreground)]` on dark CTAs to guarantee readable contrast on all link/button states.
- Primary homepage CTAs currently point to `/login` until auth flow is implemented in Feature 02.
- Auth uses InsForge `@insforge/sdk` v1.3.1 with the SSR helpers from `@insforge/sdk/ssr`.
- OAuth starts through local route handlers at `/api/auth/oauth/google` and `/api/auth/oauth/github`; these store the PKCE verifier in an app-owned httpOnly cookie before redirecting to the provider.
- `/callback` completes the OAuth exchange server-side, sets InsForge auth cookies with `setAuthCookies`, then redirects incomplete or missing profiles to `/profile` and complete profiles to `/dashboard`.
- Next.js 16 route protection is implemented with root `proxy.ts`, not deprecated `middleware.ts`.
- PostHog browser initialization now runs from root `instrumentation-client.ts`, backed by `lib/posthog-client.ts`, and accepts either `NEXT_PUBLIC_POSTHOG_KEY` or PostHog's setup-screen `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`. `NEXT_PUBLIC_POSTHOG_HOST` defaults to US Cloud when omitted.
- PostHog server tracking is centralized in `lib/posthog-server.ts` with a typed event contract limited to the seven approved JobPilot event names.
- Authenticated placeholder pages call `posthog.identify()` through `PostHogIdentify`, and current sign-out links call `posthog.reset()` before hitting `/api/auth/logout`.

---

## Notes

- The homepage uses the provided assets from `public/logo.png` and `public/images/` to match the approved design.
- Production build verification passed after allowing `next/font` to fetch the required Inter font outside the sandbox.
- Feature 02 lint and production build verification passed. Build still requires network access for `next/font` to fetch Inter.
- Feature 03 lint and production build verification passed. The first build attempt still failed on the known sandboxed `next/font` Inter fetch; rerunning with network access passed. PostHog will stay inactive until `NEXT_PUBLIC_POSTHOG_KEY` or `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` is present in `.env.local`.
- Feature 04: four tables (`profiles`, `agent_runs`, `jobs`, `agent_logs`) created via InsForge CLI migrations with full RLS (16 policies). Two Postgres triggers on `profiles`: `on_profile_updated` auto-sets `updated_at`; `on_auth_user_created` on `auth.users` auto-inserts a minimal profile row on signup. `resumes` private storage bucket created with path-scoped RLS on `storage.objects`. `types/index.ts` created with `Profile`, `WorkExperience`, `Education`, `AgentRun`, `Job`, `AgentLog` interfaces.
