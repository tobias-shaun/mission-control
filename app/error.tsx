"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
      <div style={{ maxWidth: 520, textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Martian Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.24em",
            color: "#FFC24B",
            marginBottom: 18,
          }}
        >
          SYSTEMS FAULT · RECOVERABLE
        </div>
        <h1
          style={{
            margin: "0 0 14px",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(34px, 6vw, 60px)",
            lineHeight: 1,
          }}
        >
          Hit some debris.
        </h1>
        <p
          style={{
            margin: "0 auto 30px",
            maxWidth: "40ch",
            fontSize: 16,
            lineHeight: 1.65,
            color: "rgba(237,239,247,0.7)",
          }}
        >
          Something went wrong rendering this screen. A retry usually clears
          it — or head back to Mission Control.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={reset}
            style={{
              background: "#EDEFF7",
              color: "#05070D",
              border: "none",
              fontFamily: "'Martian Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.16em",
              fontWeight: 700,
              padding: "13px 22px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            RETRY
          </button>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "none",
              color: "#EDEFF7",
              border: "1px solid rgba(237,239,247,0.35)",
              fontFamily: "'Martian Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.16em",
              fontWeight: 700,
              padding: "12px 22px",
              borderRadius: 4,
              textDecoration: "none",
            }}
          >
            ◂ BACK TO MISSION CONTROL
          </Link>
        </div>
      </div>
    </main>
  );
}
