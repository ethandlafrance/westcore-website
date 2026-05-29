# Westcore Pitch — Talking Points

Five specific things to point at during the interview. Every one of these maps directly to a line in the job posting.

## 1. Schema markup → local SEO unlock per city
Every location page (`/locations/[city]`) ships `LocalBusiness` JSON-LD with address, phone, geo, hours.

**Why it matters:** their current Wix site has zero structured data. Once Google has clean LocalBusiness signals per city, they start showing up in "personal training near me" and Google Maps pack results for Victoria, Saanich, Sidney, Surrey, Courtenay separately. That's free local traffic the Wix site is leaving on the table.

**Map to job posting:** *"Work on SEO and Google visibility."*

## 2. Multi-step quiz → 2-3× conversion lift vs static contact form
Lead magnet at `/book-free-session` is a 4-step quiz (goal → experience → location → contact). Direct-response standard.

**Why it matters:** static contact forms ("Name, Email, Message") convert 1-3% of traffic. Multi-step quizzes consistently hit 6-12% because they (a) get a micro-commitment first, (b) qualify the lead before contact info, (c) feel more personal. This is the single biggest lead-gen lever on the page.

**Map to job posting:** *"Generate qualified leads," "Improve ad creatives, funnels, and booking systems," "Help increase booked intro/trial sessions."*

## 3. Lighthouse comparison vs current Wix site
This site targets 95+ on all four Lighthouse metrics (Performance, Accessibility, Best Practices, SEO). The current Wix site typically scores in the 40-60s on mobile performance.

**How to demo:** in Chrome DevTools, run Lighthouse on both. Screenshot the comparison. That's a $0 paid-ads cost reduction (faster pages = lower CPC on META) and ranking signal.

**Map to job posting:** *"Update and manage WIX websites" — the position itself is rooted in the assumption that Wix is the right tool. This is the moment to argue it isn't.*

## 4. URL-param-driven landing pages → ad campaigns can drop visitors mid-funnel
Quiz at `/book-free-session?location=victoria&goal=strength` pre-fills the quiz so the visitor only has to answer 2 questions instead of 4.

**Why it matters:** when you run a META ad for "Build Muscle in Victoria," the ad creative already promised the visitor a Victoria-strength program. Forcing them to re-select that on the landing page is a leak. Pre-filling closes it. Real lift in funnel conversion, especially mobile.

**Map to job posting:** *"Manage and improve META paid ads," "Track performance, conversions, and cost per lead."*

## 5. One unified `lead_submitted` event → clean attribution, no broken funnels
Every CTA, every quiz step, every submission fires through `src/lib/analytics.ts`. One event name, one shape, one payload. Ready to wire to GA4 and Meta Pixel — placeholders already in `src/app/layout.tsx`.

**Why it matters:** the most common reason META ad attribution is broken on small-business sites is mismatched event names across pages. One unified event = clean conversion data = correct cost-per-lead numbers = better optimization. This is the difference between "META ads aren't working" and "META ads ARE working, we just couldn't see it."

**Map to job posting:** *"Track performance, conversions, and cost per lead."*

---

## Files worth pointing at during the interview

- `src/app/layout.tsx` — Meta Pixel + GA4 placeholders, ready for their IDs
- `src/components/quiz/Quiz.tsx` — the 4-step quiz with URL prefill
- `src/app/locations/[city]/page.tsx` — dynamic location pages with LocalBusiness schema
- `src/lib/analytics.ts` — one unified conversion event
- `src/lib/locations.ts` — all 6 locations as a single source of truth
- `src/app/sitemap.ts` — auto-generated sitemap

## What's NOT done in v1 (and what you can offer to build if they say yes)

- Real CRM integration (HubSpot, Go High Level, etc.)
- Real photography (we used Unsplash placeholders — flagged in code)
- Final brand voice on copy (written from scratch using the job posting as voice reference — they may want their own line breaks)
- Deployment (one click to Vercel)
- A/B-testing setup for hero variants
