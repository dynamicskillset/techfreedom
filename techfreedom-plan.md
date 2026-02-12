# TechFreedom Landing Page — Build Plan

## 1. Concept & Direction

**Purpose**: A single-page landing page for TechFreedom, a service helping organisations (primarily UK VCSE sector) understand and reduce their dependence on Big Tech. The page needs to communicate clarity, independence, and trust — while being visually distinctive and memorable.

**Audience**: Leaders and decision-makers in charities, social enterprises, and small organisations who feel uneasy about their tech dependencies but don't know where to start.

**Tone**: *Atmospheric clarity* — the visual metaphor is weather: fog lifting, skies clearing, seeing clearly. The design should feel like stepping outside on a crisp morning after days of overcast grey. Not cold or clinical — warm, open, honest.

---

## 2. Aesthetic Direction

**Theme**: "Clear Skies" — editorial meets environmental.

- **NOT** the usual dark hacker aesthetic of digital sovereignty projects
- **NOT** generic SaaS gradient landing page
- **IS** calm, confident, slightly editorial — like a well-designed independent magazine or a thoughtful architecture studio site

### Typography
- **Display**: A serif with character — something like **Fraunces** (variable, slightly wonky, warm) or **Newsreader** (editorial, trustworthy)
- **Body**: A clean humanist sans — **DM Sans**, **Outfit**, or **Satoshi** (via Fontshare)
- Generous sizing, considered line-heights, text that breathes

### Colour Palette
- **Primary background**: A warm off-white or very pale sky tone (`#F7F5F0` or similar)
- **Text**: Deep navy/charcoal (`#1A2332`) — not pure black
- **Accent**: A clear sky blue (`#4A90D9`) or teal-blue — used sparingly
- **Secondary accent**: Warm amber/gold (`#D4A843`) for CTAs and highlights
- **Fog/mist tones**: Soft greys with slight warmth for layering and depth

### Visual Details
- Subtle gradient backgrounds suggesting sky/atmosphere — pale at top, slightly warmer at base
- Gentle noise/grain texture overlay for organic feel
- Section dividers that feel like horizon lines or atmospheric layers
- No stock photography — rely on typography, space, and colour

### Motion & Interaction
- Staggered fade-in on scroll for each section (CSS `@keyframes` + Intersection Observer)
- Hero text reveal: words emerging as if clearing from fog
- Subtle parallax on background layers
- CTA button with a gentle glow/pulse — like light breaking through
- Smooth scroll between sections

### Layout
- Full-width sections with generous vertical padding
- Content constrained to ~680px for readability (classic editorial measure)
- The three pillars (Jurisdiction, Business Continuity, Surveillance) as distinct cards or panels with clear visual hierarchy
- Asymmetric spacing — not everything centred; some left-aligned editorial moments

---

## 3. Page Structure

```
┌─────────────────────────────────────────────┐
│ HERO                                        │
│ "TechFreedom"                               │
│ Tagline + intro paragraph                   │
│ Atmospheric gradient background             │
│ Fog-clearing animation on load              │
├─────────────────────────────────────────────┤
│ TRANSITION                                  │
│ "Bring your operations into the light"      │
│ Bridge paragraph                            │
├─────────────────────────────────────────────┤
│ PILLAR 1: Jurisdiction                      │
│ Icon/number + heading                       │
│ Problem statement                           │
│ "The TechFreedom approach" response         │
├─────────────────────────────────────────────┤
│ PILLAR 2: Business Continuity               │
│ Same structure                              │
├─────────────────────────────────────────────┤
│ PILLAR 3: Surveillance                      │
│ Same structure                              │
├─────────────────────────────────────────────┤
│ CLOSING                                     │
│ "The sky is clearing"                       │
│ Final paragraph                             │
│ CTA: "Join the next cohort"                 │
│ Email signup / notify button                │
├─────────────────────────────────────────────┤
│ FOOTER                                      │
│ Minimal — TechFreedom © 2025                │
│ Optional: link to Tom's consultancy         │
└─────────────────────────────────────────────┘
```

---

## 4. Technical Spec

### Stack
- **Single HTML file** — all CSS and JS inline
- No framework dependencies — vanilla HTML/CSS/JS
- Google Fonts for typography
- CSS custom properties for theming
- Intersection Observer API for scroll animations
- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`)

### Performance
- No external images to load
- Minimal JS — CSS-first animations where possible
- Fonts loaded with `display: swap`

### Accessibility
- Proper heading hierarchy (h1 → h2 → h3)
- `prefers-reduced-motion` media query to disable animations
- Sufficient colour contrast (WCAG AA minimum)
- Focusable CTA with visible focus styles
- Semantic landmarks

### Responsive
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Typography scales fluidly with `clamp()`
- Pillar cards stack vertically on mobile

---

## 5. CTA Behaviour

The "Sign up to be notified" button should:
- Open a simple inline form (email input + submit) — no page redirect
- Or link to an external form (Jotform, given Tom's existing integration)
- Keep it minimal: just an email address, nothing more

**Decision needed**: Inline form or link to Jotform?

---

## 6. Build Steps

1. **Set up project** — create working directory, single `index.html`
2. **Scaffold HTML** — semantic structure with all content
3. **Typography & base styles** — fonts, CSS variables, reset
4. **Hero section** — gradient background, fog animation, text reveal
5. **Content sections** — editorial layout, pillar cards
6. **Closing & CTA** — signup area with button styling
7. **Scroll animations** — Intersection Observer for fade-ins
8. **Responsive refinement** — test at all breakpoints
9. **Accessibility pass** — contrast, focus, reduced-motion
10. **Polish** — micro-interactions, grain texture, final spacing

---

## 7. Content Notes

All copy is provided in the brief. Key editorial considerations:

- The weather metaphor runs throughout — lean into it visually without making it cartoonish
- "The TechFreedom approach" sections should feel reassuring, not preachy
- The tone is peer-to-peer, not vendor-to-customer
- UK English throughout (organisation, not organization)

---

## 8. Open Questions

- [ ] Should the CTA link to a Jotform or use an inline email capture?
- [ ] Is there a logo or wordmark, or should "TechFreedom" be purely typographic?
- [ ] Any connection to The Good Ship branding, or is this a standalone identity?
- [ ] Target launch date for the cohort?

---

*Ready to build on your go.*
