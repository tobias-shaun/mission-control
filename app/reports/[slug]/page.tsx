"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";

const REPORTS: Record<
  string,
  { num: string; name: string; accent: string; status: string }
> = {
  hatched: { num: "01", name: "hatched", accent: "#FF9EB8", status: "PRE-LAUNCH" },
  "job-command-center": {
    num: "02",
    name: "Job Command Center",
    accent: "#93A2FF",
    status: "IN DAILY USE",
  },
  "life-hub": { num: "03", name: "Life Hub", accent: "#FF9E6E", status: "IN DAILY USE" },
  "property-platform": {
    num: "04",
    name: "Property platform",
    accent: "#6EC8FF",
    status: "CLIENT DELIVERY",
  },
};

export default function ReportPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params?.slug ?? "";
  const r = REPORTS[slug];
  if (params && !r) notFound();
  if (!r) return null; // params not resolved yet

  const back = () => {
    // Signal Mission Control to play the warp-return effect, matching the
    // sessionStorage handshake the engine already listens for.
    try {
      sessionStorage.setItem("mc_return", slug);
    } catch {
      /* ignore */
    }
    router.push("/");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#05070D",
        color: "#EDEFF7",
        fontFamily: "'Archivo', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 560, textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Martian Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.24em",
            color: r.accent,
            marginBottom: 18,
          }}
        >
          MISSION REPORT {r.num} · {r.status}
        </div>
        <h1
          style={{
            margin: "0 0 14px",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(34px, 6vw, 64px)",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          {r.name}
        </h1>
        <p
          style={{
            margin: "0 auto 30px",
            maxWidth: "44ch",
            fontSize: 16,
            lineHeight: 1.65,
            color: "rgba(237,239,247,0.7)",
          }}
        >
          Detailed mission report coming online. This deep-dive is a separate
          deliverable — for now, head back to Mission Control to explore all four
          shipped products.
        </p>
        <button
          onClick={back}
          style={{
            cursor: "pointer",
            background: "#EDEFF7",
            color: "#05070D",
            border: "none",
            fontFamily: "'Martian Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
            fontWeight: 700,
            padding: "13px 22px",
            borderRadius: 4,
            boxShadow: `0 0 34px -8px ${r.accent}`,
          }}
        >
          ◂ BACK TO MISSION CONTROL
        </button>
        <div style={{ marginTop: 18 }}>
          <Link
            href="/"
            style={{
              fontFamily: "'Martian Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.14em",
              color: "rgba(237,239,247,0.45)",
            }}
          >
            or return without the warp jump
          </Link>
        </div>
      </div>
    </main>
  );
}
