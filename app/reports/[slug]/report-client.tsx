"use client";

import { useRouter } from "next/navigation";

/**
 * Warp-return back button. Stores the report slug in sessionStorage under
 * `mc_return` — the Mission Control engine consumes it on mount to play the
 * reverse-descent warp effect and land the camera on the right planet.
 * The SLUG value must match engine.ts's reportSlugs exactly.
 */
export function BackToMissionControl({
  slug,
  accent,
  accentRgb,
  variant = "cta",
}: {
  slug: string;
  accent: string;
  /** Accent as "r, g, b" — used for the cta variant's border. */
  accentRgb: string;
  /** "bar" = quiet top-bar link; "cta" = bordered button for the CTA row. */
  variant?: "bar" | "cta";
}) {
  const router = useRouter();

  const back = () => {
    try {
      sessionStorage.setItem("mc_return", slug);
    } catch {
      /* ignore — the warp effect is a nice-to-have */
    }
    router.push("/");
  };

  if (variant === "bar") {
    return (
      <button
        onClick={back}
        style={{
          cursor: "pointer",
          background: "none",
          border: "none",
          padding: 0,
          fontFamily: "'Martian Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "rgba(237,239,247,0.6)",
        }}
      >
        ◂ MISSION CONTROL
      </button>
    );
  }

  return (
    <button
      onClick={back}
      style={{
        cursor: "pointer",
        background: "none",
        border: `1px solid rgba(${accentRgb}, 0.4)`,
        color: accent,
        fontFamily: "'Martian Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.16em",
        fontWeight: 600,
        padding: "15px 20px",
        borderRadius: 4,
        boxShadow: `0 0 34px -12px ${accent}`,
      }}
    >
      ◂ BACK TO MISSION CONTROL
    </button>
  );
}
