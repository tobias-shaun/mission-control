# Screenshots needed — Mission Report capture slots

The four report pages (`/reports/<slug>`) each have a "THE REAL APP — STAGED CAPTURES"
section with placeholder frames that say **AWAITING TRANSMISSION**. This file is the
exact shot list. Every capture must be a real, unretouched screenshot of the live app —
the pages promise exactly that.

## How to capture

- **Size:** ~1600 × 1000 px (16:10). The frames are 16:10 and images render
  `object-fit: cover`, so any other ratio gets cropped — stick to 16:10.
- **Format:** PNG.
- **Content:** the real app with real data. No mockups, no retouching. For the
  property platform, anonymise anything client-identifying first (the site already
  promises "ANONYMISED · CODE PRIVATE").

## How to activate a capture (one line per image)

1. Drop the file into `public/reports/<slug>/<n>.png`
   (create the folder if it doesn't exist).
2. In `app/reports/[slug]/reports-data.ts`, find that product's `captures` entry
   (they're listed in order, with a `file` field naming the expected filename)
   and add one line:

   ```ts
   // before
   { file: "1.png", title: "The wardrobe", caption: "…" },
   // after
   { file: "1.png", title: "The wardrobe", caption: "…", src: "/reports/hatched/1.png" },
   ```

   Adding `src` swaps the placeholder for the image. No other code changes.
   Layout can't shift — the frame keeps its 16:10 aspect-ratio box either way.

---

## hatched — `public/reports/hatched/`

| File | Screen to capture | It illustrates |
| --- | --- | --- |
| `1.png` | The wardrobe grid (her pieces, tap-to-include state visible) | R1: it styles what she already owns |
| `2.png` | A generated "today's look" (outfit + AI-suggested note visible) | R3: AI suggests; mum decides |
| `3.png` | The profile / comfort-rules screen (rule chips visible) | R2: postpartum is the default, not a setting |
| `4.png` | The founding-cohort screen or invite flow | Pre-launch, and saying so |

## Job Command Center — `public/reports/job-command-center/`

| File | Screen to capture | It illustrates |
| --- | --- | --- |
| `1.png` | The pipeline board (a follow-up nudge flag visible on a card) | R3: follow-ups are first-class objects |
| `2.png` | The real 07:00 action-list email, as received in the inbox | R2: the tool comes to me |
| `3.png` | The live funnel view | Brief + funnel generated from pipeline state |

## Life Hub — `public/reports/life-hub/`

| File | Screen to capture | It illustrates |
| --- | --- | --- |
| `1.png` | The Today view (the big "N tasks left" number prominent) | R3: big numbers over dashboards |
| `2.png` | The week-rhythm view (routine dots across the week) | Six routines a day keep the household running |
| `3.png` | Any one of the other 40 routes you use daily | R1: the wedge — one table, four categories — then grow |

## Property platform — `public/reports/property-platform/`

**Anonymise all three** — blur or rename anything client-identifying.

| File | Screen to capture | It illustrates |
| --- | --- | --- |
| `1.png` | Brand Studio mid-switch (two tenants' branding contrast visible) | R1: brand is one config object |
| `2.png` | The tenant config object (the JSON that rebrands everything) | One object, no redeploy |
| `3.png` | The student workbench under any tenant's brand | R2: one client build, rebuilt as a platform |
