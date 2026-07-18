# Mission Control — AI Product Portfolio

Tobias's portfolio, built as a mission-control flight console: a space-themed,
scroll-driven experience where each of four shipped AI products is a "planet" you
fly to, with a live, clickable demo of the real product on arrival.

Imported from the [claude.ai/design](https://claude.ai/design) project
**"Tobias's AI product portfolio"** (`Mission Control.dc.html`) and implemented
as a production **Next.js + TypeScript** app.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- No UI framework — the design is a bespoke, self-contained animated experience.
  Fonts load from Google Fonts; everything else is hand-authored.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

The Mission Control page is client-only (`ssr: false`): it's a continuous
canvas/scroll engine that owns `window`/`document` throughout, so server
rendering adds nothing and would only risk hydration mismatches.

## How the design was ported

The source `.dc.html` is a template + logic class rendered by the design tool's
`support.js` runtime. Rather than reinterpret the design, it was ported faithfully:

| Source concept | Here |
| --- | --- |
| `class Component extends DCLogic` (imperative animation + state) | [`components/mission-control/engine.ts`](components/mission-control/engine.ts) — transplanted near-verbatim; only the runtime seams changed (`DCLogic` → `EngineBase`, `React.createRef` → shim, report links → routes). |
| `<x-dc>` DSL template (`{{ }}`, `sc-if`, `sc-for`, `onClick`, `style-hover`) | [`components/mission-control/template.tsx`](components/mission-control/template.tsx) — **generated** JSX. |
| `support.js` `style-hover` / `style-active` | [`pseudo.ts`](components/mission-control/pseudo.ts) — a faithful port of its pseudo-class stylesheet. |
| verbatim inline `style="..."` strings | [`sx.ts`](components/mission-control/sx.ts) — parses CSS strings to React style objects at runtime. |
| `<helmet><style>` (keyframes, cursor, media queries) | [`app/globals.css`](app/globals.css) — extracted verbatim. |

The React wrapper ([`MissionControl.tsx`](components/mission-control/MissionControl.tsx))
keeps the engine's own mutable `state` and bridges its `setState` to a React
re-render, recomputing `engine.renderVals()` on each render — exactly the
`{ ...props, ...renderVals() }` contract the design runtime used.

### Regenerating the template

`template.tsx` is produced from the original design by a transform script — do
not edit it by hand:

```bash
python scripts/transform_template.py
```

The original design files live in [`design-source/`](design-source/) for reference.

### Contact details

Email / LinkedIn / GitHub links are configured in the `CONTACT` block at the top
of [`scripts/transform_template.py`](scripts/transform_template.py). Edit those
values and re-run the transform to update every contact link (hero, finale CTA,
HUD bar, footer).

## Routes

- `/` — Mission Control (the portfolio).
- `/reports/[slug]` — Mission Report deep-dives for the four products
  (`hatched`, `job-command-center`, `life-hub`, `property-platform`). Each
  report runs problem → flight rules → build log → staged real-app captures
  (screenshots pending) → receipts.

The repo is under git. The generator pipeline remains authoritative:
`design-source/` plus the transform script produce `template.tsx` — regenerate,
don't hand-edit.
