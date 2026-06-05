# Memory — Feature 08 Resume PDF Generation from Profile (complete)

Last updated: 2026-06-04 CEST

## What was built

Feature 08 — Resume PDF Generation from Profile is complete.

- `app/api/resume/generate/route.tsx` — POST route handler: `getCurrentUser` → profile fetch → GPT-4o (`temperature: 0.7`, `max_tokens: 1000`, `json_object`) → `renderToBuffer` → storage remove+upload → DB update → `revalidatePath('/profile')`
- `app/api/resume/generate/ResumePDF.tsx` — server-only `@react-pdf/renderer` component + exported `GeneratedContent` type. Sections: Header, Professional Summary, Skills, Work Experience (GPT bullets), Education.
- `components/profile/ResumeSection.tsx` — `handleGenerate` handler, `isGenerating`/`generateError`/`generateSuccess` state, button wired with `onClick`/`disabled`, feedback messages, `window.open('/api/resume/download', '_blank')` on success.

## Decisions made

- Route file is `.tsx` (not `.ts`) — JSX required for `renderToBuffer(<ResumePDF />)`.
- Buffer cast: `new Blob([buffer as unknown as ArrayBuffer], { type: 'application/pdf' })` — strict TS rejects `Buffer` as `BlobPart` directly.
- Remove-then-upload pattern (no upsert) — matches `uploadResume` in `actions/profile.ts`.
- `window.open('/api/resume/download', '_blank')` after success — reuses existing download route, no new endpoint needed.
- GPT temperature: 0.7 (resume writing), max_tokens: 1000 (per library-docs.md).
- `GeneratedContent` type lives in `ResumePDF.tsx`, imported by the route.
- Skills rendered as joined string with `"  •  "` separator — `@react-pdf/renderer` doesn't support `flexWrap`.
- Hex colors only in StyleSheet (`#111111`, `#444444`, etc.) — CSS variables don't work in `@react-pdf/renderer`.

## Problems solved

- **`renderToBuffer` JSX type error** — `React.createElement(ResumePDF, ...)` in a `.ts` file fails TS inference for `@react-pdf/renderer`'s `DocumentProps`. Fixed by renaming to `.tsx` and using JSX directly.
- **`Buffer` not assignable to `BlobPart`** — `SharedArrayBuffer` vs `ArrayBuffer` mismatch in strict TS. Fixed with `buffer as unknown as ArrayBuffer`.

## Current state

- Phase 2 is 4/6 done (Features 05 + 06 + 07 + 08 complete)
- "Generate Resume from Profile" button works end-to-end: GPT generates polished content → PDF rendered server-side → uploaded to storage → download opens in new tab
- TypeScript clean, production build passes
- `progress-tracker.md` and `ui-registry.md` both updated

## Next session starts with

Feature 09 — LinkedIn Connection via Browserbase Context. Flow: Connect LinkedIn button → POST `/api/linkedin/connect` → create Browserbase context + session → return `liveViewUrl` to client → user logs in manually in new tab → POST `/api/linkedin/save-context` → save `linkedin_context_id` + set `linkedin_connected: true` in profiles table.

Run `/architect` for Feature 09 before implementing.

## Open questions

- None.
