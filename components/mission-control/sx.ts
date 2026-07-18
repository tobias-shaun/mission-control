import type { CSSProperties } from "react";

/**
 * Parse an inline CSS declaration string into a React style object.
 *
 * The Mission Control design was authored as an HTML template with hundreds of
 * verbatim `style="..."` strings. Rather than hand-convert every one to a JS
 * object (and risk drift), we keep the original strings and parse them at
 * runtime. All values are kept as strings so React never auto-appends `px` and
 * the output matches the source byte-for-byte.
 */

const cache = new Map<string, CSSProperties>();

function toCamel(prop: string): string {
  const p = prop.trim();
  if (!p) return p;
  // Vendor prefixes: -webkit- -> Webkit, -moz- -> Moz, -ms- -> ms, -o- -> O
  if (p.startsWith("--")) return p; // CSS custom property — keep as-is
  let name = p;
  let prefix = "";
  if (name[0] === "-") {
    // strip leading dash; the segment after it becomes the (capitalised) prefix,
    // except -ms- which React expects lowercase.
    const seg = name.slice(1);
    const dash = seg.indexOf("-");
    const vendor = dash === -1 ? seg : seg.slice(0, dash);
    const rest = dash === -1 ? "" : seg.slice(dash);
    if (vendor === "ms") prefix = "ms";
    else prefix = vendor.charAt(0).toUpperCase() + vendor.slice(1);
    name = rest; // still starts with a dash (or empty)
  }
  const camel = name.replace(/-([a-z])/g, (_m, c: string) => c.toUpperCase());
  return prefix + camel;
}

export function sx(css: string): CSSProperties {
  if (!css) return {};
  const hit = cache.get(css);
  if (hit) return hit;

  const out: Record<string, string> = {};
  // Split declarations on ';'. Inline styles in this design contain no
  // semicolons inside values (gradients/transitions use commas), so a plain
  // split is safe.
  for (const decl of css.split(";")) {
    const d = decl.trim();
    if (!d) continue;
    const i = d.indexOf(":");
    if (i === -1) continue;
    const prop = d.slice(0, i);
    const value = d.slice(i + 1).trim();
    if (!prop.trim()) continue;
    out[toCamel(prop)] = value;
  }

  const frozen = out as CSSProperties;
  cache.set(css, frozen);
  return frozen;
}
