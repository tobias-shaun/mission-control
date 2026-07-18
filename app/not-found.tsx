import Link from "next/link";

export default function NotFound() {
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
          SIGNAL LOST · 404
        </div>
        <h1
          style={{
            margin: "0 0 14px",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(34px, 6vw, 60px)",
            lineHeight: 1,
          }}
        >
          Off the flight plan.
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
          Nothing is charted at this address. Head back to Mission Control —
          all four shipped products are live there.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "#EDEFF7",
            color: "#05070D",
            fontFamily: "'Martian Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
            fontWeight: 700,
            padding: "13px 22px",
            borderRadius: 4,
            textDecoration: "none",
          }}
        >
          ◂ BACK TO MISSION CONTROL
        </Link>
      </div>
    </main>
  );
}
