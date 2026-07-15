# Changelog

All notable changes to this project are documented here. Versions follow [PriDever](https://pridever.org) (`PROUD.DEFAULT.SHAME`).

## [0.4.0] - 2026-07-15

Conversion-focused pass on the programme page, informed by a visual audit (screenshots at desktop/mobile with the reveal-on-scroll animations forced on, since a naive screenshot shows the page blank).

- **New policy**: full refund up to 30 days before the first session, or transfer to the next cohort. Added to the pricing box, both CTA boxes, and a new FAQ entry
- Reframe cohort size as a benefit ("Capped at 10 organisations to keep it personal") instead of a bare capacity number, consistently across the page
- Add per-session price framing next to the headline cost (£450 per person / £150 per session)
- Repeat a trimmed pilot testimonial at the bottom CTA, so social proof sits right at the final ask, not only mid-page
- Add "secure payment via Stripe" trust line near all three CTA buttons

## [0.3.0] - 2026-07-15

- Add session times (2–4pm UK time) alongside dates in the pricing box, with US Eastern and Central Europe conversions
- Add a FAQ entry on session times, listing Session 1/2/3 with dates
- Update the programme page sign-up box copy to "The next cohort starts in September, with three sessions over six weeks"

## [0.2.0] - 2026-07-15

- Add a real booking flow for the September 2026 cohort: primary CTAs on the homepage and programme page now link to a Stripe Payment Link (£450, custom fields for organisation name and role) instead of only capturing newsletter interest
- Add a FAQ entry covering payment and what happens after booking
- Keep the newsletter form as a secondary path for visitors not ready to commit

## [0.1.0] - 2026-07-15

First versioned release. The site was already live prior to this tag; this marks the point PriDever versioning and a changelog were introduced.

- Landing, programme, manifesto, lenses, assess, and alternatives pages
- Interactive tech stack risk assessment (`/assess/`)
- Alternative tools comparison covering 27 common tools and 27 alternatives
- Stacktopolis: satirical survival game about digital sovereignty (Vite + React, versioned independently)
- Newsletter signup via Listmonk
- Payments via Stripe
- Hosting on BunnyCDN with auto-deploy from `main` via GitHub Actions
