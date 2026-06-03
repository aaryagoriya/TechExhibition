# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### Login Card

File: components/auth/LoginCard.tsx
Last updated: 2026-06-03

| Property         | Class                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| Background       | `bg-surface` outer shell with `landing-hero-glow` on the left auth storytelling panel                    |
| Border           | `border border-border`, `border-b border-border` on mobile split, `lg:border-r` on desktop split        |
| Border radius    | `rounded-[24px]` outer shell, `rounded-full` on the small OAuth security badge, `rounded-md` buttons     |
| Text — primary   | Hero `text-[clamp(2.35rem,5vw,4.25rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-text-slate`, form title `text-3xl font-semibold leading-9 text-text-primary` |
| Text — secondary | `text-base leading-7 text-text-secondary sm:text-lg` for supporting copy, `text-sm leading-6 text-text-secondary` for form guidance |
| Spacing          | Outer `mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1440px] items-center justify-center px-4 py-12 sm:px-6 lg:px-8`, panels `p-8 sm:p-10`, actions `mt-8 grid gap-3` |
| Hover state      | Provider form buttons use `hover:bg-surface-secondary`; focus uses `focus-visible:outline-accent`        |
| Shadow           | `shadow-card` on the outer auth shell                                                                   |
| Accent usage     | `text-accent` on the InsForge security badge icon and Google provider icon                              |

**Pattern notes:**
Auth screens use a two-panel shell: a left explanatory panel with the established landing glow treatment and a right focused action panel. Provider actions are token-driven bordered form buttons with lucide icons and no hardcoded provider colors.

### Landing Navbar

File: components/layout/Navbar.tsx
Last updated: 2026-06-03

| Property         | Class                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| Background       | `bg-surface`                                                                                             |
| Border           | `border-b border-border`                                                                                 |
| Border radius    | `rounded-md` on CTA only                                                                                 |
| Text — primary   | `text-sm font-medium text-text-dark`                                                                     |
| Text — secondary | `landing-button-primary` on CTA                                                                         |
| Spacing          | `mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8`             |
| Hover state      | `hover:text-text-primary` on nav links, shared hover from `landing-button-primary` on CTA               |
| Shadow           | `none`                                                                                                   |
| Accent usage     | `landing-button-primary` for the top-right CTA                                                          |

**Pattern notes:**
Top navigation is always a full-width white bar with a single bottom border and restrained typography. The only high-contrast element is the dark CTA on the right.

### Landing Hero

File: components/homepage/Hero.tsx
Last updated: 2026-06-03

| Property         | Class                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| Background       | `border border-border bg-surface` with `landing-hero-glow`                                                     |
| Border           | `border border-border` with `border-b border-border` separating copy from preview                              |
| Border radius    | `landing-button-*` on buttons, `rounded-[26px]` on browser frame                                               |
| Text — primary   | `text-[clamp(2.75rem,7vw,4.625rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-text-slate`         |
| Text — secondary | `text-base leading-7 text-text-secondary sm:text-lg`                                                           |
| Spacing          | `px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24`, buttons in `mt-9 flex ... gap-3`, preview in `px-4 pt-7`   |
| Hover state      | Shared hover from `landing-button-primary` and `landing-button-secondary`                                      |
| Shadow           | `landing-browser-shadow` on the dashboard image frame                                                          |
| Accent usage     | `landing-hero-glow` pastel band plus `landing-button-primary` primary CTA and `landing-button-secondary` secondary CTA |

**Pattern notes:**
Hero sections use the soft multicolor glow helper, centered headline copy, paired CTA buttons, and a large bordered product preview resting on a muted surface strip.

### Split Feature Panel

File: components/homepage/HowItWorks.tsx and components/homepage/Features.tsx
Last updated: 2026-06-03

| Property         | Class                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Background       | `landing-panel landing-grid` outer shell with `bg-surface` content and `bg-surface-tertiary` media side |
| Border           | `border border-border` outer shell with repeated `border-b border-border` item dividers        |
| Border radius    | `rounded-[22px]` to `rounded-[28px]` on inset media cards                                      |
| Text — primary   | `text-[clamp(2.2rem,5vw,3.6rem)] font-semibold ... text-text-slate`, item titles `text-lg font-semibold text-text-primary` |
| Text — secondary | `text-base leading-7 text-text-secondary`                                                      |
| Spacing          | Headings `px-9 py-9 sm:px-12 sm:py-12 lg:px-14 lg:py-16`, list rows `px-9 py-7`, media `px-6 py-10` |
| Hover state      | `none`                                                                                         |
| Shadow           | `landing-card-shadow` on image card in `HowItWorks`; plain bordered inset card in `Features`  |
| Accent usage     | `border-l-2 border-accent pl-5` for the first left-side callout, `border-l-2 border-success pl-5` for the middle right-side callout |

**Pattern notes:**
Feature storytelling panels alternate which side carries the visual. Copy stacks in bordered rows, and one row gets a colored left rule to anchor the section without changing the white card surfaces.

### Testimonial Section

File: components/homepage/SuccessStory.tsx
Last updated: 2026-06-03

| Property         | Class                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------- |
| Background       | `landing-panel bg-surface`                                                                    |
| Border           | `border border-border`                                                                        |
| Border radius    | `rounded-full` on avatar only                                                                 |
| Text — primary   | `text-[clamp(2rem,4.1vw,3.2rem)] font-medium leading-[1.18] tracking-[-0.04em] text-text-slate` |
| Text — secondary | `text-sm text-text-secondary`                                                                 |
| Spacing          | `px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24`, avatar row `mt-9 flex ... gap-3`           |
| Hover state      | `none`                                                                                        |
| Shadow           | `none`                                                                                        |
| Accent usage     | `text-xs font-semibold uppercase tracking-[0.22em] text-accent` for section eyebrow          |

**Pattern notes:**
Social proof is centered and quiet: one accent eyebrow, a large editorial quote, then a compact identity row with the avatar and role.

### CTA Banner

File: components/homepage/CTASection.tsx
Last updated: 2026-06-03

| Property         | Class                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| Background       | `landing-panel landing-hero-glow`                                                                           |
| Border           | `border border-border`                                                                                      |
| Border radius    | `landing-button-*` on buttons                                                                                |
| Text — primary   | `text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-text-slate`        |
| Text — secondary | `text-base leading-7 text-text-secondary sm:text-lg`                                                        |
| Spacing          | `px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24`, actions in `mt-9 flex ... gap-3`                         |
| Hover state      | Shared hover from `landing-button-primary` and `landing-button-secondary`                                  |
| Shadow           | `none`                                                                                                      |
| Accent usage     | Same dark primary CTA and pastel glow pattern as the hero                                                   |

**Pattern notes:**
Bottom conversion banners reuse the hero treatment exactly, only with tighter copy width and no embedded product screenshot.

### Landing Buttons

File: app/globals.css
Last updated: 2026-06-03

| Property         | Class                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------- |
| Background       | `landing-button-primary` uses a dark token-based gradient, `landing-button-secondary` uses a soft surface fill |
| Border           | `landing-button-primary` has a dark mixed border, `landing-button-secondary` uses `var(--color-border)` |
| Border radius    | `var(--radius-md)`                                                                            |
| Text — primary   | `landing-button-primary` sets `color: var(--color-accent-foreground)`                        |
| Text — secondary | `landing-button-secondary` sets `color: var(--color-text-primary)`                           |
| Spacing          | `min-height: 3rem`, `padding: 0.75rem 1.5rem`, `font-size: 0.875rem`, `font-weight: 500`    |
| Hover state      | Primary lifts and brightens, secondary lightens and shifts border toward accent              |
| Shadow           | Primary gets depth shadow plus inset highlight, secondary gets a subtle card-like shadow     |
| Accent usage     | Focus ring uses `var(--color-accent)`                                                        |

**Pattern notes:**
All landing-page CTAs should use these shared semantic classes instead of duplicating button styling inline. This keeps contrast and polish consistent across navbar, hero, and footer CTA areas.

### Landing Footer

File: components/layout/Footer.tsx
Last updated: 2026-06-03

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | `bg-surface`                                                                          |
| Border           | `border-x border-b border-border`                                                     |
| Border radius    | `none`                                                                                |
| Text — primary   | `text-sm font-medium text-text-secondary`                                             |
| Text — secondary | `text-sm font-medium text-text-secondary`                                             |
| Spacing          | `mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-10 sm:px-8 md:flex-row ... lg:px-10` |
| Hover state      | `hover:text-text-primary`                                                             |
| Shadow           | `none`                                                                                |
| Accent usage     | `none`                                                                                |

**Pattern notes:**
Footer stays minimal and horizontal at larger sizes, using the same max-width and horizontal padding rhythm as the navbar.

### Analytics Logout Link

File: components/analytics/PostHogLogoutLink.tsx
Last updated: 2026-06-03

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | Inherited through `className`; current usage passes `bg-surface`                      |
| Border           | Inherited through `className`; current usage passes `border border-border`            |
| Border radius    | Inherited through `className`; current usage passes `rounded-md`                      |
| Text — primary   | Inherited through `className`; current usage passes `text-sm font-medium text-text-primary` |
| Text — secondary | `none`                                                                                |
| Spacing          | Inherited through `className`; current usage passes `min-h-10 px-4 py-2`              |
| Hover state      | Inherited through `className`; current usage passes `hover:bg-surface-secondary`      |
| Shadow           | `none`                                                                                |
| Accent usage     | `none`                                                                                |

**Pattern notes:**
Analytics wrapper links should preserve the exact visual classes of the link or button they replace. The component owns only the PostHog reset behavior and must not introduce standalone styling.
