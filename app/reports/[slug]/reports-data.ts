/**
 * Static content for the four Mission Report pages.
 *
 * Every line of copy here is sourced from the Mission Control page itself
 * (components/mission-control/template.tsx) — payload cards, flight rules,
 * mission notes, the Flight plan section, the architecture rows and the
 * Transfer log. Nothing is invented; longer passages only recombine
 * sentences that already exist on the site.
 *
 * Screenshot slots: each capture renders as a styled "AWAITING TRANSMISSION"
 * placeholder until `src` is set. Drop the real capture into
 * public/reports/<slug>/<file> and add `src: "/reports/<slug>/<file>"` to the
 * matching entry — that one line activates the image. See SCREENSHOTS-NEEDED.md
 * at the repo root for the exact shot list.
 */

export type FlightRule = {
  id: string;
  /** The rule, verbatim from the payload card. */
  rule: string;
  /** One short supporting line drawn from related existing copy. */
  note?: string;
  /** The payload's mission note, attached to the rule it belongs to. */
  quote?: string;
};

export type CaptureSlot = {
  /** Expected filename under public/reports/<slug>/ (see SCREENSHOTS-NEEDED.md). */
  file: string;
  title: string;
  /** Shown below the frame — ties the capture back to a flight rule. */
  caption: string;
  /** Set to "/reports/<slug>/<file>" once captured — this activates the image. */
  src?: string;
};

export type Receipt = { value: string; label: string };

export type Report = {
  num: string;
  slug: string;
  name: string;
  accent: string;
  /** Accent as "r, g, b" for rgba() borders and glows. */
  accentRgb: string;
  /** Short status for titles: "PRE-LAUNCH". */
  shortStatus: string;
  /** Full status badge text from the payload header. */
  status: string;
  planetLabel: string;
  oneLiner: string;
  stack: string[];
  /** THE PROBLEM — recombined from the payload's own copy. */
  problem: string[];
  flightRules: FlightRule[];
  /** BUILD LOG — the per-product line from the architecture section. */
  buildNote: string;
  captures: CaptureSlot[];
  receipts: Receipt[];
  receiptsNote?: string;
};

/** Slugs in planet order — must match engine.ts reportSlugs exactly. */
export const REPORT_SLUGS = [
  "hatched",
  "job-command-center",
  "life-hub",
  "property-platform",
] as const;

export type ReportSlug = (typeof REPORT_SLUGS)[number];

/** BUILD LOG framing — from the footer + Flight systems section. */
export const BUILD_FRAME =
  "Built end-to-end with AI coding agents, directed like a product team. Claude Code across every build — prompts are versioned in the repo and reviewed like code. AI is a dependency to manage, not magic to sprinkle.";

/** The three stages, verbatim from the Flight plan section. */
export const BUILD_STAGES = [
  {
    num: "01",
    color: "#FF6EC7",
    title: "Problem first",
    body: "Every build starts as a customer problem I've watched real people have — never as a technology looking for one.",
  },
  {
    num: "02",
    color: "#9B7CFF",
    title: "PRD before code",
    body: "I write the PRD, the success criteria and the cut list before a line is generated. The thinking is the work.",
  },
  {
    num: "03",
    color: "#34E0FF",
    title: "Ship, then listen",
    body: "Real users, honest status labels, and iteration driven by what people actually do — not what they say.",
  },
] as const;

/** Verbatim from the Flight plan section's amber card. */
export const FLIGHT_RULE_00 =
  "“AI writes much of my code. It doesn't decide what to build, for whom, or what ships — that's the job.”";

const REPORTS: Record<ReportSlug, Report> = {
  hatched: {
    num: "01",
    slug: "hatched",
    name: "hatched",
    accent: "#FF9EB8",
    accentRgb: "255, 158, 184",
    shortStatus: "PRE-LAUNCH",
    status: "PRE-LAUNCH · RECRUITING FOUNDING COHORT",
    planetLabel: "PLANET 01 — CONSUMER AI",
    oneLiner:
      "AI styling for postpartum mums. Warm iOS feel — her wardrobe, her rules.",
    stack: ["next.js", "supabase", "claude"],
    problem: [
      "AI styling for postpartum mums, with a warm iOS feel — her wardrobe, her rules. Postpartum bodies are the default, not an edge case; in the product, postpartum is the default, not a setting.",
      "Renewals in customer success taught me that trust compounds account by account — so hatched is recruiting its founding cohort one conversation at a time: weekly styling, honest feedback, no fake numbers.",
    ],
    flightRules: [
      {
        id: "R1",
        rule: "Styles what she already owns — it never sells her anything",
        quote:
          "Mission note — it will never tell a new mum to buy anything. That one decision shaped the entire product.",
      },
      {
        id: "R2",
        rule: "Postpartum bodies are the default, not an edge case",
        note: "Comfort rules govern every suggestion — no exceptions: the stylist can't override these, and neither can we.",
      },
      {
        id: "R3",
        rule: "AI suggests; mum decides — no auto-anything",
        note: "Every look is AI-suggested — she decides. Honest status labels, no dark patterns.",
      },
    ],
    buildNote:
      "Wardrobe images live in Supabase storage; the styling prompt is the product's core IP — treated like source code.",
    captures: [
      {
        file: "1.png",
        title: "The wardrobe",
        caption:
          "Her wardrobe — tap pieces to include them. R1: it styles what she already owns.",
      },
      {
        file: "2.png",
        title: "Today's look",
        caption: "AI-suggested — you decide. R3: no auto-anything.",
      },
      {
        file: "3.png",
        title: "Comfort rules",
        caption:
          "R2: postpartum is the default, not a setting — every suggestion respects these.",
      },
      {
        file: "4.png",
        title: "Founding cohort",
        caption: "Pre-launch, and saying so — real mums shape what ships.",
      },
    ],
    receipts: [
      { value: "0", label: "fake numbers on this page" },
      { value: "1:1", label: "cohort recruited one conversation at a time" },
      { value: "WEEKLY", label: "styling + honest feedback from real mums" },
    ],
    receiptsNote:
      "Pre-launch, and saying so. A small group of real mums shapes what ships.",
  },

  "job-command-center": {
    num: "02",
    slug: "job-command-center",
    name: "Job Command Center",
    accent: "#93A2FF",
    accentRgb: "147, 162, 255",
    shortStatus: "IN DAILY USE",
    status: "IN DAILY USE · RUNS MY OWN SEARCH",
    planetLabel: "PLANET 02 — OPS TOOLING",
    oneLiner:
      "Job-search ops, run like revenue ops. Emails me my action list every morning.",
    stack: ["next.js", "supabase", "resend"],
    problem: [
      "Job-search ops, run like revenue ops: a pipeline board, a live funnel that follows it, and a daily brief generated from pipeline state.",
      "Adoption risk is product risk — I design for the moment after the demo. A tool you must remember to open is a tool you stop using, so this one comes to me: a morning action list by email.",
    ],
    flightRules: [
      {
        id: "R1",
        rule: "No auto-submit, ever — I review every application",
        note: "Trust is a feature — honest status labels, no dark patterns, no auto-anything.",
      },
      {
        id: "R2",
        rule: "The tool comes to me — morning action list by email",
        note: "A tool you must remember to open is a tool you stop using.",
        quote:
          "Mission note — every morning it emails me the day's moves before I've made coffee. You're looking at my actual workflow.",
      },
      {
        id: "R3",
        rule: "Follow-ups are first-class objects, not buried notes",
        note: "Advance a card on the board and tomorrow's brief changes — the brief and the funnel follow the pipeline.",
      },
    ],
    buildNote:
      "A scheduled job reads pipeline state each morning; Resend delivers the brief. The interactive demo on Mission Control mirrors that exact flow.",
    captures: [
      {
        file: "1.png",
        title: "The pipeline board",
        caption:
          "Job-search ops run like revenue ops. R3: follow-up nudges live on the cards themselves.",
      },
      {
        file: "2.png",
        title: "The 07:00 brief",
        caption:
          "R2: the tool comes to me — the day's moves emailed before I've made coffee.",
      },
      {
        file: "3.png",
        title: "The live funnel",
        caption:
          "Generated from pipeline state — advance a card and tomorrow's brief changes.",
      },
    ],
    receipts: [
      { value: "DAILY", label: "in use — runs my own search" },
      { value: "07:00", label: "action list emailed every morning" },
      { value: "LIVE", label: "brief + funnel generated from pipeline state" },
    ],
  },

  "life-hub": {
    num: "03",
    slug: "life-hub",
    name: "Life Hub",
    accent: "#FF9E6E",
    accentRgb: "255, 158, 110",
    shortStatus: "IN DAILY USE",
    status: "IN DAILY USE · OUR HOUSEHOLD RUNS ON IT",
    planetLabel: "PLANET 03 — THE FAMILY OS",
    oneLiner:
      "The family OS our household runs on. 175k lines · 40 routes · two daily users.",
    stack: ["next.js", "supabase"],
    problem: [
      "The family OS our household runs on — built so the family's mental load has somewhere to live that isn't someone's head.",
      "It started as a wedge — one table, four categories — and grew into 175k lines, 40 routes and two daily users. Built for two users and opinionated by design; six routines a day keep the household running.",
    ],
    flightRules: [
      {
        id: "R1",
        rule: "Wedge: one table, four categories — then grow",
        note: "It grew: 175k lines, 40 routes, one Postgres schema.",
      },
      {
        id: "R2",
        rule: "Built for two users; opinionated by design",
        quote:
          "Mission note — 175,000 lines of code so the family's mental load has somewhere to live that isn't someone's head.",
      },
      {
        id: "R3",
        rule: "Big numbers over dashboards — “4 tasks left” beats a chart",
        note: "Six routines a day keep the household running. The rhythm view is why we open it every morning.",
      },
    ],
    buildNote:
      "One Postgres schema, with row-level security scoped to a two-person household — permissions live in the database, not scattered through app code.",
    captures: [
      {
        file: "1.png",
        title: "The Today view",
        caption:
          "R3: big numbers over dashboards — “4 tasks left” beats a chart.",
      },
      {
        file: "2.png",
        title: "Week rhythm",
        caption:
          "Six routines a day keep the household running — the rhythm view is why we open it every morning.",
      },
      {
        file: "3.png",
        title: "One of the 40 routes",
        caption: "R1: the wedge — one table, four categories — then grow.",
      },
    ],
    receipts: [
      { value: "175k", label: "lines of code" },
      { value: "40", label: "routes" },
      { value: "2", label: "daily users" },
      { value: "6", label: "routines a day" },
    ],
  },

  "property-platform": {
    num: "04",
    slug: "property-platform",
    name: "Property platform",
    accent: "#6EC8FF",
    accentRgb: "110, 200, 255",
    shortStatus: "CLIENT DELIVERY",
    status: "CLIENT DELIVERY · CODE PRIVATE",
    planetLabel: "PLANET 04 — MULTI-TENANT SAAS",
    oneLiner:
      "Client build → multi-tenant white-label SaaS. Glass fintech UI, tenant-swappable brand.",
    stack: ["next.js", "postgres RLS"],
    problem: [
      "One client build, rebuilt as a multi-tenant white-label platform. Glass fintech UI, tenant-swappable brand.",
      "White-label from day one: brand is one config object, and one object rebrands everything — no redeploy. One deployment, N tenants — a config object per tenant, enforced by Postgres RLS.",
    ],
    flightRules: [
      {
        id: "R1",
        rule: "White-label from day one — brand is one config object",
        note: "One object rebrands everything — no redeploy.",
      },
      {
        id: "R2",
        rule: "One client build, rebuilt as a platform",
        quote:
          "Mission note — a client delivery rebuilt as a white-label platform. The brand switcher is the whole thesis.",
      },
      {
        id: "R3",
        rule: "Code private; architecture walkthrough on request",
        note: "Anonymised on this page — full diagrams and the why-not list live on a call.",
      },
    ],
    buildNote:
      "Auth, storage and Postgres row-level security as the permission model — permissions live in the database, not scattered through app code.",
    captures: [
      {
        file: "1.png",
        title: "Brand Studio",
        caption:
          "R1: switch tenant to live-rebrand the workbench — brand is one config object.",
      },
      {
        file: "2.png",
        title: "The tenant config",
        caption: "One object rebrands everything — no redeploy.",
      },
      {
        file: "3.png",
        title: "The student workbench",
        caption:
          "R2: one client build, rebuilt as a platform. Anonymised — code private.",
      },
    ],
    receipts: [
      { value: "1", label: "config object rebrands everything" },
      { value: "N", label: "tenants on one deployment" },
      { value: "RLS", label: "tenant isolation in Postgres" },
      { value: "PRIVATE", label: "code — walkthrough on request" },
    ],
    receiptsNote:
      "Client delivery, code private — architecture walkthrough on request.",
  },
};

export function getReport(slug: string): Report | undefined {
  return REPORT_SLUGS.includes(slug as ReportSlug)
    ? REPORTS[slug as ReportSlug]
    : undefined;
}
