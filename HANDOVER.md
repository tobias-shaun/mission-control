# Mission Control — Deep-Test & Polish Handover

> **For the next agent.** You're taking over an animated portfolio site to **deep-test
> every flow, evaluate the design, and drive it toward the owner's end goal.** This doc
> gives you the mission, the map, the gotchas, and a concrete test/polish plan. Read it
> top to bottom before touching anything.

---

## 0. Mission (what "done" looks like)

Tobias's portfolio. He's a customer-success professional moving into AI product roles
(the site literally says **"OPEN TO ROLES"**), and he ships real AI products with AI
coding agents. The site is a space-themed "mission control" where each shipped product
is a **planet** you fly to, arriving at a **live, clickable demo** of the real product.

The owner's stated end goal, verbatim, is a **clean, polished, fast portfolio that:**
1. **Showcases his creative possibilities** (the "wow" — the design already leans hard here).
2. **Cleanly presents his projects in an interactive way** (the four planet demos).
3. **⭐ Mostly showcases his _process end to end_** — how he goes from problem → build →
   ship. **This is the primary goal and it is currently the weakest pillar** (see §6, #1).

Your north star when judging any change: **does a hiring manager, in 60 seconds, come away
understanding how this person thinks and ships — not just that the site looks cool?**
Creativity must _serve_ the substance, not bury it. If "clean" and "maximalist space
opera" ever conflict, resolve toward what makes his process legible.

---

## 1. Where it lives / how to run it

| | |
|---|---|
| **Project root** | `C:\Users\User\PM Portfolio` |
| **Stack** | Next.js **15.5.20** (App Router) · React 19 · TypeScript strict. No UI framework — bespoke inline styles. |
| **Live (public) URL** | **https://mission-control-snowy-beta.vercel.app** ✅ anonymous-accessible |
| **Vercel project** | `mission-control` (team `tobiasnorman1-7137s-projects`, projectId `prj_9zAdoBBYkjFkeTNvb2WY6MXDgRkb`). CLI is already authed as `tobiasnorman1-7137`. |

```bash
npm install
npm run dev      # http://localhost:3000  (start via .claude/launch.json → "mission-control-dev")
npm run build    # production build  — STOP the dev server first; they fight over .next/
npx vercel deploy --prod --yes   # ship; public URL is the *-snowy-beta.vercel.app alias
```

⚠️ **URL traps (verified):** the **team-scoped** deploy URLs
(`…-tobiasnorman1-7137s-projects.vercel.app` and the raw `dpl_…` URL) return HTTP 200 but
serve a **Vercel login wall** (Deployment Protection). And `mission-control.vercel.app`
is a **stranger's project**. Only the **`snowy-beta`** alias is public. When you verify a
deploy, don't trust the status code — fetch the HTML and confirm it says
`<title>Flight Ops — Tobias · AI Product</title>`.

---

## 2. Architecture & the #1 gotcha (read before editing)

> **PIPELINE DECISION (2026-07-18):** the generator stays authoritative — we did **not**
> detach. Markup changes go through `design-source/Mission Control.dc.html` +
> `python scripts/transform_template.py` (round-trip verified: re-running the transform
> reproduces `template.tsx` byte-for-byte apart from intended edits). `engine.ts`,
> `app/globals.css`, `app/layout.tsx`, and the `app/*` routes are hand-edited directly.

The site was **ported from a claude.ai/design file** (`design-source/Mission Control.dc.html`),
not hand-written. Two files are **GENERATED / TRANSPLANTED — editing them directly is a trap:**

| File | What it is | How to change it |
|---|---|---|
| `components/mission-control/template.tsx` | **Generated** JSX (the whole page markup) | Edit `design-source/Mission Control.dc.html` (or the transform), then `python scripts/transform_template.py`. Hand-edits get **overwritten**. |
| `components/mission-control/engine.ts` | Near-**verbatim transplant** of the design's imperative animation/interaction class. Carries `@ts-nocheck` on purpose. | Edit carefully; it's the canvas/scroll/astronaut/boost engine. Bridged to React in `MissionControl.tsx`. |
| `components/mission-control/sx.ts` | Parses the design's inline CSS strings → React style objects | stable helper |
| `components/mission-control/pseudo.ts` | Reproduces the design runtime's `style-hover`/`style-active` | stable helper |
| `app/globals.css` | Extracted verbatim from the design `<helmet>` (keyframes, cursor, media queries) | edit directly |
| `scripts/transform_template.py` | The DSL→JSX transform. **Contact details live in the `CONTACT` dict at the top.** | edit + re-run |

**Decision you must make early:** if the polish work becomes substantial (restructuring
sections, new components), decide whether to **keep round-tripping through the design
source + transform**, or to **"detach"** — declare `template.tsx` the source of truth from
here on and retire the generator. Don't drift into a state where you hand-edit
`template.tsx` _and_ keep the generator; that's how work gets silently lost. Whatever you
choose, write it at the top of this file and in the README.

**How React drives it:** `MissionControl.tsx` instantiates the engine once, bridges its
`setState` to a React re-render, and calls `engine.renderVals()` each render to produce the
flat `vals` object the template binds to (the original `{...props, ...renderVals()}`
contract). The page is **client-only (`ssr:false`)** — it owns `window`/`document`
throughout. The engine has a **generation guard (`window.__mcGen`)** so React StrictMode's
double-mount is safe.

---

## 3. Site map (every section — your test surface)

Rendered top to bottom. `data-screen-label` values are the engine's hooks (handy for
scoping tests). `data-room` drives the ambient room-glow color.

| # | Section (`id`) | `data-screen-label` | What's interactive |
|---|---|---|---|
| — | Boot overlay | `Boot sequence` | Typed console lines; **SKIP** button; flash→fade reveal. Shown once per tab session (`sessionStorage mc_boot_seen`). |
| — | HUD bar | `HUD bar` | Nav (flies to planets), ship-parts counter, OPEN TO ROLES (email). Becomes fixed on scroll. |
| 1 | Hero (`#top`) | `Hero` | Comms terminal **types itself**, aurora, **astronaut** (click empty space → he flies), crew rocket, **boost meter**, system-chart planets (fly links), telemetry (live clock/session/scroll). |
| 2 | Payload 01 (`#pay-01`) | `Payload 01 — hatched` | **hatched** stylist demo (light iOS theme): tap wardrobe pieces, **✨ style me**, pref chips, WARDROBE/HER-PROFILE tabs. |
| 3 | Payload 02 (`#pay-02`) | `Payload 02 — Job Command Center` | **JCC** pipeline: tap cards to advance stages, morning-brief checkboxes, funnel, RESET, PIPELINE/BRIEF tabs. |
| 4 | Payload 03 (`#pay-03`) | `Payload 03 — Life Hub` | **Life Hub**: toggle today's tasks, week-rhythm, RESET, TODAY/WEEK tabs. |
| 5 | Payload 04 (`#pay-04`) | `Payload 04 — Property platform` | **Property**: tenant switcher rebrands the whole UI live, brand-studio JSON, stats/bars, BRAND-STUDIO/TENANT-CONFIG tabs. |
| 6 | Flight plan | `Flight plan — How I build with AI` | Static — his build methodology. |
| 7 | Architecture | `Flight systems — architecture` | Static — the stack/system diagram. |
| 8 | Transfer log | `Transfer log — CS to product` | Static — CS → Product narrative. |
| 9 | Comms / finale (`#comms`) | `Comms — contact` | **Ship-assembly finale**: collect 4 parts (one per planet flyby) → ship repairs → **launch** CTA. Contact links. |
| 10 | Footer | `Footer` | Email / LinkedIn / GitHub. |
| — | `/reports/[slug]` | — | **Placeholder** report pages (see §6, #1). |

**Cross-cutting mechanics to test everywhere:**
- **Fly-through camera** (desktop ≥880px): wheel / touch / arrows/space / nav-click charge the
  **boost meter** and warp between planets. Hijacks scroll — programmatic `scrollTo` won't drive it.
- **Astronaut state machine**: idle bobs, click-empty-space to send him flying (orbits / slaloms /
  bonks widgets, raising force-field shields), perches on panels.
- **Part collection → launch**: flying past each planet collects its ship part; 4/4 → repair → launch.
- **Warp return**: a report page sets `sessionStorage mc_return`; Mission Control plays a warp
  overlay on return. (The placeholder `/reports/[slug]` already does this handshake.)
- **Reduced-motion**: `prefers-reduced-motion:reduce` disables the camera/astronaut, draws a static
  starfield, and reveals all content immediately.
- **Mobile (<880px)**: camera off, single column, astronaut/nav/ship-parts hidden.

---

## 4. Deep-test plan (work these as checklists)

### A. Functional / flows
- [ ] Boot: lines type in order, SKIP works, flash→fade reveals hero, re-load in same tab skips boot.
- [ ] Every nav item + every system-chart planet flies to the right payload; back-scroll/return works.
- [ ] Each payload's demo, fully: hatched **style me** (with 0, 1, ≥2 pieces selected + pref chips);
      JCC advance a card through all 4 stages incl. OFFER cycling back, brief checkboxes, RESET;
      Life Hub toggle tasks to 0-left state + RESET; Property switch all 3 tenants (UI + JSON rebrand).
- [ ] Tabs on all four payloads slide between screens; "APP MAP n/2" updates.
- [ ] Part collection: fly all four planets → ship parts reach 4/4 → finale shows "repaired" → **launch**
      animation fires and CTA label changes.
- [ ] Astronaut: click empty space sends him flying; he perches/orbits/bonks without escaping the viewport.
- [ ] All contact links resolve: email ×5 → `mailto:tobiasnorman1@gmail.com`; LinkedIn ×3 and GitHub ×3
      open the real profiles in a new tab; the only `#` links left are the two demo RESET buttons.
- [ ] `/reports/hatched|job-command-center|life-hub|property-platform` load; "back" sets `mc_return`
      and returns with the warp effect.

### B. Design / polish (the owner runs the **impeccable** skills — use them)
Per the owner's workflow, run and act on: **`/audit`** (a11y/perf/theming/anti-patterns, scored),
**`/critique`** (must clear **7+/10**), **`/optimize`**, **`/polish`**, plus `/distill` and
`/quieter` where the maximalism buries content. Evaluate each section for: spacing/rhythm,
hierarchy, alignment, the light-demo-in-dark-shell contrast, and whether motion has purpose vs. noise.
- [ ] Known nit: the fixed **boost meter** overlaps right-column content on some payloads at ~1280px
      (visible on Payload 02). Confirm and fix the overlap/z-index/margin.
- [ ] Custom cursor (reticle/ring) — confirm it never hides the caret in the demo inputs / feels good.
- [ ] Does the "clean, cleanly presents projects" goal hold, or does it read as busy? Be honest.

### C. Responsive
- [ ] 375 / 390 / 768 / 1024 / 1280 / 1440 / ultrawide. Exercise the **exact 880px** camera cutover.
- [ ] Verify no horizontal scroll, no clipped text, tappable targets ≥44px, the JSON/code blocks don't overflow.

### D. Performance (target: "fast")
- [ ] Lighthouse (mobile + desktop) on the **deployed** URL. Watch LCP with the boot overlay + 8 web fonts.
- [ ] Animation FPS: the rAF loop runs canvas starfield + fly camera + astronaut + planets every frame.
      Profile on a mid/low device; check CPU when idle and during a warp.
- [ ] Font strategy: currently 8 families via a Google Fonts `<link>`. Consider `next/font`, subsetting,
      or dropping unused weights. First-load JS is ~102 kB shared — reasonable; keep it that way.

### E. Accessibility
- [ ] Keyboard-only: can you reach/skip the boot, operate nav and every demo, launch? Focus-visible states?
- [ ] Reduced-motion path renders the full page usable and calm.
- [ ] Contrast on the low-opacity mono labels over the dark/starfield background.
- [ ] Screen-reader pass: the experience is canvas/animation-heavy — is the content still narratable?
      Consider `aria`/landmarks/headings and a text-first fallback.

### F. Content / correctness / meta
- [ ] No leftover placeholders (`hello@example.com` is gone — confirm). Product copy is accurate & his.
- [ ] `title`/`description` set; **no Open Graph / social-preview image yet** — add one (this link gets texted).
- [ ] Favicon present (`app/icon.svg`). Add `app/opengraph-image` for rich unfurls.

### G. Cross-browser
- [ ] Safari (backdrop-filter, `-webkit-` prefixes, `scale`), Firefox, Chrome; iOS Safari for touch fly + tap demos.

---

## 5. Evaluation lenses (judge as these people)
- **Hiring manager / recruiter (primary):** 60 seconds, skimming. Do they grasp his _process_ and see
  proof he ships? Is "contact / open to roles" obvious? This persona's verdict is the one that matters.
- **Engineer:** clicks the demos and reads the architecture/flight-plan. Does it hold up technically?
- **Phone visitor:** most link-clicks from a text will be mobile. Is the mobile story as strong as desktop?

---

## 6. Open items & known issues (prioritized)

1. **⭐ Process end-to-end — LARGELY DELIVERED 2026-07-18.** The four Mission Report pages are now
   real (problem → flight rules/decisions → build log → staged captures → receipts), built from
   site-truthful copy in `app/reports/[slug]/` (`reports-data.ts` holds all copy). **Remaining:**
   Tobias must supply real app screenshots per `SCREENSHOTS-NEEDED.md` (slots render as styled
   "AWAITING TRANSMISSION" frames until then). The original report design files in the
   claude.ai/design project remain an alternative direction if he prefers a richer port later.
2. ~~**Boost-meter overlap** at ~1280px~~ **FIXED 2026-07-18** — right gutter reserved for
   `[data-mc-pay]` at 880–1620px + dark backdrop pill on the meter (globals.css).
3. ~~**No social-preview image / OG tags**~~ **FIXED 2026-07-18** — `app/opengraph-image.png`
   + OG/Twitter metadata in `layout.tsx` (metadataBase = the snowy-beta alias).
4. **Dependency advisories:** `npm audit` shows 2 _moderate_ postcss issues (build-time only; the
   _critical_ Next.js one was already fixed by the 15.1.6 → 15.5.20 bump). Don't jump to Next 16
   (breaking major) without a reason.
5. **Email is public** (`tobiasnorman1@gmail.com`) — intended, but note spam exposure; a form or alias is an option.
6. **Auto-deploy isn't set up** — deploys are manual CLI. Owner may want GitHub → Vercel CI (offered, not done).
7. **Local dev server** may still be running an older in-memory build; restart it to pick up 15.5.20.

---

## 7. Guardrails
- **Verify with Playwright, not the in-app browser screenshot** — the continuous rAF loop makes the
  in-app `computer{screenshot}` time out. Playwright captures fine (wait ~2.5–3.5s past boot first).
- **Don't hand-edit generated files** (`template.tsx`, `engine.ts` markup) without honoring §2's decision.
- **Keep contact details real** — they're config in `scripts/transform_template.py` (`CONTACT`).
  Don't invent links; this is a real person's public page.
- **Secrets:** the Vercel CLI wrote `.env.local` (OIDC token) — it's gitignored; keep it that way.
- **Owner rules** (`~/.claude/CLAUDE.md`, `DESIGN_PHILOSOPHY.md`): no generic "AI-demo" look, CSS
  variables for color (this app currently uses design-derived inline styles — flag if you systematize),
  TS strict, build must pass before shipping.

---

## 8. Fast reference
- Regenerate markup: `python scripts/transform_template.py`
- Sections/hooks: `grep -n data-screen-label design-source/"Mission Control.dc.html"`
- Full port write-up: `README.md`
- Persistent context for future sessions: memory `mission-control-port-pipeline`
- Spawned follow-up: "Implement the 4 Mission Report pages" (task chip)
