/**
 * Pseudo-class stylesheet — a faithful port of support.js's `createPseudoSheet`.
 *
 * The design template attaches `style-hover="..."` / `style-active="..."` to
 * elements. The runtime turns each into a generated class whose `:hover` /
 * `:active` rule carries that CSS, then returns the class name. We reproduce the
 * exact behaviour here: results are cached by (pseudo|css) so repeated renders
 * reuse the same class and never leak rules.
 *
 * Client-only (touches document); the Mission Control tree renders with
 * `ssr: false`, so `document` is always present when this runs.
 */

const cache = new Map<string, string>();
let styleEl: HTMLStyleElement | null = null;
let counter = 0;

export function pseudo(pseudoName: string, css: string): string {
  const key = pseudoName + "|" + css;
  const hit = cache.get(key);
  if (hit) return hit;

  if (typeof document === "undefined") {
    // SSR fallback (shouldn't happen with ssr:false) — deterministic, no insert.
    const cls = "scp" + counter.toString(36);
    counter++;
    cache.set(key, cls);
    return cls;
  }

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.setAttribute("data-mc-pseudo", "");
    document.head.appendChild(styleEl);
  }

  const cls = "scp" + counter.toString(36);
  counter++;
  const sel =
    pseudoName === "before" || pseudoName === "after"
      ? "." + cls + "::" + pseudoName
      : "." + cls + ":" + pseudoName;
  try {
    styleEl.sheet!.insertRule(sel + "{" + css + "}", styleEl.sheet!.cssRules.length);
  } catch {
    /* ignore malformed rules */
  }
  cache.set(key, cls);
  return cls;
}

/**
 * Convenience: merge any of hover/active pseudo styles into a single className.
 * Pass empty string for a pseudo that isn't used.
 */
export function pseudoClass(hover?: string, active?: string): string {
  const parts: string[] = [];
  if (hover) parts.push(pseudo("hover", hover));
  if (active) parts.push(pseudo("active", active));
  return parts.join(" ");
}
