import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import {
  BUILD_FRAME,
  BUILD_STAGES,
  FLIGHT_RULE_00,
  REPORT_SLUGS,
  getReport,
  type CaptureSlot,
  type Report,
} from "./reports-data";
import { BackToMissionControl } from "./report-client";

const MONO = "'Martian Mono', monospace";
const DISPLAY = "'Archivo Black', sans-serif";
const SERIF = "'Instrument Serif', serif";
const BODY = "rgba(237,239,247,0.93)";
const DIM = "rgba(237,239,247,0.8)";
const DIMMER = "rgba(237,239,247,0.62)";
const HAIRLINE = "1px solid rgba(147,162,255,0.14)";

/* Static CSS starfield — three tiled dot layers, no animation (nothing to
   reduce for prefers-reduced-motion), no canvas, no deps. */
const STARFIELD_IMAGE = [
  "radial-gradient(1px 1px at 25px 45px, rgba(237,239,247,0.5) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 125px 160px, rgba(237,239,247,0.3) 50%, transparent 51%)",
  "radial-gradient(1.5px 1.5px at 75px 220px, rgba(237,239,247,0.38) 50%, transparent 51%)",
].join(", ");
const STARFIELD_SIZE = "190px 190px, 260px 260px, 330px 330px";

export function generateStaticParams() {
  return REPORT_SLUGS.map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const r = getReport(slug);
  if (!r) return { title: "Signal lost · Flight Ops" };
  const title = `Mission Report ${r.num} — ${r.name} · Tobias Norman`;
  return {
    title,
    description: r.oneLiner,
    openGraph: {
      title,
      description: r.oneLiner,
      url: `/reports/${r.slug}`,
      type: "article",
    },
  };
}

function SectionLabel({ num, text, r }: { num: string; text: string; r: Report }) {
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: 9.5,
        letterSpacing: "0.22em",
        color: r.accent,
        borderBottom: `1px solid rgba(${r.accentRgb}, 0.3)`,
        paddingBottom: 9,
        marginBottom: 24,
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <span>
        {num} · {text}
      </span>
      <span style={{ color: "rgba(237,239,247,0.5)" }}>SYS-{r.num}</span>
    </div>
  );
}

function Section({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <section style={{ marginTop: 72, ...style }}>{children}</section>;
}

function MissionQuote({ text, r }: { text: string; r: Report }) {
  return (
    <p
      style={{
        margin: "14px 0 0",
        paddingLeft: 14,
        borderLeft: `2px solid rgba(${r.accentRgb}, 0.55)`,
        fontFamily: SERIF,
        fontStyle: "italic",
        fontSize: 20,
        lineHeight: 1.5,
        color: "rgba(237,239,247,0.88)",
      }}
    >
      {text}
    </p>
  );
}

function Capture({ slot, index, r }: { slot: CaptureSlot; index: number; r: Report }) {
  const capNum = String(index + 1).padStart(2, "0");
  const tick = `1px solid rgba(${r.accentRgb}, 0.6)`;
  const corners: CSSProperties[] = [
    { top: 10, left: 10, borderTop: tick, borderLeft: tick },
    { top: 10, right: 10, borderTop: tick, borderRight: tick },
    { bottom: 10, left: 10, borderBottom: tick, borderLeft: tick },
    { bottom: 10, right: 10, borderBottom: tick, borderRight: tick },
  ];
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 10",
          background: "#0B0F1A",
          border: slot.src
            ? `1px solid rgba(${r.accentRgb}, 0.3)`
            : `1px dashed rgba(${r.accentRgb}, 0.45)`,
          borderRadius: 12,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {slot.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slot.src}
            alt={`${r.name} — ${slot.title}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <>
            {corners.map((c, i) => (
              <span
                key={i}
                aria-hidden
                style={{ position: "absolute", width: 14, height: 14, ...c }}
              />
            ))}
            <div style={{ textAlign: "center", padding: "0 24px" }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  letterSpacing: "0.32em",
                  color: r.accent,
                  marginBottom: 12,
                }}
              >
                AWAITING TRANSMISSION
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "rgba(237,239,247,0.85)",
                }}
              >
                {slot.title}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 8.5,
                  letterSpacing: "0.18em",
                  color: "rgba(237,239,247,0.5)",
                  marginTop: 10,
                }}
              >
                CAPTURE {capNum} · 16:10
              </div>
            </div>
          </>
        )}
      </div>
      <figcaption
        style={{
          display: "flex",
          gap: 12,
          alignItems: "baseline",
          padding: "12px 4px 0",
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            letterSpacing: "0.16em",
            color: r.accent,
            flexShrink: 0,
          }}
        >
          CAP {capNum}
        </span>
        <span style={{ fontSize: 14.5, lineHeight: 1.6, color: "rgba(237,239,247,0.78)" }}>
          {slot.caption}
        </span>
      </figcaption>
    </figure>
  );
}

export default async function ReportPage({ params }: PageProps) {
  const { slug } = await params;
  const r = getReport(slug);
  if (!r) notFound();

  return (
    <main
      style={{
        minHeight: "100vh",
        color: "#EDEFF7",
        fontFamily: "'Archivo', sans-serif",
        position: "relative",
        overflowX: "clip",
      }}
    >
      {/* starfield + per-planet tint (fixed, non-interactive, static) */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: STARFIELD_IMAGE,
          backgroundSize: STARFIELD_SIZE,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(900px 480px at 50% -12%, rgba(${r.accentRgb}, 0.12), transparent 70%)`,
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 824,
          margin: "0 auto",
          padding: "28px 16px 96px",
          boxSizing: "border-box",
        }}
      >
        {/* elevated reading surface — long-form text never sits on the bare
            starfield; the panel bounds the column and mutes the dots behind it */}
        <article
          style={{
            background:
              "linear-gradient(180deg, rgba(16,21,34,0.9), rgba(11,15,25,0.95))",
            border: "1px solid rgba(147,162,255,0.12)",
            borderRadius: 18,
            padding: "0 clamp(20px, 5vw, 52px) 72px",
            boxShadow: "0 30px 80px -48px rgba(0,0,0,0.85)",
          }}
        >
        {/* top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "20px 0",
            borderBottom: HAIRLINE,
          }}
        >
          <BackToMissionControl slug={r.slug} accent={r.accent} accentRgb={r.accentRgb} variant="bar" />
          <span
            style={{
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: "0.2em",
              color: DIMMER,
            }}
          >
            REPORT {r.num} / 04
          </span>
        </div>

        {/* header */}
        <header style={{ paddingTop: 56 }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.24em",
              color: r.accent,
              marginBottom: 18,
              lineHeight: 1.9,
            }}
          >
            MISSION REPORT {r.num} · {r.status}
          </div>
          <h1
            style={{
              margin: "0 0 16px",
              fontFamily: DISPLAY,
              fontSize: "clamp(38px, 8vw, 68px)",
              lineHeight: 0.98,
              letterSpacing: "-0.01em",
            }}
          >
            {r.name}
          </h1>
          <p
            style={{
              margin: "0 0 22px",
              fontSize: 17,
              lineHeight: 1.65,
              color: DIM,
              maxWidth: "52ch",
            }}
          >
            {r.oneLiner}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            {r.stack.map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily: MONO,
                  fontSize: 9.5,
                  letterSpacing: "0.1em",
                  color: "rgba(237,239,247,0.75)",
                  border: `1px solid rgba(${r.accentRgb}, 0.3)`,
                  padding: "6px 10px",
                  borderRadius: 3,
                }}
              >
                {chip}
              </span>
            ))}
            <span
              style={{
                fontFamily: MONO,
                fontSize: 9,
                letterSpacing: "0.18em",
                color: "rgba(237,239,247,0.55)",
                marginLeft: "auto",
              }}
            >
              {r.planetLabel}
            </span>
          </div>
        </header>

        {/* 01 — THE PROBLEM */}
        <Section>
          <SectionLabel num="01" text="THE PROBLEM" r={r} />
          {r.problem.map((p, i) => (
            <p
              key={i}
              style={{
                margin: i ? "16px 0 0" : 0,
                fontSize: 17,
                lineHeight: 1.75,
                color: BODY,
              }}
            >
              {p}
            </p>
          ))}
        </Section>

        {/* 02 — FLIGHT RULES */}
        <Section>
          <SectionLabel num="02" text="FLIGHT RULES — THE DECISIONS" r={r} />
          <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {r.flightRules.map((fr) => (
              <li
                key={fr.id}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "18px 0",
                  borderBottom: "1px solid rgba(147,162,255,0.12)",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: r.accent,
                    paddingTop: 5,
                    flexShrink: 0,
                  }}
                >
                  {fr.id}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 16.5,
                      fontWeight: 600,
                      lineHeight: 1.5,
                      color: "rgba(237,239,247,0.92)",
                    }}
                  >
                    {fr.rule}
                  </div>
                  {fr.note ? (
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: DIM,
                      }}
                    >
                      {fr.note}
                    </p>
                  ) : null}
                  {fr.quote ? <MissionQuote text={fr.quote} r={r} /> : null}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* 03 — BUILD LOG */}
        <Section>
          <SectionLabel num="03" text="BUILD LOG — HOW IT WAS BUILT" r={r} />
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.75, color: BODY }}>
            {BUILD_FRAME}
          </p>
          <div
            style={{
              marginTop: 30,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {BUILD_STAGES.map((st) => (
              <div key={st.num} style={{ display: "flex", gap: 16 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    border: `1px solid ${st.color}`,
                    color: st.color,
                    fontFamily: MONO,
                    fontSize: 10.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {st.num}
                </div>
                <div style={{ paddingTop: 4, minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 5 }}>
                    {st.title}
                  </div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: DIM }}>
                    {st.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 30,
              border: `1px solid rgba(${r.accentRgb}, 0.25)`,
              borderRadius: 8,
              padding: "16px 18px",
              background: "rgba(11,15,26,0.5)",
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 9,
                letterSpacing: "0.2em",
                color: r.accent,
                marginBottom: 8,
              }}
            >
              ON THIS BUILD
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 14.5,
                lineHeight: 1.65,
                color: "rgba(237,239,247,0.82)",
              }}
            >
              {r.buildNote}
            </p>
          </div>
          <div
            style={{
              marginTop: 14,
              border: "1px solid rgba(255,194,75,0.35)",
              borderRadius: 8,
              padding: "18px 20px",
              background: "rgba(255,194,75,0.04)",
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 9,
                letterSpacing: "0.24em",
                color: "#FFC24B",
                marginBottom: 10,
              }}
            >
              FLIGHT RULE 00 — AN HONEST LIMIT
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: 19,
                lineHeight: 1.5,
                color: "rgba(237,239,247,0.92)",
              }}
            >
              {FLIGHT_RULE_00}
            </p>
          </div>
        </Section>

        {/* 04 — THE REAL APP */}
        <Section>
          <SectionLabel num="04" text="THE REAL APP — STAGED CAPTURES" r={r} />
          <p
            style={{
              margin: "0 0 26px",
              fontSize: 14.5,
              lineHeight: 1.65,
              color: DIM,
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4ADE80",
                flexShrink: 0,
              }}
            />
            Real, unretouched captures from the live app — being transmitted now.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
            {r.captures.map((slot, i) => (
              <Capture key={slot.file} slot={slot} index={i} r={r} />
            ))}
          </div>
        </Section>

        {/* 05 — RECEIPTS */}
        <Section>
          <SectionLabel num="05" text="RECEIPTS — ALL TELEMETRY REAL" r={r} />
          {r.receiptsNote ? (
            <p style={{ margin: "0 0 18px", fontSize: 14.5, lineHeight: 1.65, color: DIM }}>
              {r.receiptsNote}
            </p>
          ) : null}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 12,
            }}
          >
            {r.receipts.map((rc) => (
              <div
                key={rc.label}
                style={{
                  border: `1px solid rgba(${r.accentRgb}, 0.25)`,
                  borderRadius: 8,
                  padding: "16px 18px",
                  background: "rgba(11,15,26,0.5)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#EDEFF7",
                  }}
                >
                  {rc.value}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 8.5,
                    letterSpacing: "0.12em",
                    color: DIMMER,
                    marginTop: 7,
                    textTransform: "uppercase",
                    lineHeight: 1.7,
                  }}
                >
                  {rc.label}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <section style={{ marginTop: 84, borderTop: HAIRLINE, paddingTop: 40 }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.28em",
              color: "#4ADE80",
              marginBottom: 20,
            }}
          >
            ● COMMS OPEN
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <a
              href="mailto:tobiasnorman1@gmail.com"
              style={{
                textDecoration: "none",
                background: "#EDEFF7",
                color: "#05070D",
                fontSize: 14,
                fontWeight: 700,
                padding: "14px 26px",
                borderRadius: 4,
                boxShadow: `0 0 34px -8px ${r.accent}`,
              }}
            >
              Launch — email me
            </a>
            <a
              href="https://www.linkedin.com/in/tobias-norman-66908115a"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                border: "1px solid rgba(237,239,247,0.28)",
                color: "#EDEFF7",
                fontSize: 14,
                fontWeight: 600,
                padding: "13px 24px",
                borderRadius: 4,
              }}
            >
              LinkedIn ↗
            </a>
            <BackToMissionControl
              slug={r.slug}
              accent={r.accent}
              accentRgb={r.accentRgb}
              variant="cta"
            />
          </div>
        </section>
        </article>
      </div>
    </main>
  );
}
