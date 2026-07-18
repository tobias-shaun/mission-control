# Mission Control — Deep-Test & Design Evaluation Report
**Date:** 2026-07-18 · **Method:** full interactive Playwright sweep (every flow, 9 viewport widths, keyboard, reduced-motion) + 50-agent adversarially-verified static code audit + impeccable `/audit`–`/critique` pass. All findings below were empirically reproduced or code-verified; none are speculative.

---

## ⚠️ ACTION NEEDED FIRST: the live site is STALE
The deployed bundle at **mission-control-snowy-beta.vercel.app** predates the current code — it lacks the retro-boost, keyboard camera, and every fix from this session. My deploy attempt was blocked by session permissions. **Run:**

```bash
npm run build          # verified passing — 0 TS errors, 104 kB first-load
npx vercel deploy --prod --yes
```

then confirm `https://mission-control-snowy-beta.vercel.app` serves `<title>Flight Ops — Tobias · AI Product</title>`.

---

## 1. What passed (the site is fundamentally solid)

Every core flow works, verified end-to-end on the current code:

- **Boot** — lines type in order, SKIP works (mouse *and* keyboard), `mc_boot_seen` skips it on reload. Reduced-motion skips it entirely.
- **Fly-through camera** — nav links, system-chart planets, wheel-charge → warp, arrow/space keys, exact 880 px cutover (879 native / 880 fly).
- **All four demos** — hatched style-me (0/1/3-piece + chips), JCC full stage cycle incl. OFFER→APPLIED wrap + live funnel + brief checkboxes + RESET, Life Hub toggle-to-zero ("all clear today" state) + cross-tab week liveness + RESET, Property 3-tenant live rebrand incl. JSON. Tabs and APP MAP n/2 update on all four.
- **Part collection** — 4/4 on flybys → finale "SHIP REPAIRED" → launch fires ("LAUNCHED — SEE YOU IN THE INBOX").
- **Astronaut** — click-empty-space flight, perching, beacons; never escapes viewport.
- **Contact links** — exactly per spec: 5× mailto, 3× LinkedIn, 3× GitHub (new tab), only the 2 RESET `#` links.
- **Warp handshake** — report dive sets/consumes `mc_return`, warp overlay plays.
- **Responsive** — zero horizontal scroll at 375→1920, JSON blocks contained, tablet fine.
- **Perf at idle** — ~8 ms/frame rAF, first-load JS 104 kB.

## 2. Fixed & verified this session

| Fix | Where | Verified |
|---|---|---|
| **P0** Warp overlay permanently blanked the page after report→back on mobile / reduced-motion | `engine.ts` `setupFly()` mobile branch now consumes `mc_return` + clears `warpOn` | Playwright: overlay gone at 375 px after return |
| **P1** Report return always played *hatched pink* + dropped you at the hero (engine parsed the slug as an index) | `engine.ts` — `reportSlugs` map; camera lands on the source planet; `warpBg` tinted per planet | Property return → blue clouds, camera on Payload 04 |
| **P1** Boost meter collided with payload copy at 880–1600 px (worst at 1280: garbled text) | `globals.css` — 96 px right gutter on `[data-mc-pay]` + dark backdrop pill on the meter | 1280 screenshot: full kanban fits, meter text legible |
| **P1** No OG/social preview | `app/opengraph-image.png` (1200×630 hero) + OG/Twitter metadata + `metadataBase` in `layout.tsx` | og:image / twitter:card meta present |
| **P2** Footer credited "TAILWIND & MOTION" (neither in the stack) | design source + transform re-run (round-trip verified byte-identical) | Now "NEXT.JS, TYPESCRIPT & CLAUDE CODE" |
| **P2** Unknown `/reports/*` slug rendered junk with HTTP 200 | `notFound()` + themed `app/not-found.tsx` ("SIGNAL LOST · 404") | /reports/bogus-payload → 404 page |
| **P2** No keyboard focus ring parity; light UA scrollbars | `globals.css` `:focus-visible` cyan ring + `color-scheme: dark` | Tab shows 2 px ring |
| **P3** Canvases in a11y tree; Next scroll-behavior warning; no robots/sitemap | `aria-hidden` in `engine.ts`; `data-scroll-behavior` attr; `robots.ts` + `sitemap.ts` | All serve/verified |

**Pipeline decision (documented in HANDOVER §2):** generator stays authoritative — no detach. Transform round-trip re-verified.

## 3. Scorecard

**/audit health: 13/20 — "Acceptable"** (A11y 2 · Performance 3 · Theming 2 · Responsive 3 · Anti-patterns 3).
**/critique: 7.5/10 post-fix** (pre-fix ≈6 — the P0, meter collision, and stale deploy dragged it). Passes the 7+ gate *on desktop*. What holds it back from 9: the process story dead-ends (below), demos aren't operable by keyboard/screen reader, and the mobile finale gimmick dangles.

**Anti-pattern verdict:** the site does *not* read as AI slop — it's distinctive, coherent, and the light-app-in-dark-shell contrast is genuinely good. Two AI-adjacent tells worth knowing about: gradient text on "SHIPPED"/"TALK." and glow-heavy accents (owner's global rules ban gradient text; here it's a deliberate design choice — flagged, not changed).

## 4. ⭐ The single biggest strategic gap (unchanged, needs your call)

**The process-end-to-end story — the #1 goal — still dead-ends.** Four beautiful "FULL MISSION REPORT ↗" CTAs play a 2.75 s cinematic descent… into a placeholder that says "coming online." A hiring manager who clicks the one thing that would show *how you work* gets nothing. The four real report designs exist (`Mission Report - *.dc.html` in the claude.ai/design project) and there's already a spawned task chip to port them. **This is the highest-leverage work on the site** — everything else is polish by comparison. Two complements worth doing with it:
- A one-line "problem → decisions → ship date" strip on each payload (visible without diving).
- The Flight Plan section is good but generic-feeling next to the demos; the reports would let it point at receipts.

## 5. Remaining findings (prioritized, all verified)

### P1 — fix before sharing the link widely
1. **Demos are mouse-only.** Wardrobe tiles, kanban cards, brief items, Life Hub tasks are `onClick` divs — no `tabIndex`/`role`/keyboard, invisible to AT ([template.tsx:306](components/mission-control/template.tsx:306), 439, 471, 592). Tabs/chips are real buttons, so the pattern exists. Fix in `transform_template.py` (emit buttons), re-run transform. ~Half-day, structural → **propose, didn't touch**.
2. **Tab can shear the demo slide-track.** Hidden slide keeps focusables; focusing them scrolls the `overflow:hidden` container and permanently misaligns the demo ([template.tsx:292](components/mission-control/template.tsx:292)). Fix: `inert` on the inactive slide from the engine + scrollLeft guard.
3. **GitHub links (×3) point to an empty profile** (`tobias-shaun`, 0 public repos). An engineer clicking through sees nothing. Either pin 2–3 repos (even the portfolio itself) or drop the links. **Your call — content decision.**
4. **Mobile finale promises the impossible:** "SHIP REPAIR 0/4 — A PART WAITS ON EACH PLANET" — but parts can't be collected without the desktop camera. Most text-message link-clicks are mobile (persona #3). Options: hide the chips row on mobile, or collect parts on scroll-into-view via the existing observer. Small engine change; behavior decision → propose.

### P2
5. **hatched style-me ignores a single selected piece** and captions mismatch outfits ("the sage grounds the rose" over no-rose look) — `engine.ts` `styleMe()`: `>= 2` threshold + `noteIx` cycling independent of pool. Also weakens R1's "styles what she already owns" claim.
6. **"CREW VEHICLE — DAMAGED · 4 PARTS NEEDED" is hardcoded** ([template.tsx:210](components/mission-control/template.tsx:210)) — still says damaged at 4/4 with the ship repaired. Needs a vals binding through the transform.
7. **Low-opacity mono labels fail WCAG AA** (0.35–0.45 alpha ⇒ 2.8–4.0:1 at 8.5–10 px): APP MAP, stack lines, SYS captions, footer colophon, report-page return link. These are exactly the credibility details recruiters skim. Raise label alphas to ≥0.62 in design source (also some in-demo muted text at 2.4–3.4:1).
8. **Unmount leaks 8 of 9 global listeners** (wheel/touch/keys/click survive client-side back-nav; non-passive wheel keeps preventDefaulting). Also **resize across 880 px** (tablet rotate) permanently kills reveal observers/part collection, and **live reduced-motion toggle** isn't tracked. All engine lifecycle work — do together.
9. **Warp jank:** p95 frame 146 ms during warps (13 dropped frames/warp in dev). Suspects: per-frame `getBoundingClientRect` interleaved with style writes + full 119 kB template re-render up to 25×/s during flights (`scrollPct` setState) and 1 Hz forever (clock). `/optimize` candidate.
10. **Fonts:** 8 families / 26 styles via render-blocking Google CSS. Six weights never load in any state (Archivo 500, Martian Mono 300/500, Geist Mono 500, Bricolage 500/600) — trim the URL, or move to `next/font`. Also **no error.tsx** (engine crash = white screen), **full name appears nowhere** (title/copy say only "Tobias" — metadata now says it's a portfolio, but consider "Tobias Norman" in the title for searchability), **no CV/resume link**, **not under git** (`git init` + push strongly recommended — unpushed work doesn't exist, per your own rules), and tap targets (tab pills ~27 px, RESET ~13 px) under 44 px on mobile.

### P3 (noted, low stakes)
Life Hub demo dates are 2025's calendar ("Fri 11 Jul"); "IFRAME SLOT READY — LIVE APP NEXT" roadmap-speak visible under hatched; RESET links are `href="#"` anchors; DPR sampled once (wrong-scale canvases after monitor move); rm-mode resize blanks starfield; `npm run lint` broken (no ESLint config); nav links hidden at 880–1023 px though camera is on; hardcoded palette duplicated across 5 files (owner CSS-variable rule — systematization note); status badges can tuck under the meter pill at some widths (clean occlusion now, not garbling).

## 6. Suggested order of attack
1. **Deploy** (command above) — the public link is currently a worse site than the one on disk.
2. **Port the four Mission Report pages** (existing task chip) — the strategic gap.
3. **Demo a11y batch** (findings 1+2+7 together — one transform pass + engine inert).
4. **Engine lifecycle batch** (finding 8, then 9's re-render fix).
5. **Content calls you own:** GitHub profile (3), mobile parts (4), full name, CV link, git init.

*Artifacts: ~30 verification screenshots in the session scratchpad; static-audit detail (44 confirmed + 9 gap findings, JSON) in the workflow output. Both referenced in the session transcript.*
