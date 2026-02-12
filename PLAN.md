# Plan

> Last updated: 2026-02-12
> Status: In progress

## Objective

Build a single-page landing page for **TechFreedom** — a service helping UK VCSE organisations understand and reduce their dependence on Big Tech. The page must communicate clarity, independence, and trust with a distinctive "Clear Skies" editorial aesthetic. Weather metaphor throughout: fog lifting, skies clearing, seeing clearly.

**Audience**: Leaders and decision-makers in charities, social enterprises, and small organisations.

**Tone**: Atmospheric clarity — warm, open, honest. Like stepping outside on a crisp morning after days of overcast grey.

## Approach

### Stack
- **Single `index.html`** — all CSS and JS inline, no framework dependencies
- Google Fonts (Fraunces/Newsreader for display, DM Sans/Outfit for body)
- CSS custom properties for theming
- Intersection Observer API for scroll animations
- Semantic HTML5 throughout
- **Impeccable design plugin** for design quality, polish, and animation passes

### Design Direction — "Clear Skies"
- NOT dark hacker aesthetic, NOT generic SaaS gradients
- Calm, confident, editorial — like an independent magazine or architecture studio site
- Warm off-white background (`#F7F5F0`), deep navy text (`#1A2332`)
- Sky blue accent (`#4A90D9`), warm amber CTAs (`#D4A843`)
- Subtle grain texture, atmospheric gradients, generous whitespace
- Content constrained to ~680px editorial measure
- Asymmetric layout with left-aligned editorial moments

### Page Structure
1. **Hero** — TechFreedom wordmark, tagline, fog-clearing animation
2. **Transition** — "Bring your operations into the light"
3. **Pillar 1** — Jurisdiction
4. **Pillar 2** — Business Continuity
5. **Pillar 3** — Surveillance
6. **Closing + CTA** — "The sky is clearing" + email signup
7. **Footer** — Minimal

## Tasks

- [x] Task 1 — **Scaffold HTML** — Semantic structure with all sections and content
- [x] Task 2 — **Typography & base styles** — Load fonts, set CSS variables, reset styles
- [x] Task 3 — **Hero section** — Gradient background, fog-clearing animation, text reveal
- [x] Task 4 — **Content sections** — Editorial layout for transition + three pillar cards
- [x] Task 5 — **Closing & CTA** — Signup area with glowing button, inline email form
- [x] Task 6 — **Scroll animations** — Intersection Observer staggered fade-ins
- [x] Task 7 — **Responsive refinement** — Mobile-first, fluid typography with `clamp()`, breakpoints at 480/768/1024px
- [x] Task 8 — **Accessibility pass** — Contrast (WCAG AA), focus styles, `prefers-reduced-motion`, semantic landmarks
- [x] Task 9 — **Impeccable design passes** — `/critique` done: fixed hero gravity, consolidated CTA, added pillar bg numbers, warmed approach blocks, tightened spacing ← `/polish` next
- [ ] Task 10 — **Final review** — Cross-browser check, performance, grain texture, micro-interactions

Mark tasks with:
- `[ ]` not started
- `[~]` in progress — add "CURRENT" marker
- `[x]` complete
- `[!]` blocked — note why

## Decisions Made

| Decision | Rationale | Date |
|----------|-----------|------|
| Single HTML file, no framework | Simplicity, fast load, easy deployment — no build step needed | 2026-02-12 |
| Use Impeccable plugin for design | Ensures distinctive, production-grade visual quality and avoids generic AI aesthetics | 2026-02-12 |
| Weather metaphor as design thread | Runs through the brief — fog/clarity gives cohesive visual and editorial direction | 2026-02-12 |
| Editorial layout (~680px measure) | Classic readability, matches the "independent magazine" aesthetic | 2026-02-12 |

## Open Questions

- [ ] Should the CTA link to a Jotform or use an inline email capture?
- [ ] Is there a logo/wordmark, or is "TechFreedom" purely typographic?
- [ ] Any connection to The Good Ship branding, or standalone identity?
- [ ] Target launch date for the cohort?
- [ ] Font choice: Fraunces (warm, wonky) vs Newsreader (editorial, trustworthy)?

## Out of Scope

- Multi-page site or routing
- Backend/database for email collection (use external form service)
- Blog or content management
- Custom illustrations or photography
- Dark mode (could add later via Impeccable `/adapt`)

<!--
Update this file as work progresses. Tell Claude:
"Update PLAN.md to reflect what we just did, then continue with the next task."

Impeccable skills to use during build:
- /frontend-design — for initial component creation with high design quality
- /animate — enhance with purposeful animations and micro-interactions
- /polish — final alignment, spacing, consistency pass
- /critique — evaluate design effectiveness and visual hierarchy
- /audit — comprehensive quality check before launch
- /harden — error handling and edge cases for the CTA form
- /adapt — responsive design verification
-->
