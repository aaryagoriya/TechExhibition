# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 2 — Profile Page
**Last completed:** 09 LinkedIn Connection via Browserbase Context
**Next:** 10 Smart Redirect + Profile Completion Check

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [x] 03 PostHog Initialization
- [x] 04 Database Schema

### Phase 2 — Profile Page

- [x] 05 Profile Page — Full UI
- [x] 06 Profile Save Logic
- [x] 07 AI Profile Extraction from Resume
- [x] 08 Resume PDF Generation from Profile
- [x] 09 LinkedIn Connection via Browserbase Context
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
- Feature 06: `actions/profile.ts` created with `saveProfile` (text fields → `profiles` table, `is_complete` calculated via `calculateCompletion`, `profile_completed` PostHog event on first completion) and `uploadResume` (PDF → InsForge Storage at `{userId}/resume.pdf`, URL saved to `profiles.resume_pdf_url`). `lib/profile-utils.ts` created with shared `calculateCompletion` (9 required fields). `MissingField` union type moved to `types/index.ts`. `ProfileForm` now accepts `profile` prop, initialises all state from DB, has `<form onSubmit>` with `useTransition`, loading/error/success feedback, and `coverLetterTone` field added to Job Preferences. `ResumeSection` uploads on file selection via `uploadResume`. `ProfilePage` fetches full profile from DB and passes real data to all components. Three bugs fixed post-build: (1) `requireUser()` moved outside `try/catch` in both actions so `NEXT_REDIRECT` is never swallowed; (2) `parseInt` NaN guard added for years of experience; (3) `.select("id").maybeSingle()` added after `.update()` so zero-rows-updated is caught as an error instead of silent success. Profile row backfilled for existing user via `INSERT … ON CONFLICT DO NOTHING`. `ProfileAttentionBanner` now returns `null` at 100% completion.
- Feature 09: `lib/browserbase.ts` singleton. `app/api/linkedin/connect` creates Browserbase context + session, inits Stagehand with that session ID, fetches `debuggerFullscreenUrl` BEFORE closing Stagehand (closing after causes 410), navigates to `linkedin.com/login`, then closes Stagehand (session stays live). `app/api/linkedin/save-context` writes `linkedin_context_id` + `linkedin_connected: true` to profiles, releases session via `REQUEST_RELEASE`, fires PostHog event. `ConnectedAccounts` converted to client component with 3-state button flow. `app/profile/page.tsx` has `export const dynamic = "force-dynamic"` to always read from DB. Critical: get `debuggerFullscreenUrl` before `stagehand.close()` — close() terminates the session and subsequent `sessions.debug()` returns 410.
- Feature 08: `@react-pdf/renderer` installed. `app/api/resume/generate/route.tsx` (POST handler: auth → profile fetch → GPT-4o content generation → `renderToBuffer` → storage remove+upload → DB update → `revalidatePath`) and `app/api/resume/generate/ResumePDF.tsx` (server-only PDF component + `GeneratedContent` type) created. `ResumeSection.tsx` wired with `handleGenerate` handler, loading/error/success state, and `window.open('/api/resume/download')` on success. Route file is `.tsx` (JSX required for `renderToBuffer`). Buffer cast to `ArrayBuffer` before `new Blob()` to satisfy strict TS.
- Feature 07: `extractProfile` Server Action added to `actions/profile.ts`. Installs `pdf-parse@1.1.1` (v1) and `openai`. Flow: download resume from InsForge Storage → `pdf-parse` extracts text → GPT-4o with `response_format: json_object`, `temperature: 0.3`, `max_tokens: 800` → `ExtractedProfile` typed return. Empty-text guard returns user-friendly error. `ProfileForm` gains `ProfileFormHandle` ref type with `applyExtracted()` method via `useImperativeHandle`. `ResumeSection` gains `onExtracted` callback prop and an `Extract Profile` button (only visible when a resume exists). Thin `ProfilePageClient` client wrapper holds the `useRef<ProfileFormHandle>` and wires `ResumeSection.onExtracted → ProfileForm.applyExtracted`. `app/profile/page.tsx` now renders `ProfilePageClient` instead of the two components separately. Critical notes: (1) Must use `pdf-parse@1.1.1` (v1), NOT v2 — v2 uses pdfjs-dist v5 with ESM-only web workers that webpack cannot bundle in Server Actions. (2) Must import from `pdf-parse/lib/pdf-parse.js`, NOT the package index — the index.js has a debug block that reads a test PDF file on every `require()` call when `module.parent` is null (always true under Next.js/Turbopack), causing an ENOENT crash on page load.
- Feature 05: full profile page UI built with mock data. Components: `ProfileAttentionBanner` (SVG completion ring, missing field warning badges), `ConnectedAccounts` (LinkedIn row with Connect button), `ResumeSection` (drag-and-drop PDF upload area, Generate Resume from Profile button), `ProfileForm` (Personal Info, Professional Info with tag inputs for skills/industries, Work Experience with add/remove roles + month/year selects, Education, Job Preferences). Navbar updated to `"use client"` with `usePathname`-driven active link highlighting.
