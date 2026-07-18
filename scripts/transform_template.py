#!/usr/bin/env python3
"""
Transform the Mission Control `.dc.html` <x-dc> template into a JSX render
function. The design's binding DSL maps cleanly onto React:

  {{ expr }}                      -> {expr}            (text / attributes)
  style="...{{x}}..."            -> style={sx(`...${x}...`)}
  onClick="{{ h }}"             -> onClick={h}
  ref="{{ r }}"                 -> ref={r}
  <sc-for list="{{X}}" as="y">  -> {(X).map((y, _i) => (<Fragment key={_i}> ... </Fragment>))}
  <sc-if value="{{C}}">         -> {(C) ? (<> ... </>) : null}
  style-hover / style-active    -> className={pseudoClass(`hover`, `active`)}

Top-level binding roots (everything not introduced by an `as=`) are prefixed
with `vals.`; loop variables stay bare. SVG kebab attributes are camel-cased.
"""
import html
import json
import re
import sys

SRC = "design-source/Mission Control.dc.html"
OUT = "components/mission-control/template.tsx"

# ---------------------------------------------------------------------------
# CONTACT DETAILS — edit these, then re-run:  python scripts/transform_template.py
# Leave linkedin/github empty ("") to keep the placeholder (#) links.
# ---------------------------------------------------------------------------
CONTACT = {
    "email": "tobiasnorman1@gmail.com",
    "linkedin": "https://www.linkedin.com/in/tobias-norman-66908115a",
    "github": "https://github.com/tobias-shaun",
}

# --- isolate the template: between <x-dc> and </x-dc>, minus <helmet>…</helmet> ---
raw = open(SRC, encoding="utf-8").read()
x0 = raw.index("<x-dc>") + len("<x-dc>")
x1 = raw.index("</x-dc>")
tpl = raw[x0:x1]
h0 = tpl.index("<helmet>")
h1 = tpl.index("</helmet>") + len("</helmet>")
tpl = tpl[:h0] + tpl[h1:]

# Repoint the static fallback hrefs on the "FULL MISSION REPORT" links to the
# Next.js report routes (the engine's onClick handles the animated dive; these
# are the no-JS / reduced-motion fallbacks).
for old, new in {
    "Mission Report - hatched.dc.html": "/reports/hatched",
    "Mission Report - Job Command Center.dc.html": "/reports/job-command-center",
    "Mission Report - Life Hub.dc.html": "/reports/life-hub",
    "Mission Report - Property Platform.dc.html": "/reports/property-platform",
}.items():
    tpl = tpl.replace(old, new)

# Wire in real contact links (see CONTACT above).
if CONTACT["email"]:
    tpl = tpl.replace("mailto:hello@example.com", "mailto:" + CONTACT["email"])


def _set_social(markup, link_text, url):
    """Point a placeholder social anchor (href="#") at a real URL, matched by
    its visible text, and mark it as an external link."""
    if not url:
        return markup
    pat = re.compile(
        r'(<a\s+href=)"#"((?:(?!</a>).)*?' + re.escape(link_text) + r"\s*</a>)",
        re.S,
    )
    return pat.sub(
        lambda m: m.group(1)
        + '"' + url + '" target="_blank" rel="noopener noreferrer"'
        + m.group(2),
        markup,
    )


for _txt in ("LinkedIn ↗", "LINKEDIN"):
    tpl = _set_social(tpl, _txt, CONTACT["linkedin"])
for _txt in ("GitHub ↗", "GITHUB"):
    tpl = _set_social(tpl, _txt, CONTACT["github"])

# --- attribute name conversions ---
ATTR_MAP = {
    "class": "className",
    "for": "htmlFor",
    "tabindex": "tabIndex",
    "stop-color": "stopColor",
    "stop-opacity": "stopOpacity",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-dasharray": "strokeDasharray",
    "stroke-opacity": "strokeOpacity",
    "stroke-miterlimit": "strokeMiterlimit",
    "fill-opacity": "fillOpacity",
    "fill-rule": "fillRule",
    "clip-rule": "clipRule",
    "clip-path": "clipPath",
    "text-anchor": "textAnchor",
    "gradient-units": "gradientUnits",
    "gradient-transform": "gradientTransform",
    "xlink:href": "xlinkHref",
    "crossorigin": "crossOrigin",
    "charset": "charSet",
}

IDENT = re.compile(r"[A-Za-z_$][\w$]*")
KEYWORDS = {"true", "false", "null", "undefined", "this", "new", "typeof", "void"}


def prefix_expr(expr: str, loopvars) -> str:
    """Prefix the leading identifier of a binding expression with `vals.`
    unless it is a loop variable, keyword, or numeric literal."""
    e = expr.strip()
    m = IDENT.match(e)
    if not m:
        return e  # numeric / string / other literal
    root = m.group(0)
    if root in loopvars or root in KEYWORDS or e[0].isdigit():
        return e
    return "vals." + e


SPLIT_BINDING = re.compile(r"\{\{(.*?)\}\}", re.S)


def to_template_literal(value: str, loopvars) -> str:
    """Return a JS backtick template-literal body for a string that may contain
    {{ }} bindings (used for style + mixed attribute values)."""
    out = []
    pos = 0
    for m in SPLIT_BINDING.finditer(value):
        out.append(escape_backtick(value[pos:m.start()]))
        out.append("${" + prefix_expr(m.group(1), loopvars) + "}")
        pos = m.end()
    out.append(escape_backtick(value[pos:]))
    return "".join(out)


def escape_backtick(s: str) -> str:
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("$", "\\$")


def is_single_binding(value: str):
    m = re.fullmatch(r"\s*\{\{(.*?)\}\}\s*", value, re.S)
    return m.group(1) if m else None


def emit_text(text: str, loopvars) -> str:
    out = []
    pos = 0
    for m in SPLIT_BINDING.finditer(text):
        out.append(escape_jsx_text(text[pos:m.start()]))
        out.append("{" + prefix_expr(m.group(1), loopvars) + "}")
        pos = m.end()
    out.append(escape_jsx_text(text[pos:]))
    return "".join(out)


def escape_jsx_text(s: str) -> str:
    if not s:
        return s
    u = html.unescape(s)
    # Any segment containing JSX-special characters is emitted as a JS string
    # expression — bulletproof and single-pass (avoids chained-replace corruption).
    if any(ch in u for ch in "<>{}"):
        return "{" + json.dumps(u, ensure_ascii=False) + "}"
    return u


# --- tokenizer -------------------------------------------------------------
def tokenize(s):
    i, n = 0, len(s)
    while i < n:
        lt = s.find("<", i)
        if lt == -1:
            yield ("text", s[i:])
            return
        if lt > i:
            yield ("text", s[i:lt])
        if s.startswith("<!--", lt):
            end = s.find("-->", lt)
            end = n if end == -1 else end + 3
            yield ("comment", s[lt:end])
            i = end
            continue
        # scan a tag, honoring quoted attribute values
        j = lt + 1
        q = None
        while j < n:
            c = s[j]
            if q:
                if c == q:
                    q = None
            elif c in "\"'":
                q = c
            elif c == ">":
                break
            j += 1
        tag = s[lt:j + 1]
        yield ("tag", tag)
        i = j + 1


ATTR_RE = re.compile(r'([A-Za-z_:][\w:.-]*)(?:\s*=\s*"([^"]*)")?')


def parse_tag(tag):
    inner = tag[1:-1].strip()
    self_close = inner.endswith("/")
    if self_close:
        inner = inner[:-1].strip()
    if inner.startswith("/"):
        return ("close", inner[1:].strip(), [], False)
    m = re.match(r"[A-Za-z][\w-]*", inner)
    name = m.group(0)
    rest = inner[m.end():]
    attrs = []
    for am in ATTR_RE.finditer(rest):
        an = am.group(1)
        av = am.group(2)  # None if valueless
        attrs.append((an, av))
    return ("open", name, attrs, self_close)


VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr"}


def convert_attr_name(name):
    if name in ATTR_MAP:
        return ATTR_MAP[name]
    if name.startswith("data-") or name.startswith("aria-"):
        return name
    if name.startswith("on") and name[2:3].isupper():
        return name  # already onClick etc.
    if "-" in name:
        head, *tail = name.split("-")
        return head + "".join(t[:1].upper() + t[1:] for t in tail)
    return name


def emit_open(name, attrs, self_close, loopvars):
    pieces = ["<" + name]
    hover = active = None
    for an, av in attrs:
        if an in ("hint-placeholder-count", "hint-placeholder-val"):
            continue
        if an == "style-hover":
            hover = av
            continue
        if an == "style-active":
            active = av
            continue
        if av is None:
            pieces.append(an)
            continue
        if an == "style":
            pieces.append("style={sx(`" + to_template_literal(av, loopvars) + "`)}")
            continue
        jsx_name = convert_attr_name(an)
        single = is_single_binding(av)
        if single is not None:
            pieces.append(f"{jsx_name}={{{prefix_expr(single, loopvars)}}}")
        elif "{{" in av:
            pieces.append(jsx_name + "={`" + to_template_literal(av, loopvars) + "`}")
        else:
            # static value
            pieces.append(f'{jsx_name}="{av}"')
    if hover is not None or active is not None:
        if hover is not None and active is not None:
            cls = f"pseudoClass(`{to_template_literal(hover, loopvars)}`, `{to_template_literal(active, loopvars)}`)"
        elif hover is not None:
            cls = f"pseudoClass(`{to_template_literal(hover, loopvars)}`)"
        else:
            cls = f"pseudoClass('', `{to_template_literal(active, loopvars)}`)"
        pieces.append("className={" + cls + "}")
    end = " />" if (self_close or name in VOID) else ">"
    return " ".join(pieces) + end


# --- streaming transform ---------------------------------------------------
def transform(tpl):
    out = []
    # stack entries: ("for", varname) | ("if",) | ("el", tagname)
    stack = []
    loopvars = []  # active loop variable names
    for_counter = [0]

    def active_loopvars():
        return set(loopvars)

    for kind, val in tokenize(tpl):
        if kind == "comment":
            continue
        if kind == "text":
            out.append(emit_text(val, active_loopvars()))
            continue
        # tag
        typ, name, attrs, self_close = parse_tag(val)
        if typ == "open":
            if name == "sc-for":
                d = dict(attrs)
                listexpr = is_single_binding(d.get("list", "")) or d.get("list", "")
                asvar = d.get("as", "item")
                idx = f"_mci{for_counter[0]}"
                for_counter[0] += 1
                out.append(
                    "{(" + prefix_expr(listexpr, active_loopvars())
                    + f").map(({asvar}: any, {idx}: number) => (<Fragment key={{{idx}}}>"
                )
                loopvars.append(asvar)
                stack.append(("for", asvar))
                continue
            if name == "sc-if":
                d = dict(attrs)
                cond = is_single_binding(d.get("value", "")) or d.get("value", "")
                out.append("{(" + prefix_expr(cond, active_loopvars()) + ") ? (<>")
                stack.append(("if",))
                continue
            out.append(emit_open(name, attrs, self_close, active_loopvars()))
            if not self_close and name not in VOID:
                stack.append(("el", name))
            continue
        # close tag
        if not stack:
            continue
        top = stack[-1]
        if name == "sc-for":
            stack.pop()
            if top[0] == "for":
                loopvars.pop()
            out.append("</Fragment>))}")
        elif name == "sc-if":
            stack.pop()
            out.append("</>) : null}")
        else:
            # normal element close; pop matching el marker if present
            if top[0] == "el":
                stack.pop()
            out.append(f"</{name}>")
    return "".join(out)


body = transform(tpl)

header = '''import { Fragment } from "react";
import { sx } from "./sx";
import { pseudoClass } from "./pseudo";

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Auto-generated from `Mission Control.dc.html` by scripts/transform_template.py.
 * Renders the design's <x-dc> template as JSX against the `vals` object produced
 * by the engine's renderVals(). Do not edit by hand — re-run the transform.
 */
export function Template(vals: any) {
  return (
    <>
'''

footer = '''
    </>
  );
}
'''

open(OUT, "w", encoding="utf-8", newline="\n").write(header + body + footer)
print("wrote", OUT, "-", len(body), "chars of body")

# --- report binding roots that became vals.* to sanity check coverage ---
roots = sorted(set(re.findall(r"vals\.([A-Za-z_$][\w$]*)", body)))
print(f"{len(roots)} distinct vals.* roots referenced")
