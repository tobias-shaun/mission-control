"use client";

import dynamic from "next/dynamic";

// The Mission Control experience is a self-contained canvas/scroll engine that
// depends on window/document throughout, so it renders client-only. A matching
// dark placeholder avoids any flash before the boot sequence takes over.
const MissionControl = dynamic(
  () => import("@/components/mission-control/MissionControl"),
  {
    ssr: false,
    loading: () => (
      <div style={{ minHeight: "100vh", background: "#05070D" }} />
    ),
  }
);

export default function Page() {
  return <MissionControl />;
}
