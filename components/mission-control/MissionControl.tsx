"use client";

import { useEffect, useReducer, useRef } from "react";
import { MissionControlEngine } from "./engine";
import { Template } from "./template";

/**
 * Client wrapper around the ported design engine.
 *
 * The engine keeps its own mutable `state` (as the original DCLogic class did)
 * and calls back into React via the `schedule` function whenever it setState's,
 * which forces a re-render. On each render we recompute the flat `vals` bag from
 * `engine.renderVals()` and hand it to the generated JSX template — exactly the
 * `{ ...props, ...renderVals() }` contract the design runtime used.
 *
 * The engine's imperative lifecycle (canvas loop, observers, listeners) runs
 * from a single mount effect; its generation guard makes StrictMode's
 * double-mount safe.
 */

const PROPS = { bootSequence: true, glowStrength: 1 };

export default function MissionControl() {
  const [, force] = useReducer((n: number) => n + 1, 0);
  const engineRef = useRef<MissionControlEngine | null>(null);

  if (engineRef.current === null) {
    engineRef.current = new MissionControlEngine(PROPS, () => force());
  }
  const engine = engineRef.current;

  useEffect(() => {
    engine.componentDidMount();
    return () => engine.componentWillUnmount();
    // engine is a stable ref; mount/unmount once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const vals = { ...PROPS, ...engine.renderVals() };
  return Template(vals);
}
