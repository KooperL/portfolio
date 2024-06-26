import {
  s as de,
  A as te,
  i as ce,
  d as H,
  w as oe,
  M as ne,
  m as K,
  y as ie,
  B as he,
  e as ve,
  c as xe,
  a as we,
  G as ae,
  N as ke,
  u as j,
  D as Ce,
  E as ze,
  F as _e,
  I as Se,
  v as Me,
  z as E,
  O as Ae,
} from "./scheduler.gY_bz6RS.js"
import { S as Ge, i as Ie, t as ue, b as ge } from "./index.1Dz5KRer.js"
function Re(e, r) {
  const t = {},
    n = {},
    i = { $$scope: 1 }
  let o = e.length
  for (; o--; ) {
    const a = e[o],
      s = r[o]
    if (s) {
      for (const c in a) c in s || (n[c] = 1)
      for (const c in s) i[c] || ((t[c] = s[c]), (i[c] = 1))
      e[o] = s
    } else for (const c in a) i[c] = 1
  }
  for (const a in n) a in t || (t[a] = void 0)
  return t
}
function br(e) {
  return typeof e == "object" && e !== null ? e : {}
}
const Y = "-"
function Pe(e) {
  const r = Ee(e),
    { conflictingClassGroups: t, conflictingClassGroupModifiers: n } = e
  function i(a) {
    const s = a.split(Y)
    return s[0] === "" && s.length !== 1 && s.shift(), be(s, r) || je(a)
  }
  function o(a, s) {
    const c = t[a] || []
    return s && n[a] ? [...c, ...n[a]] : c
  }
  return { getClassGroupId: i, getConflictingClassGroupIds: o }
}
function be(e, r) {
  var a
  if (e.length === 0) return r.classGroupId
  const t = e[0],
    n = r.nextPart.get(t),
    i = n ? be(e.slice(1), n) : void 0
  if (i) return i
  if (r.validators.length === 0) return
  const o = e.join(Y)
  return (a = r.validators.find(({ validator: s }) => s(o))) == null
    ? void 0
    : a.classGroupId
}
const se = /^\[(.+)\]$/
function je(e) {
  if (se.test(e)) {
    const r = se.exec(e)[1],
      t = r == null ? void 0 : r.substring(0, r.indexOf(":"))
    if (t) return "arbitrary.." + t
  }
}
function Ee(e) {
  const { theme: r, prefix: t } = e,
    n = { nextPart: new Map(), validators: [] }
  return (
    Le(Object.entries(e.classGroups), t).forEach(([o, a]) => {
      Q(a, n, o, r)
    }),
    n
  )
}
function Q(e, r, t, n) {
  e.forEach(i => {
    if (typeof i == "string") {
      const o = i === "" ? r : le(r, i)
      o.classGroupId = t
      return
    }
    if (typeof i == "function") {
      if (Te(i)) {
        Q(i(n), r, t, n)
        return
      }
      r.validators.push({ validator: i, classGroupId: t })
      return
    }
    Object.entries(i).forEach(([o, a]) => {
      Q(a, le(r, o), t, n)
    })
  })
}
function le(e, r) {
  let t = e
  return (
    r.split(Y).forEach(n => {
      t.nextPart.has(n) ||
        t.nextPart.set(n, { nextPart: new Map(), validators: [] }),
        (t = t.nextPart.get(n))
    }),
    t
  )
}
function Te(e) {
  return e.isThemeGetter
}
function Le(e, r) {
  return r
    ? e.map(([t, n]) => {
        const i = n.map(o =>
          typeof o == "string"
            ? r + o
            : typeof o == "object"
              ? Object.fromEntries(
                  Object.entries(o).map(([a, s]) => [r + a, s]),
                )
              : o,
        )
        return [t, i]
      })
    : e
}
function Ne(e) {
  if (e < 1) return { get: () => {}, set: () => {} }
  let r = 0,
    t = new Map(),
    n = new Map()
  function i(o, a) {
    t.set(o, a), r++, r > e && ((r = 0), (n = t), (t = new Map()))
  }
  return {
    get(o) {
      let a = t.get(o)
      if (a !== void 0) return a
      if ((a = n.get(o)) !== void 0) return i(o, a), a
    },
    set(o, a) {
      t.has(o) ? t.set(o, a) : i(o, a)
    },
  }
}
const pe = "!"
function We(e) {
  const r = e.separator,
    t = r.length === 1,
    n = r[0],
    i = r.length
  return function (a) {
    const s = []
    let c = 0,
      g = 0,
      l
    for (let m = 0; m < a.length; m++) {
      let y = a[m]
      if (c === 0) {
        if (y === n && (t || a.slice(m, m + i) === r)) {
          s.push(a.slice(g, m)), (g = m + i)
          continue
        }
        if (y === "/") {
          l = m
          continue
        }
      }
      y === "[" ? c++ : y === "]" && c--
    }
    const b = s.length === 0 ? a : a.substring(g),
      h = b.startsWith(pe),
      v = h ? b.substring(1) : b,
      k = l && l > g ? l - g : void 0
    return {
      modifiers: s,
      hasImportantModifier: h,
      baseClassName: v,
      maybePostfixModifierPosition: k,
    }
  }
}
function Ue(e) {
  if (e.length <= 1) return e
  const r = []
  let t = []
  return (
    e.forEach(n => {
      n[0] === "[" ? (r.push(...t.sort(), n), (t = [])) : t.push(n)
    }),
    r.push(...t.sort()),
    r
  )
}
function Oe(e) {
  return { cache: Ne(e.cacheSize), splitModifiers: We(e), ...Pe(e) }
}
const Ve = /\s+/
function Be(e, r) {
  const {
      splitModifiers: t,
      getClassGroupId: n,
      getConflictingClassGroupIds: i,
    } = r,
    o = new Set()
  return e
    .trim()
    .split(Ve)
    .map(a => {
      const {
        modifiers: s,
        hasImportantModifier: c,
        baseClassName: g,
        maybePostfixModifierPosition: l,
      } = t(a)
      let b = n(l ? g.substring(0, l) : g),
        h = !!l
      if (!b) {
        if (!l) return { isTailwindClass: !1, originalClassName: a }
        if (((b = n(g)), !b))
          return { isTailwindClass: !1, originalClassName: a }
        h = !1
      }
      const v = Ue(s).join(":")
      return {
        isTailwindClass: !0,
        modifierId: c ? v + pe : v,
        classGroupId: b,
        originalClassName: a,
        hasPostfixModifier: h,
      }
    })
    .reverse()
    .filter(a => {
      if (!a.isTailwindClass) return !0
      const { modifierId: s, classGroupId: c, hasPostfixModifier: g } = a,
        l = s + c
      return o.has(l) ? !1 : (o.add(l), i(c, g).forEach(b => o.add(s + b)), !0)
    })
    .reverse()
    .map(a => a.originalClassName)
    .join(" ")
}
function Fe() {
  let e = 0,
    r,
    t,
    n = ""
  for (; e < arguments.length; )
    (r = arguments[e++]) && (t = fe(r)) && (n && (n += " "), (n += t))
  return n
}
function fe(e) {
  if (typeof e == "string") return e
  let r,
    t = ""
  for (let n = 0; n < e.length; n++)
    e[n] && (r = fe(e[n])) && (t && (t += " "), (t += r))
  return t
}
function qe(e, ...r) {
  let t,
    n,
    i,
    o = a
  function a(c) {
    const g = r.reduce((l, b) => b(l), e())
    return (t = Oe(g)), (n = t.cache.get), (i = t.cache.set), (o = s), s(c)
  }
  function s(c) {
    const g = n(c)
    if (g) return g
    const l = Be(c, t)
    return i(c, l), l
  }
  return function () {
    return o(Fe.apply(null, arguments))
  }
}
function p(e) {
  const r = t => t[e] || []
  return (r.isThemeGetter = !0), r
}
const me = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  Je = /^\d+\/\d+$/,
  Xe = new Set(["px", "full", "screen"]),
  Ze = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  He =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Ke = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Qe =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/
function C(e) {
  return S(e) || Xe.has(e) || Je.test(e)
}
function z(e) {
  return A(e, "length", nr)
}
function S(e) {
  return !!e && !Number.isNaN(Number(e))
}
function J(e) {
  return A(e, "number", S)
}
function T(e) {
  return !!e && Number.isInteger(Number(e))
}
function Ye(e) {
  return e.endsWith("%") && S(e.slice(0, -1))
}
function d(e) {
  return me.test(e)
}
function _(e) {
  return Ze.test(e)
}
const De = new Set(["length", "size", "percentage"])
function $e(e) {
  return A(e, De, ye)
}
function er(e) {
  return A(e, "position", ye)
}
const rr = new Set(["image", "url"])
function tr(e) {
  return A(e, rr, ar)
}
function or(e) {
  return A(e, "", ir)
}
function L() {
  return !0
}
function A(e, r, t) {
  const n = me.exec(e)
  return n
    ? n[1]
      ? typeof r == "string"
        ? n[1] === r
        : r.has(n[1])
      : t(n[2])
    : !1
}
function nr(e) {
  return He.test(e)
}
function ye() {
  return !1
}
function ir(e) {
  return Ke.test(e)
}
function ar(e) {
  return Qe.test(e)
}
function sr() {
  const e = p("colors"),
    r = p("spacing"),
    t = p("blur"),
    n = p("brightness"),
    i = p("borderColor"),
    o = p("borderRadius"),
    a = p("borderSpacing"),
    s = p("borderWidth"),
    c = p("contrast"),
    g = p("grayscale"),
    l = p("hueRotate"),
    b = p("invert"),
    h = p("gap"),
    v = p("gradientColorStops"),
    k = p("gradientColorStopPositions"),
    m = p("inset"),
    y = p("margin"),
    w = p("opacity"),
    x = p("padding"),
    N = p("saturate"),
    M = p("scale"),
    W = p("sepia"),
    U = p("skew"),
    O = p("space"),
    V = p("translate"),
    G = () => ["auto", "contain", "none"],
    I = () => ["auto", "hidden", "clip", "visible", "scroll"],
    u = () => ["auto", d, r],
    f = () => [d, r],
    D = () => ["", C, z],
    B = () => ["auto", S, d],
    $ = () => [
      "bottom",
      "center",
      "left",
      "left-bottom",
      "left-top",
      "right",
      "right-bottom",
      "right-top",
      "top",
    ],
    F = () => ["solid", "dashed", "dotted", "double", "none"],
    ee = () => [
      "normal",
      "multiply",
      "screen",
      "overlay",
      "darken",
      "lighten",
      "color-dodge",
      "color-burn",
      "hard-light",
      "soft-light",
      "difference",
      "exclusion",
      "hue",
      "saturation",
      "color",
      "luminosity",
      "plus-lighter",
    ],
    X = () => [
      "start",
      "end",
      "center",
      "between",
      "around",
      "evenly",
      "stretch",
    ],
    R = () => ["", "0", d],
    re = () => [
      "auto",
      "avoid",
      "all",
      "avoid-page",
      "page",
      "left",
      "right",
      "column",
    ],
    P = () => [S, J],
    q = () => [S, d]
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [L],
      spacing: [C, z],
      blur: ["none", "", _, d],
      brightness: P(),
      borderColor: [e],
      borderRadius: ["none", "", "full", _, d],
      borderSpacing: f(),
      borderWidth: D(),
      contrast: P(),
      grayscale: R(),
      hueRotate: q(),
      invert: R(),
      gap: f(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Ye, z],
      inset: u(),
      margin: u(),
      opacity: P(),
      padding: f(),
      saturate: P(),
      scale: P(),
      sepia: R(),
      skew: q(),
      space: f(),
      translate: f(),
    },
    classGroups: {
      aspect: [{ aspect: ["auto", "square", "video", d] }],
      container: ["container"],
      columns: [{ columns: [_] }],
      "break-after": [{ "break-after": re() }],
      "break-before": [{ "break-before": re() }],
      "break-inside": [
        { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
      ],
      "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
      box: [{ box: ["border", "content"] }],
      display: [
        "block",
        "inline-block",
        "inline",
        "flex",
        "inline-flex",
        "table",
        "inline-table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row-group",
        "table-row",
        "flow-root",
        "grid",
        "inline-grid",
        "contents",
        "list-item",
        "hidden",
      ],
      float: [{ float: ["right", "left", "none", "start", "end"] }],
      clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [
        { object: ["contain", "cover", "fill", "none", "scale-down"] },
      ],
      "object-position": [{ object: [...$(), d] }],
      overflow: [{ overflow: I() }],
      "overflow-x": [{ "overflow-x": I() }],
      "overflow-y": [{ "overflow-y": I() }],
      overscroll: [{ overscroll: G() }],
      "overscroll-x": [{ "overscroll-x": G() }],
      "overscroll-y": [{ "overscroll-y": G() }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{ inset: [m] }],
      "inset-x": [{ "inset-x": [m] }],
      "inset-y": [{ "inset-y": [m] }],
      start: [{ start: [m] }],
      end: [{ end: [m] }],
      top: [{ top: [m] }],
      right: [{ right: [m] }],
      bottom: [{ bottom: [m] }],
      left: [{ left: [m] }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{ z: ["auto", T, d] }],
      basis: [{ basis: u() }],
      "flex-direction": [
        { flex: ["row", "row-reverse", "col", "col-reverse"] },
      ],
      "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
      flex: [{ flex: ["1", "auto", "initial", "none", d] }],
      grow: [{ grow: R() }],
      shrink: [{ shrink: R() }],
      order: [{ order: ["first", "last", "none", T, d] }],
      "grid-cols": [{ "grid-cols": [L] }],
      "col-start-end": [{ col: ["auto", { span: ["full", T, d] }, d] }],
      "col-start": [{ "col-start": B() }],
      "col-end": [{ "col-end": B() }],
      "grid-rows": [{ "grid-rows": [L] }],
      "row-start-end": [{ row: ["auto", { span: [T, d] }, d] }],
      "row-start": [{ "row-start": B() }],
      "row-end": [{ "row-end": B() }],
      "grid-flow": [
        { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
      ],
      "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", d] }],
      "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", d] }],
      gap: [{ gap: [h] }],
      "gap-x": [{ "gap-x": [h] }],
      "gap-y": [{ "gap-y": [h] }],
      "justify-content": [{ justify: ["normal", ...X()] }],
      "justify-items": [
        { "justify-items": ["start", "end", "center", "stretch"] },
      ],
      "justify-self": [
        { "justify-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      "align-content": [{ content: ["normal", ...X(), "baseline"] }],
      "align-items": [
        { items: ["start", "end", "center", "baseline", "stretch"] },
      ],
      "align-self": [
        { self: ["auto", "start", "end", "center", "stretch", "baseline"] },
      ],
      "place-content": [{ "place-content": [...X(), "baseline"] }],
      "place-items": [
        { "place-items": ["start", "end", "center", "baseline", "stretch"] },
      ],
      "place-self": [
        { "place-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      p: [{ p: [x] }],
      px: [{ px: [x] }],
      py: [{ py: [x] }],
      ps: [{ ps: [x] }],
      pe: [{ pe: [x] }],
      pt: [{ pt: [x] }],
      pr: [{ pr: [x] }],
      pb: [{ pb: [x] }],
      pl: [{ pl: [x] }],
      m: [{ m: [y] }],
      mx: [{ mx: [y] }],
      my: [{ my: [y] }],
      ms: [{ ms: [y] }],
      me: [{ me: [y] }],
      mt: [{ mt: [y] }],
      mr: [{ mr: [y] }],
      mb: [{ mb: [y] }],
      ml: [{ ml: [y] }],
      "space-x": [{ "space-x": [O] }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{ "space-y": [O] }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", d, r] }],
      "min-w": [{ "min-w": [d, r, "min", "max", "fit"] }],
      "max-w": [
        {
          "max-w": [
            d,
            r,
            "none",
            "full",
            "min",
            "max",
            "fit",
            "prose",
            { screen: [_] },
            _,
          ],
        },
      ],
      h: [{ h: [d, r, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
      "min-h": [{ "min-h": [d, r, "min", "max", "fit", "svh", "lvh", "dvh"] }],
      "max-h": [{ "max-h": [d, r, "min", "max", "fit", "svh", "lvh", "dvh"] }],
      size: [{ size: [d, r, "auto", "min", "max", "fit"] }],
      "font-size": [{ text: ["base", _, z] }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [
        {
          font: [
            "thin",
            "extralight",
            "light",
            "normal",
            "medium",
            "semibold",
            "bold",
            "extrabold",
            "black",
            J,
          ],
        },
      ],
      "font-family": [{ font: [L] }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      tracking: [
        {
          tracking: [
            "tighter",
            "tight",
            "normal",
            "wide",
            "wider",
            "widest",
            d,
          ],
        },
      ],
      "line-clamp": [{ "line-clamp": ["none", S, J] }],
      leading: [
        {
          leading: [
            "none",
            "tight",
            "snug",
            "normal",
            "relaxed",
            "loose",
            C,
            d,
          ],
        },
      ],
      "list-image": [{ "list-image": ["none", d] }],
      "list-style-type": [{ list: ["none", "disc", "decimal", d] }],
      "list-style-position": [{ list: ["inside", "outside"] }],
      "placeholder-color": [{ placeholder: [e] }],
      "placeholder-opacity": [{ "placeholder-opacity": [w] }],
      "text-alignment": [
        { text: ["left", "center", "right", "justify", "start", "end"] },
      ],
      "text-color": [{ text: [e] }],
      "text-opacity": [{ "text-opacity": [w] }],
      "text-decoration": [
        "underline",
        "overline",
        "line-through",
        "no-underline",
      ],
      "text-decoration-style": [{ decoration: [...F(), "wavy"] }],
      "text-decoration-thickness": [
        { decoration: ["auto", "from-font", C, z] },
      ],
      "underline-offset": [{ "underline-offset": ["auto", C, d] }],
      "text-decoration-color": [{ decoration: [e] }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
      indent: [{ indent: f() }],
      "vertical-align": [
        {
          align: [
            "baseline",
            "top",
            "middle",
            "bottom",
            "text-top",
            "text-bottom",
            "sub",
            "super",
            d,
          ],
        },
      ],
      whitespace: [
        {
          whitespace: [
            "normal",
            "nowrap",
            "pre",
            "pre-line",
            "pre-wrap",
            "break-spaces",
          ],
        },
      ],
      break: [{ break: ["normal", "words", "all", "keep"] }],
      hyphens: [{ hyphens: ["none", "manual", "auto"] }],
      content: [{ content: ["none", d] }],
      "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
      "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
      "bg-opacity": [{ "bg-opacity": [w] }],
      "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
      "bg-position": [{ bg: [...$(), er] }],
      "bg-repeat": [
        { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
      ],
      "bg-size": [{ bg: ["auto", "cover", "contain", $e] }],
      "bg-image": [
        {
          bg: [
            "none",
            { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
            tr,
          ],
        },
      ],
      "bg-color": [{ bg: [e] }],
      "gradient-from-pos": [{ from: [k] }],
      "gradient-via-pos": [{ via: [k] }],
      "gradient-to-pos": [{ to: [k] }],
      "gradient-from": [{ from: [v] }],
      "gradient-via": [{ via: [v] }],
      "gradient-to": [{ to: [v] }],
      rounded: [{ rounded: [o] }],
      "rounded-s": [{ "rounded-s": [o] }],
      "rounded-e": [{ "rounded-e": [o] }],
      "rounded-t": [{ "rounded-t": [o] }],
      "rounded-r": [{ "rounded-r": [o] }],
      "rounded-b": [{ "rounded-b": [o] }],
      "rounded-l": [{ "rounded-l": [o] }],
      "rounded-ss": [{ "rounded-ss": [o] }],
      "rounded-se": [{ "rounded-se": [o] }],
      "rounded-ee": [{ "rounded-ee": [o] }],
      "rounded-es": [{ "rounded-es": [o] }],
      "rounded-tl": [{ "rounded-tl": [o] }],
      "rounded-tr": [{ "rounded-tr": [o] }],
      "rounded-br": [{ "rounded-br": [o] }],
      "rounded-bl": [{ "rounded-bl": [o] }],
      "border-w": [{ border: [s] }],
      "border-w-x": [{ "border-x": [s] }],
      "border-w-y": [{ "border-y": [s] }],
      "border-w-s": [{ "border-s": [s] }],
      "border-w-e": [{ "border-e": [s] }],
      "border-w-t": [{ "border-t": [s] }],
      "border-w-r": [{ "border-r": [s] }],
      "border-w-b": [{ "border-b": [s] }],
      "border-w-l": [{ "border-l": [s] }],
      "border-opacity": [{ "border-opacity": [w] }],
      "border-style": [{ border: [...F(), "hidden"] }],
      "divide-x": [{ "divide-x": [s] }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{ "divide-y": [s] }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{ "divide-opacity": [w] }],
      "divide-style": [{ divide: F() }],
      "border-color": [{ border: [i] }],
      "border-color-x": [{ "border-x": [i] }],
      "border-color-y": [{ "border-y": [i] }],
      "border-color-t": [{ "border-t": [i] }],
      "border-color-r": [{ "border-r": [i] }],
      "border-color-b": [{ "border-b": [i] }],
      "border-color-l": [{ "border-l": [i] }],
      "divide-color": [{ divide: [i] }],
      "outline-style": [{ outline: ["", ...F()] }],
      "outline-offset": [{ "outline-offset": [C, d] }],
      "outline-w": [{ outline: [C, z] }],
      "outline-color": [{ outline: [e] }],
      "ring-w": [{ ring: D() }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{ ring: [e] }],
      "ring-opacity": [{ "ring-opacity": [w] }],
      "ring-offset-w": [{ "ring-offset": [C, z] }],
      "ring-offset-color": [{ "ring-offset": [e] }],
      shadow: [{ shadow: ["", "inner", "none", _, or] }],
      "shadow-color": [{ shadow: [L] }],
      opacity: [{ opacity: [w] }],
      "mix-blend": [{ "mix-blend": ee() }],
      "bg-blend": [{ "bg-blend": ee() }],
      filter: [{ filter: ["", "none"] }],
      blur: [{ blur: [t] }],
      brightness: [{ brightness: [n] }],
      contrast: [{ contrast: [c] }],
      "drop-shadow": [{ "drop-shadow": ["", "none", _, d] }],
      grayscale: [{ grayscale: [g] }],
      "hue-rotate": [{ "hue-rotate": [l] }],
      invert: [{ invert: [b] }],
      saturate: [{ saturate: [N] }],
      sepia: [{ sepia: [W] }],
      "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
      "backdrop-blur": [{ "backdrop-blur": [t] }],
      "backdrop-brightness": [{ "backdrop-brightness": [n] }],
      "backdrop-contrast": [{ "backdrop-contrast": [c] }],
      "backdrop-grayscale": [{ "backdrop-grayscale": [g] }],
      "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [l] }],
      "backdrop-invert": [{ "backdrop-invert": [b] }],
      "backdrop-opacity": [{ "backdrop-opacity": [w] }],
      "backdrop-saturate": [{ "backdrop-saturate": [N] }],
      "backdrop-sepia": [{ "backdrop-sepia": [W] }],
      "border-collapse": [{ border: ["collapse", "separate"] }],
      "border-spacing": [{ "border-spacing": [a] }],
      "border-spacing-x": [{ "border-spacing-x": [a] }],
      "border-spacing-y": [{ "border-spacing-y": [a] }],
      "table-layout": [{ table: ["auto", "fixed"] }],
      caption: [{ caption: ["top", "bottom"] }],
      transition: [
        {
          transition: [
            "none",
            "all",
            "",
            "colors",
            "opacity",
            "shadow",
            "transform",
            d,
          ],
        },
      ],
      duration: [{ duration: q() }],
      ease: [{ ease: ["linear", "in", "out", "in-out", d] }],
      delay: [{ delay: q() }],
      animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", d] }],
      transform: [{ transform: ["", "gpu", "none"] }],
      scale: [{ scale: [M] }],
      "scale-x": [{ "scale-x": [M] }],
      "scale-y": [{ "scale-y": [M] }],
      rotate: [{ rotate: [T, d] }],
      "translate-x": [{ "translate-x": [V] }],
      "translate-y": [{ "translate-y": [V] }],
      "skew-x": [{ "skew-x": [U] }],
      "skew-y": [{ "skew-y": [U] }],
      "transform-origin": [
        {
          origin: [
            "center",
            "top",
            "top-right",
            "right",
            "bottom-right",
            "bottom",
            "bottom-left",
            "left",
            "top-left",
            d,
          ],
        },
      ],
      accent: [{ accent: ["auto", e] }],
      appearance: [{ appearance: ["none", "auto"] }],
      cursor: [
        {
          cursor: [
            "auto",
            "default",
            "pointer",
            "wait",
            "text",
            "move",
            "help",
            "not-allowed",
            "none",
            "context-menu",
            "progress",
            "cell",
            "crosshair",
            "vertical-text",
            "alias",
            "copy",
            "no-drop",
            "grab",
            "grabbing",
            "all-scroll",
            "col-resize",
            "row-resize",
            "n-resize",
            "e-resize",
            "s-resize",
            "w-resize",
            "ne-resize",
            "nw-resize",
            "se-resize",
            "sw-resize",
            "ew-resize",
            "ns-resize",
            "nesw-resize",
            "nwse-resize",
            "zoom-in",
            "zoom-out",
            d,
          ],
        },
      ],
      "caret-color": [{ caret: [e] }],
      "pointer-events": [{ "pointer-events": ["none", "auto"] }],
      resize: [{ resize: ["none", "y", "x", ""] }],
      "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
      "scroll-m": [{ "scroll-m": f() }],
      "scroll-mx": [{ "scroll-mx": f() }],
      "scroll-my": [{ "scroll-my": f() }],
      "scroll-ms": [{ "scroll-ms": f() }],
      "scroll-me": [{ "scroll-me": f() }],
      "scroll-mt": [{ "scroll-mt": f() }],
      "scroll-mr": [{ "scroll-mr": f() }],
      "scroll-mb": [{ "scroll-mb": f() }],
      "scroll-ml": [{ "scroll-ml": f() }],
      "scroll-p": [{ "scroll-p": f() }],
      "scroll-px": [{ "scroll-px": f() }],
      "scroll-py": [{ "scroll-py": f() }],
      "scroll-ps": [{ "scroll-ps": f() }],
      "scroll-pe": [{ "scroll-pe": f() }],
      "scroll-pt": [{ "scroll-pt": f() }],
      "scroll-pr": [{ "scroll-pr": f() }],
      "scroll-pb": [{ "scroll-pb": f() }],
      "scroll-pl": [{ "scroll-pl": f() }],
      "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
      "snap-stop": [{ snap: ["normal", "always"] }],
      "snap-type": [{ snap: ["none", "x", "y", "both"] }],
      "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
      touch: [{ touch: ["auto", "none", "manipulation"] }],
      "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
      "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
      "touch-pz": ["touch-pinch-zoom"],
      select: [{ select: ["none", "text", "all", "auto"] }],
      "will-change": [
        { "will-change": ["auto", "scroll", "contents", "transform", d] },
      ],
      fill: [{ fill: [e, "none"] }],
      "stroke-w": [{ stroke: [C, z, J] }],
      stroke: [{ stroke: [e, "none"] }],
      sr: ["sr-only", "not-sr-only"],
      "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: [
        "inset-x",
        "inset-y",
        "start",
        "end",
        "top",
        "right",
        "bottom",
        "left",
      ],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": [
        "fvn-ordinal",
        "fvn-slashed-zero",
        "fvn-figure",
        "fvn-spacing",
        "fvn-fraction",
      ],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: [
        "rounded-s",
        "rounded-e",
        "rounded-t",
        "rounded-r",
        "rounded-b",
        "rounded-l",
        "rounded-ss",
        "rounded-se",
        "rounded-ee",
        "rounded-es",
        "rounded-tl",
        "rounded-tr",
        "rounded-br",
        "rounded-bl",
      ],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": [
        "border-w-s",
        "border-w-e",
        "border-w-t",
        "border-w-r",
        "border-w-b",
        "border-w-l",
      ],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": [
        "border-color-t",
        "border-color-r",
        "border-color-b",
        "border-color-l",
      ],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": [
        "scroll-mx",
        "scroll-my",
        "scroll-ms",
        "scroll-me",
        "scroll-mt",
        "scroll-mr",
        "scroll-mb",
        "scroll-ml",
      ],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": [
        "scroll-px",
        "scroll-py",
        "scroll-ps",
        "scroll-pe",
        "scroll-pt",
        "scroll-pr",
        "scroll-pb",
        "scroll-pl",
      ],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"],
    },
    conflictingClassGroupModifiers: { "font-size": ["leading"] },
  }
}
const lr = qe(sr)
function Z(e) {
  let r, t, n, i, o
  const a = e[12].default,
    s = he(a, e, e[11], null)
  let c = [{ role: e[4] }, e[6], { class: e[5] }],
    g = {}
  for (let l = 0; l < c.length; l += 1) g = K(g, c[l])
  return {
    c() {
      ;(r = ve(e[1])), s && s.c(), this.h()
    },
    l(l) {
      r = xe(l, (e[1] || "null").toUpperCase(), { role: !0, class: !0 })
      var b = we(r)
      s && s.l(b), b.forEach(H), this.h()
    },
    h() {
      ae(e[1])(r, g)
    },
    m(l, b) {
      ce(l, r, b),
        s && s.m(r, null),
        e[18](r),
        (n = !0),
        i ||
          ((o = [
            ke((t = e[2].call(null, r, e[3]))),
            j(r, "click", e[13]),
            j(r, "mouseenter", e[14]),
            j(r, "mouseleave", e[15]),
            j(r, "focusin", e[16]),
            j(r, "focusout", e[17]),
          ]),
          (i = !0))
    },
    p(l, b) {
      s &&
        s.p &&
        (!n || b & 2048) &&
        Ce(s, a, l, l[11], n ? _e(a, l[11], b, null) : ze(l[11]), null),
        ae(l[1])(
          r,
          (g = Re(c, [
            (!n || b & 16) && { role: l[4] },
            b & 64 && l[6],
            (!n || b & 32) && { class: l[5] },
          ])),
        ),
        t && Se(t.update) && b & 8 && t.update.call(null, l[3])
    },
    i(l) {
      n || (ue(s, l), (n = !0))
    },
    o(l) {
      ge(s, l), (n = !1)
    },
    d(l) {
      l && H(r), s && s.d(l), e[18](null), (i = !1), Me(o)
    },
  }
}
function dr(e) {
  let r = e[1],
    t,
    n,
    i = e[1] && Z(e)
  return {
    c() {
      i && i.c(), (t = te())
    },
    l(o) {
      i && i.l(o), (t = te())
    },
    m(o, a) {
      i && i.m(o, a), ce(o, t, a), (n = !0)
    },
    p(o, [a]) {
      o[1]
        ? r
          ? de(r, o[1])
            ? (i.d(1), (i = Z(o)), (r = o[1]), i.c(), i.m(t.parentNode, t))
            : i.p(o, a)
          : ((i = Z(o)), (r = o[1]), i.c(), i.m(t.parentNode, t))
        : r && (i.d(1), (i = null), (r = o[1]))
    },
    i(o) {
      n || (ue(i, o), (n = !0))
    },
    o(o) {
      ge(i, o), (n = !1)
    },
    d(o) {
      o && H(t), i && i.d(o)
    },
  }
}
function cr(e, r, t) {
  const n = [
    "tag",
    "color",
    "rounded",
    "border",
    "shadow",
    "node",
    "use",
    "options",
    "role",
  ]
  let i = oe(r, n),
    { $$slots: o = {}, $$scope: a } = r
  const s = () => {}
  ne("background", !0)
  let { tag: c = i.href ? "a" : "div" } = r,
    { color: g = "default" } = r,
    { rounded: l = !1 } = r,
    { border: b = !1 } = r,
    { shadow: h = !1 } = r,
    { node: v = void 0 } = r,
    { use: k = s } = r,
    { options: m = {} } = r,
    { role: y = void 0 } = r
  const w = {
      gray: "bg-gray-50 dark:bg-gray-800",
      red: "bg-red-50 dark:bg-gray-800",
      yellow: "bg-yellow-50 dark:bg-gray-800 ",
      green: "bg-green-50 dark:bg-gray-800 ",
      indigo: "bg-indigo-50 dark:bg-gray-800 ",
      purple: "bg-purple-50 dark:bg-gray-800 ",
      pink: "bg-pink-50 dark:bg-gray-800 ",
      blue: "bg-blue-50 dark:bg-gray-800 ",
      light: "bg-gray-50 dark:bg-gray-700",
      dark: "bg-gray-50 dark:bg-gray-800",
      default: "bg-white dark:bg-gray-800",
      dropdown: "bg-white dark:bg-gray-700",
      navbar: "bg-white dark:bg-gray-900",
      navbarUl: "bg-gray-50 dark:bg-gray-800",
      form: "bg-gray-50 dark:bg-gray-700",
      primary: "bg-primary-50 dark:bg-gray-800 ",
      orange: "bg-orange-50 dark:bg-orange-800",
      none: "",
    },
    x = {
      gray: "text-gray-800 dark:text-gray-300",
      red: "text-red-800 dark:text-red-400",
      yellow: "text-yellow-800 dark:text-yellow-300",
      green: "text-green-800 dark:text-green-400",
      indigo: "text-indigo-800 dark:text-indigo-400",
      purple: "text-purple-800 dark:text-purple-400",
      pink: "text-pink-800 dark:text-pink-400",
      blue: "text-blue-800 dark:text-blue-400",
      light: "text-gray-700 dark:text-gray-300",
      dark: "text-gray-700 dark:text-gray-300",
      default: "text-gray-500 dark:text-gray-400",
      dropdown: "text-gray-700 dark:text-gray-200",
      navbar: "text-gray-700 dark:text-gray-200",
      navbarUl: "text-gray-700 dark:text-gray-400",
      form: "text-gray-900 dark:text-white",
      primary: "text-primary-800 dark:text-primary-400",
      orange: "text-orange-800 dark:text-orange-400",
      none: "",
    },
    N = {
      gray: "border-gray-300 dark:border-gray-800 divide-gray-300 dark:divide-gray-800",
      red: "border-red-300 dark:border-red-800 divide-red-300 dark:divide-red-800",
      yellow:
        "border-yellow-300 dark:border-yellow-800 divide-yellow-300 dark:divide-yellow-800",
      green:
        "border-green-300 dark:border-green-800 divide-green-300 dark:divide-green-800",
      indigo:
        "border-indigo-300 dark:border-indigo-800 divide-indigo-300 dark:divide-indigo-800",
      purple:
        "border-purple-300 dark:border-purple-800 divide-purple-300 dark:divide-purple-800",
      pink: "border-pink-300 dark:border-pink-800 divide-pink-300 dark:divide-pink-800",
      blue: "border-blue-300 dark:border-blue-800 divide-blue-300 dark:divide-blue-800",
      light: "border-gray-500 divide-gray-500",
      dark: "border-gray-500 divide-gray-500",
      default:
        "border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700",
      dropdown:
        "border-gray-100 dark:border-gray-600 divide-gray-100 dark:divide-gray-600",
      navbar:
        "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
      navbarUl:
        "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
      form: "border-gray-300 dark:border-gray-700 divide-gray-300 dark:divide-gray-700",
      primary:
        "border-primary-500 dark:border-primary-200  divide-primary-500 dark:divide-primary-200 ",
      orange:
        "border-orange-300 dark:border-orange-800 divide-orange-300 dark:divide-orange-800",
      none: "",
    }
  let M
  function W(u) {
    E.call(this, e, u)
  }
  function U(u) {
    E.call(this, e, u)
  }
  function O(u) {
    E.call(this, e, u)
  }
  function V(u) {
    E.call(this, e, u)
  }
  function G(u) {
    E.call(this, e, u)
  }
  function I(u) {
    Ae[u ? "unshift" : "push"](() => {
      ;(v = u), t(0, v)
    })
  }
  return (
    (e.$$set = u => {
      t(23, (r = K(K({}, r), ie(u)))),
        t(6, (i = oe(r, n))),
        "tag" in u && t(1, (c = u.tag)),
        "color" in u && t(7, (g = u.color)),
        "rounded" in u && t(8, (l = u.rounded)),
        "border" in u && t(9, (b = u.border)),
        "shadow" in u && t(10, (h = u.shadow)),
        "node" in u && t(0, (v = u.node)),
        "use" in u && t(2, (k = u.use)),
        "options" in u && t(3, (m = u.options)),
        "role" in u && t(4, (y = u.role)),
        "$$scope" in u && t(11, (a = u.$$scope))
    }),
    (e.$$.update = () => {
      e.$$.dirty & 128 && t(7, (g = g ?? "default")),
        e.$$.dirty & 128 && ne("color", g),
        t(
          5,
          (M = lr(
            w[g],
            x[g],
            l && "rounded-lg",
            b && "border",
            N[g],
            h && "shadow-md",
            r.class,
          )),
        )
    }),
    (r = ie(r)),
    [v, c, k, m, y, M, i, g, l, b, h, a, o, W, U, O, V, G, I]
  )
}
class pr extends Ge {
  constructor(r) {
    super(),
      Ie(this, r, cr, dr, de, {
        tag: 1,
        color: 7,
        rounded: 8,
        border: 9,
        shadow: 10,
        node: 0,
        use: 2,
        options: 3,
        role: 4,
      })
  }
}
export { pr as F, br as a, Re as g, lr as t }
