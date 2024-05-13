import { R as re, o as oe } from "./scheduler.gY_bz6RS.js"
import { w as dt } from "./index.f12sfW-N.js"
new URL("sveltekit-internal://")
function se(t, e) {
  return t === "/" || e === "ignore"
    ? t
    : e === "never"
      ? t.endsWith("/")
        ? t.slice(0, -1)
        : t
      : e === "always" && !t.endsWith("/")
        ? t + "/"
        : t
}
function ie(t) {
  return t.split("%25").map(decodeURI).join("%25")
}
function ce(t) {
  for (const e in t) t[e] = decodeURIComponent(t[e])
  return t
}
function st({ href: t }) {
  return t.split("#")[0]
}
const le = ["href", "pathname", "search", "toString", "toJSON"]
function fe(t, e, n) {
  const r = new URL(t)
  Object.defineProperty(r, "searchParams", {
    value: new Proxy(r.searchParams, {
      get(a, o) {
        if (o === "get" || o === "getAll" || o === "has")
          return s => (n(s), a[o](s))
        e()
        const i = Reflect.get(a, o)
        return typeof i == "function" ? i.bind(a) : i
      },
    }),
    enumerable: !0,
    configurable: !0,
  })
  for (const a of le)
    Object.defineProperty(r, a, {
      get() {
        return e(), t[a]
      },
      enumerable: !0,
      configurable: !0,
    })
  return r
}
const ue = "/__data.json",
  de = ".html__data.json"
function he(t) {
  return t.endsWith(".html")
    ? t.replace(/\.html$/, de)
    : t.replace(/\/$/, "") + ue
}
function pe(...t) {
  let e = 5381
  for (const n of t)
    if (typeof n == "string") {
      let r = n.length
      for (; r; ) e = (e * 33) ^ n.charCodeAt(--r)
    } else if (ArrayBuffer.isView(n)) {
      const r = new Uint8Array(n.buffer, n.byteOffset, n.byteLength)
      let a = r.length
      for (; a; ) e = (e * 33) ^ r[--a]
    } else throw new TypeError("value must be a string or TypedArray")
  return (e >>> 0).toString(36)
}
function ge(t) {
  const e = atob(t),
    n = new Uint8Array(e.length)
  for (let r = 0; r < e.length; r++) n[r] = e.charCodeAt(r)
  return n.buffer
}
const jt = window.fetch
window.fetch = (t, e) => (
  (t instanceof Request
    ? t.method
    : (e == null ? void 0 : e.method) || "GET") !== "GET" && V.delete(ht(t)),
  jt(t, e)
)
const V = new Map()
function me(t, e) {
  const n = ht(t, e),
    r = document.querySelector(n)
  if (r != null && r.textContent) {
    let { body: a, ...o } = JSON.parse(r.textContent)
    const i = r.getAttribute("data-ttl")
    return (
      i && V.set(n, { body: a, init: o, ttl: 1e3 * Number(i) }),
      r.getAttribute("data-b64") !== null && (a = ge(a)),
      Promise.resolve(new Response(a, o))
    )
  }
  return window.fetch(t, e)
}
function _e(t, e, n) {
  if (V.size > 0) {
    const r = ht(t, n),
      a = V.get(r)
    if (a) {
      if (
        performance.now() < a.ttl &&
        ["default", "force-cache", "only-if-cached", void 0].includes(
          n == null ? void 0 : n.cache,
        )
      )
        return new Response(a.body, a.init)
      V.delete(r)
    }
  }
  return window.fetch(e, n)
}
function ht(t, e) {
  let r = `script[data-sveltekit-fetched][data-url=${JSON.stringify(t instanceof Request ? t.url : t)}]`
  if ((e != null && e.headers) || (e != null && e.body)) {
    const a = []
    e.headers && a.push([...new Headers(e.headers)].join(",")),
      e.body &&
        (typeof e.body == "string" || ArrayBuffer.isView(e.body)) &&
        a.push(e.body),
      (r += `[data-hash="${pe(...a)}"]`)
  }
  return r
}
const ye = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/
function we(t) {
  const e = []
  return {
    pattern:
      t === "/"
        ? /^\/$/
        : new RegExp(
            `^${be(t)
              .map(r => {
                const a = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r)
                if (a)
                  return (
                    e.push({
                      name: a[1],
                      matcher: a[2],
                      optional: !1,
                      rest: !0,
                      chained: !0,
                    }),
                    "(?:/(.*))?"
                  )
                const o = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r)
                if (o)
                  return (
                    e.push({
                      name: o[1],
                      matcher: o[2],
                      optional: !0,
                      rest: !1,
                      chained: !0,
                    }),
                    "(?:/([^/]+))?"
                  )
                if (!r) return
                const i = r.split(/\[(.+?)\](?!\])/)
                return (
                  "/" +
                  i
                    .map((c, f) => {
                      if (f % 2) {
                        if (c.startsWith("x+"))
                          return it(
                            String.fromCharCode(parseInt(c.slice(2), 16)),
                          )
                        if (c.startsWith("u+"))
                          return it(
                            String.fromCharCode(
                              ...c
                                .slice(2)
                                .split("-")
                                .map(l => parseInt(l, 16)),
                            ),
                          )
                        const u = ye.exec(c),
                          [, h, g, d, m] = u
                        return (
                          e.push({
                            name: d,
                            matcher: m,
                            optional: !!h,
                            rest: !!g,
                            chained: g ? f === 1 && i[0] === "" : !1,
                          }),
                          g ? "(.*?)" : h ? "([^/]*)?" : "([^/]+?)"
                        )
                      }
                      return it(c)
                    })
                    .join("")
                )
              })
              .join("")}/?$`,
          ),
    params: e,
  }
}
function ve(t) {
  return !/^\([^)]+\)$/.test(t)
}
function be(t) {
  return t.slice(1).split("/").filter(ve)
}
function Ee(t, e, n) {
  const r = {},
    a = t.slice(1),
    o = a.filter(s => s !== void 0)
  let i = 0
  for (let s = 0; s < e.length; s += 1) {
    const c = e[s]
    let f = a[s - i]
    if (
      (c.chained &&
        c.rest &&
        i &&
        ((f = a
          .slice(s - i, s + 1)
          .filter(u => u)
          .join("/")),
        (i = 0)),
      f === void 0)
    ) {
      c.rest && (r[c.name] = "")
      continue
    }
    if (!c.matcher || n[c.matcher](f)) {
      r[c.name] = f
      const u = e[s + 1],
        h = a[s + 1]
      u && !u.rest && u.optional && h && c.chained && (i = 0),
        !u && !h && Object.keys(r).length === o.length && (i = 0)
      continue
    }
    if (c.optional && c.chained) {
      i++
      continue
    }
    return
  }
  if (!i) return r
}
function it(t) {
  return t
    .normalize()
    .replace(/[[\]]/g, "\\$&")
    .replace(/%/g, "%25")
    .replace(/\//g, "%2[Ff]")
    .replace(/\?/g, "%3[Ff]")
    .replace(/#/g, "%23")
    .replace(/[.*+?^${}()|\\]/g, "\\$&")
}
function ke({ nodes: t, server_loads: e, dictionary: n, matchers: r }) {
  const a = new Set(e)
  return Object.entries(n).map(([s, [c, f, u]]) => {
    const { pattern: h, params: g } = we(s),
      d = {
        id: s,
        exec: m => {
          const l = h.exec(m)
          if (l) return Ee(l, g, r)
        },
        errors: [1, ...(u || [])].map(m => t[m]),
        layouts: [0, ...(f || [])].map(i),
        leaf: o(c),
      }
    return (
      (d.errors.length = d.layouts.length =
        Math.max(d.errors.length, d.layouts.length)),
      d
    )
  })
  function o(s) {
    const c = s < 0
    return c && (s = ~s), [c, t[s]]
  }
  function i(s) {
    return s === void 0 ? s : [a.has(s), t[s]]
  }
}
function Dt(t, e = JSON.parse) {
  try {
    return e(sessionStorage[t])
  } catch {}
}
function Rt(t, e, n = JSON.stringify) {
  const r = n(e)
  try {
    sessionStorage[t] = r
  } catch {}
}
var Nt
const I =
  ((Nt = globalThis.__sveltekit_jkstuc) == null ? void 0 : Nt.base) ??
  "/sveltekit-github-pages"
var Ot
const Se =
    ((Ot = globalThis.__sveltekit_jkstuc) == null ? void 0 : Ot.assets) ?? I,
  Ae = "1711482568893",
  $t = "sveltekit:snapshot",
  Ct = "sveltekit:scroll",
  Vt = "sveltekit:states",
  Re = "sveltekit:pageurl",
  j = "sveltekit:history",
  F = "sveltekit:navigation",
  K = { tap: 1, hover: 2, viewport: 3, eager: 4, off: -1, false: -1 },
  H = location.origin
function Ft(t) {
  if (t instanceof URL) return t
  let e = document.baseURI
  if (!e) {
    const n = document.getElementsByTagName("base")
    e = n.length ? n[0].href : document.URL
  }
  return new URL(t, e)
}
function pt() {
  return { x: pageXOffset, y: pageYOffset }
}
function N(t, e) {
  return t.getAttribute(`data-sveltekit-${e}`)
}
const It = { ...K, "": K.hover }
function Mt(t) {
  let e = t.assignedSlot ?? t.parentNode
  return (e == null ? void 0 : e.nodeType) === 11 && (e = e.host), e
}
function Gt(t, e) {
  for (; t && t !== e; ) {
    if (t.nodeName.toUpperCase() === "A" && t.hasAttribute("href")) return t
    t = Mt(t)
  }
}
function lt(t, e) {
  let n
  try {
    n = new URL(
      t instanceof SVGAElement ? t.href.baseVal : t.href,
      document.baseURI,
    )
  } catch {}
  const r = t instanceof SVGAElement ? t.target.baseVal : t.target,
    a =
      !n ||
      !!r ||
      tt(n, e) ||
      (t.getAttribute("rel") || "").split(/\s+/).includes("external"),
    o = (n == null ? void 0 : n.origin) === H && t.hasAttribute("download")
  return { url: n, external: a, target: r, download: o }
}
function Y(t) {
  let e = null,
    n = null,
    r = null,
    a = null,
    o = null,
    i = null,
    s = t
  for (; s && s !== document.documentElement; )
    r === null && (r = N(s, "preload-code")),
      a === null && (a = N(s, "preload-data")),
      e === null && (e = N(s, "keepfocus")),
      n === null && (n = N(s, "noscroll")),
      o === null && (o = N(s, "reload")),
      i === null && (i = N(s, "replacestate")),
      (s = Mt(s))
  function c(f) {
    switch (f) {
      case "":
      case "true":
        return !0
      case "off":
      case "false":
        return !1
      default:
        return
    }
  }
  return {
    preload_code: It[r ?? "off"],
    preload_data: It[a ?? "off"],
    keepfocus: c(e),
    noscroll: c(n),
    reload: c(o),
    replace_state: c(i),
  }
}
function Lt(t) {
  const e = dt(t)
  let n = !0
  function r() {
    ;(n = !0), e.update(i => i)
  }
  function a(i) {
    ;(n = !1), e.set(i)
  }
  function o(i) {
    let s
    return e.subscribe(c => {
      ;(s === void 0 || (n && c !== s)) && i((s = c))
    })
  }
  return { notify: r, set: a, subscribe: o }
}
function Ie() {
  const { set: t, subscribe: e } = dt(!1)
  let n
  async function r() {
    clearTimeout(n)
    try {
      const a = await fetch(`${Se}/_app/version.json`, {
        headers: { pragma: "no-cache", "cache-control": "no-cache" },
      })
      if (!a.ok) return !1
      const i = (await a.json()).version !== Ae
      return i && (t(!0), clearTimeout(n)), i
    } catch {
      return !1
    }
  }
  return { subscribe: e, check: r }
}
function tt(t, e) {
  return t.origin !== H || !t.pathname.startsWith(e)
}
const Le = -1,
  Pe = -2,
  xe = -3,
  Te = -4,
  Ue = -5,
  Ne = -6
function Oe(t, e) {
  if (typeof t == "number") return a(t, !0)
  if (!Array.isArray(t) || t.length === 0) throw new Error("Invalid input")
  const n = t,
    r = Array(n.length)
  function a(o, i = !1) {
    if (o === Le) return
    if (o === xe) return NaN
    if (o === Te) return 1 / 0
    if (o === Ue) return -1 / 0
    if (o === Ne) return -0
    if (i) throw new Error("Invalid input")
    if (o in r) return r[o]
    const s = n[o]
    if (!s || typeof s != "object") r[o] = s
    else if (Array.isArray(s))
      if (typeof s[0] == "string") {
        const c = s[0],
          f = e == null ? void 0 : e[c]
        if (f) return (r[o] = f(a(s[1])))
        switch (c) {
          case "Date":
            r[o] = new Date(s[1])
            break
          case "Set":
            const u = new Set()
            r[o] = u
            for (let d = 1; d < s.length; d += 1) u.add(a(s[d]))
            break
          case "Map":
            const h = new Map()
            r[o] = h
            for (let d = 1; d < s.length; d += 2) h.set(a(s[d]), a(s[d + 1]))
            break
          case "RegExp":
            r[o] = new RegExp(s[1], s[2])
            break
          case "Object":
            r[o] = Object(s[1])
            break
          case "BigInt":
            r[o] = BigInt(s[1])
            break
          case "null":
            const g = Object.create(null)
            r[o] = g
            for (let d = 1; d < s.length; d += 2) g[s[d]] = a(s[d + 1])
            break
          default:
            throw new Error(`Unknown type ${c}`)
        }
      } else {
        const c = new Array(s.length)
        r[o] = c
        for (let f = 0; f < s.length; f += 1) {
          const u = s[f]
          u !== Pe && (c[f] = a(u))
        }
      }
    else {
      const c = {}
      r[o] = c
      for (const f in s) {
        const u = s[f]
        c[f] = a(u)
      }
    }
    return r[o]
  }
  return a(0)
}
const qt = new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config",
])
;[...qt]
const je = new Set([...qt])
;[...je]
function De(t) {
  return t.filter(e => e != null)
}
class et {
  constructor(e, n) {
    ;(this.status = e),
      typeof n == "string"
        ? (this.body = { message: n })
        : n
          ? (this.body = n)
          : (this.body = { message: `Error: ${e}` })
  }
  toString() {
    return JSON.stringify(this.body)
  }
}
class Ht {
  constructor(e, n) {
    ;(this.status = e), (this.location = n)
  }
}
class gt extends Error {
  constructor(e, n, r) {
    super(r), (this.status = e), (this.text = n)
  }
}
const $e = "x-sveltekit-invalidated",
  Ce = "x-sveltekit-trailing-slash"
function J(t) {
  return t instanceof et || t instanceof gt ? t.status : 500
}
function Ve(t) {
  return t instanceof gt ? t.text : "Internal Error"
}
const U = Dt(Ct) ?? {},
  M = Dt($t) ?? {},
  x = { url: Lt({}), page: Lt({}), navigating: dt(null), updated: Ie() }
function mt(t) {
  U[t] = pt()
}
function Fe(t, e) {
  let n = t + 1
  for (; U[n]; ) delete U[n], (n += 1)
  for (n = e + 1; M[n]; ) delete M[n], (n += 1)
}
function D(t) {
  return (location.href = t.href), new Promise(() => {})
}
function Pt() {}
let nt, ft, W, L, ut, $
const Bt = [],
  z = []
let P = null
const _t = [],
  Me = []
let O = [],
  w = { branch: [], error: null, url: null },
  yt = !1,
  X = !1,
  xt = !0,
  G = !1,
  C = !1,
  Kt = !1,
  wt = !1,
  vt,
  k,
  A,
  R,
  Z
async function Qe(t, e, n) {
  var a, o
  document.URL !== location.href && (location.href = location.href),
    ($ = t),
    (nt = ke(t)),
    (L = document.documentElement),
    (ut = e),
    (ft = t.nodes[0]),
    (W = t.nodes[1]),
    ft(),
    W(),
    (k = (a = history.state) == null ? void 0 : a[j]),
    (A = (o = history.state) == null ? void 0 : o[F]),
    k ||
      ((k = A = Date.now()),
      history.replaceState({ ...history.state, [j]: k, [F]: A }, ""))
  const r = U[k]
  r && ((history.scrollRestoration = "manual"), scrollTo(r.x, r.y)),
    n ? await We(ut, n) : Ye(location.href, { replaceState: !0 }),
    Je()
}
function Yt(t) {
  z.some(e => (e == null ? void 0 : e.snapshot)) &&
    (M[t] = z.map(e => {
      var n
      return (n = e == null ? void 0 : e.snapshot) == null
        ? void 0
        : n.capture()
    }))
}
function Jt(t) {
  var e
  ;(e = M[t]) == null ||
    e.forEach((n, r) => {
      var a, o
      ;(o = (a = z[r]) == null ? void 0 : a.snapshot) == null || o.restore(n)
    })
}
function Tt() {
  mt(k), Rt(Ct, U), Yt(A), Rt($t, M)
}
async function Wt(t, e, n, r) {
  return B({
    type: "goto",
    url: Ft(t),
    keepfocus: e.keepFocus,
    noscroll: e.noScroll,
    replace_state: e.replaceState,
    state: e.state,
    redirect_count: n,
    nav_token: r,
    accept: () => {
      e.invalidateAll && (wt = !0)
    },
  })
}
async function Ge(t) {
  return (
    (P = {
      id: t.id,
      promise: Xt(t).then(
        e => (e.type === "loaded" && e.state.error && (P = null), e),
      ),
    }),
    P.promise
  )
}
async function ct(t) {
  const e = nt.find(n => n.exec(Zt(t)))
  e &&
    (await Promise.all(
      [...e.layouts, e.leaf].map(n => (n == null ? void 0 : n[1]())),
    ))
}
function zt(t, e) {
  var a
  w = t.state
  const n = document.querySelector("style[data-sveltekit]")
  n && n.remove(),
    (R = t.props.page),
    (vt = new $.root({
      target: e,
      props: { ...t.props, stores: x, components: z },
      hydrate: !0,
    })),
    Jt(A)
  const r = {
    from: null,
    to: {
      params: w.params,
      route: { id: ((a = w.route) == null ? void 0 : a.id) ?? null },
      url: new URL(location.href),
    },
    willUnload: !1,
    type: "enter",
    complete: Promise.resolve(),
  }
  O.forEach(o => o(r)), (X = !0)
}
async function Q({
  url: t,
  params: e,
  branch: n,
  status: r,
  error: a,
  route: o,
  form: i,
}) {
  let s = "never"
  if (I && (t.pathname === I || t.pathname === I + "/")) s = "always"
  else
    for (const d of n)
      (d == null ? void 0 : d.slash) !== void 0 && (s = d.slash)
  ;(t.pathname = se(t.pathname, s)), (t.search = t.search)
  const c = {
    type: "loaded",
    state: { url: t, params: e, branch: n, error: a, route: o },
    props: { constructors: De(n).map(d => d.node.component), page: R },
  }
  i !== void 0 && (c.props.form = i)
  let f = {},
    u = !R,
    h = 0
  for (let d = 0; d < Math.max(n.length, w.branch.length); d += 1) {
    const m = n[d],
      l = w.branch[d]
    ;(m == null ? void 0 : m.data) !== (l == null ? void 0 : l.data) &&
      (u = !0),
      m &&
        ((f = { ...f, ...m.data }), u && (c.props[`data_${h}`] = f), (h += 1))
  }
  return (
    (!w.url ||
      t.href !== w.url.href ||
      w.error !== a ||
      (i !== void 0 && i !== R.form) ||
      u) &&
      (c.props.page = {
        error: a,
        params: e,
        route: { id: (o == null ? void 0 : o.id) ?? null },
        state: {},
        status: r,
        url: new URL(t),
        form: i ?? null,
        data: u ? f : R.data,
      }),
    c
  )
}
async function bt({
  loader: t,
  parent: e,
  url: n,
  params: r,
  route: a,
  server_data_node: o,
}) {
  var u, h, g
  let i = null,
    s = !0
  const c = {
      dependencies: new Set(),
      params: new Set(),
      parent: !1,
      route: !1,
      url: !1,
      search_params: new Set(),
    },
    f = await t()
  if ((u = f.universal) != null && u.load) {
    let d = function (...l) {
      for (const _ of l) {
        const { href: v } = new URL(_, n)
        c.dependencies.add(v)
      }
    }
    const m = {
      route: new Proxy(a, { get: (l, _) => (s && (c.route = !0), l[_]) }),
      params: new Proxy(r, { get: (l, _) => (s && c.params.add(_), l[_]) }),
      data: (o == null ? void 0 : o.data) ?? null,
      url: fe(
        n,
        () => {
          s && (c.url = !0)
        },
        l => {
          s && c.search_params.add(l)
        },
      ),
      async fetch(l, _) {
        let v
        l instanceof Request
          ? ((v = l.url),
            (_ = {
              body:
                l.method === "GET" || l.method === "HEAD"
                  ? void 0
                  : await l.blob(),
              cache: l.cache,
              credentials: l.credentials,
              headers: l.headers,
              integrity: l.integrity,
              keepalive: l.keepalive,
              method: l.method,
              mode: l.mode,
              redirect: l.redirect,
              referrer: l.referrer,
              referrerPolicy: l.referrerPolicy,
              signal: l.signal,
              ..._,
            }))
          : (v = l)
        const S = new URL(v, n)
        return (
          s && d(S.href),
          S.origin === n.origin && (v = S.href.slice(n.origin.length)),
          X ? _e(v, S.href, _) : me(v, _)
        )
      },
      setHeaders: () => {},
      depends: d,
      parent() {
        return s && (c.parent = !0), e()
      },
      untrack(l) {
        s = !1
        try {
          return l()
        } finally {
          s = !0
        }
      },
    }
    i = (await f.universal.load.call(null, m)) ?? null
  }
  return {
    node: f,
    loader: t,
    server: o,
    universal:
      (h = f.universal) != null && h.load
        ? { type: "data", data: i, uses: c }
        : null,
    data: i ?? (o == null ? void 0 : o.data) ?? null,
    slash:
      ((g = f.universal) == null ? void 0 : g.trailingSlash) ??
      (o == null ? void 0 : o.slash),
  }
}
function Ut(t, e, n, r, a, o) {
  if (wt) return !0
  if (!a) return !1
  if ((a.parent && t) || (a.route && e) || (a.url && n)) return !0
  for (const i of a.search_params) if (r.has(i)) return !0
  for (const i of a.params) if (o[i] !== w.params[i]) return !0
  for (const i of a.dependencies) if (Bt.some(s => s(new URL(i)))) return !0
  return !1
}
function Et(t, e) {
  return (t == null ? void 0 : t.type) === "data"
    ? t
    : (t == null ? void 0 : t.type) === "skip"
      ? e ?? null
      : null
}
function qe(t, e) {
  if (!t) return new Set(e.searchParams.keys())
  const n = new Set([...t.searchParams.keys(), ...e.searchParams.keys()])
  for (const r of n) {
    const a = t.searchParams.getAll(r),
      o = e.searchParams.getAll(r)
    a.every(i => o.includes(i)) && o.every(i => a.includes(i)) && n.delete(r)
  }
  return n
}
async function Xt({ id: t, invalidating: e, url: n, params: r, route: a }) {
  if ((P == null ? void 0 : P.id) === t) return P.promise
  const { errors: o, layouts: i, leaf: s } = a,
    c = [...i, s]
  o.forEach(p => (p == null ? void 0 : p().catch(() => {}))),
    c.forEach(p => (p == null ? void 0 : p[1]().catch(() => {})))
  let f = null
  const u = w.url ? t !== w.url.pathname + w.url.search : !1,
    h = w.route ? a.id !== w.route.id : !1,
    g = qe(w.url, n)
  let d = !1
  const m = c.map((p, y) => {
    var T
    const b = w.branch[y],
      E =
        !!(p != null && p[0]) &&
        ((b == null ? void 0 : b.loader) !== p[1] ||
          Ut(d, h, u, g, (T = b.server) == null ? void 0 : T.uses, r))
    return E && (d = !0), E
  })
  if (m.some(Boolean)) {
    try {
      f = await ee(n, m)
    } catch (p) {
      return at({
        status: J(p),
        error: await q(p, { url: n, params: r, route: { id: a.id } }),
        url: n,
        route: a,
      })
    }
    if (f.type === "redirect") return f
  }
  const l = f == null ? void 0 : f.nodes
  let _ = !1
  const v = c.map(async (p, y) => {
    var rt
    if (!p) return
    const b = w.branch[y],
      E = l == null ? void 0 : l[y]
    if (
      (!E || E.type === "skip") &&
      p[1] === (b == null ? void 0 : b.loader) &&
      !Ut(_, h, u, g, (rt = b.universal) == null ? void 0 : rt.uses, r)
    )
      return b
    if (((_ = !0), (E == null ? void 0 : E.type) === "error")) throw E
    return bt({
      loader: p[1],
      url: n,
      params: r,
      route: a,
      parent: async () => {
        var At
        const St = {}
        for (let ot = 0; ot < y; ot += 1)
          Object.assign(St, (At = await v[ot]) == null ? void 0 : At.data)
        return St
      },
      server_data_node: Et(
        E === void 0 && p[0] ? { type: "skip" } : E ?? null,
        p[0] ? (b == null ? void 0 : b.server) : void 0,
      ),
    })
  })
  for (const p of v) p.catch(() => {})
  const S = []
  for (let p = 0; p < c.length; p += 1)
    if (c[p])
      try {
        S.push(await v[p])
      } catch (y) {
        if (y instanceof Ht) return { type: "redirect", location: y.location }
        let b = J(y),
          E
        if (l != null && l.includes(y)) (b = y.status ?? b), (E = y.error)
        else if (y instanceof et) E = y.body
        else {
          if (await x.updated.check()) return await D(n)
          E = await q(y, { params: r, url: n, route: { id: a.id } })
        }
        const T = await He(p, S, o)
        return T
          ? await Q({
              url: n,
              params: r,
              branch: S.slice(0, T.idx).concat(T.node),
              status: b,
              error: E,
              route: a,
            })
          : await te(n, { id: a.id }, E, b)
      }
    else S.push(void 0)
  return await Q({
    url: n,
    params: r,
    branch: S,
    status: 200,
    error: null,
    route: a,
    form: e ? void 0 : null,
  })
}
async function He(t, e, n) {
  for (; t--; )
    if (n[t]) {
      let r = t
      for (; !e[r]; ) r -= 1
      try {
        return {
          idx: r + 1,
          node: {
            node: await n[t](),
            loader: n[t],
            data: {},
            server: null,
            universal: null,
          },
        }
      } catch {
        continue
      }
    }
}
async function at({ status: t, error: e, url: n, route: r }) {
  const a = {}
  let o = null
  if ($.server_loads[0] === 0)
    try {
      const f = await ee(n, [!0])
      if (f.type !== "data" || (f.nodes[0] && f.nodes[0].type !== "data"))
        throw 0
      o = f.nodes[0] ?? null
    } catch {
      ;(n.origin !== H || n.pathname !== location.pathname || yt) &&
        (await D(n))
    }
  const s = await bt({
      loader: ft,
      url: n,
      params: a,
      route: r,
      parent: () => Promise.resolve({}),
      server_data_node: Et(o),
    }),
    c = {
      node: await W(),
      loader: W,
      universal: null,
      server: null,
      data: null,
    }
  return await Q({
    url: n,
    params: a,
    branch: [s, c],
    status: t,
    error: e,
    route: null,
  })
}
function kt(t, e) {
  if (!t || tt(t, I)) return
  let n
  try {
    n = $.hooks.reroute({ url: new URL(t) }) ?? t.pathname
  } catch {
    return
  }
  const r = Zt(n)
  for (const a of nt) {
    const o = a.exec(r)
    if (o)
      return {
        id: t.pathname + t.search,
        invalidating: e,
        route: a,
        params: ce(o),
        url: t,
      }
  }
}
function Zt(t) {
  return ie(t.slice(I.length) || "/")
}
function Qt({ url: t, type: e, intent: n, delta: r }) {
  let a = !1
  const o = ae(w, n, t, e)
  r !== void 0 && (o.navigation.delta = r)
  const i = {
    ...o.navigation,
    cancel: () => {
      ;(a = !0), o.reject(new Error("navigation cancelled"))
    },
  }
  return G || _t.forEach(s => s(i)), a ? null : o
}
async function B({
  type: t,
  url: e,
  popped: n,
  keepfocus: r,
  noscroll: a,
  replace_state: o,
  state: i = {},
  redirect_count: s = 0,
  nav_token: c = {},
  accept: f = Pt,
  block: u = Pt,
}) {
  const h = kt(e, !1),
    g = Qt({ url: e, type: t, delta: n == null ? void 0 : n.delta, intent: h })
  if (!g) {
    u()
    return
  }
  const d = k,
    m = A
  f(), (G = !0), X && x.navigating.set(g.navigation), (Z = c)
  let l = h && (await Xt(h))
  if (!l) {
    if (tt(e, I)) return await D(e)
    l = await te(
      e,
      { id: null },
      await q(new gt(404, "Not Found", `Not found: ${e.pathname}`), {
        url: e,
        params: {},
        route: { id: null },
      }),
      404,
    )
  }
  if (((e = (h == null ? void 0 : h.url) || e), Z !== c))
    return g.reject(new Error("navigation aborted")), !1
  if (l.type === "redirect")
    if (s >= 20)
      l = await at({
        status: 500,
        error: await q(new Error("Redirect loop"), {
          url: e,
          params: {},
          route: { id: null },
        }),
        url: e,
        route: { id: null },
      })
    else return Wt(new URL(l.location, e).href, {}, s + 1, c), !1
  else l.props.page.status >= 400 && (await x.updated.check()) && (await D(e))
  if (
    ((Bt.length = 0),
    (wt = !1),
    mt(d),
    Yt(m),
    l.props.page.url.pathname !== e.pathname &&
      (e.pathname = l.props.page.url.pathname),
    (i = n ? n.state : i),
    !n)
  ) {
    const p = o ? 0 : 1,
      y = { [j]: (k += p), [F]: (A += p), [Vt]: i }
    ;(o ? history.replaceState : history.pushState).call(history, y, "", e),
      o || Fe(k, A)
  }
  if (((P = null), (l.props.page.state = i), X)) {
    ;(w = l.state), l.props.page && (l.props.page.url = e)
    const p = (await Promise.all(Me.map(y => y(g.navigation)))).filter(
      y => typeof y == "function",
    )
    if (p.length > 0) {
      let y = function () {
        O = O.filter(b => !p.includes(b))
      }
      p.push(y), O.push(...p)
    }
    vt.$set(l.props), (Kt = !0)
  } else zt(l, ut)
  const { activeElement: _ } = document
  await re()
  const v = n ? n.scroll : a ? pt() : null
  if (xt) {
    const p =
      e.hash && document.getElementById(decodeURIComponent(e.hash.slice(1)))
    v ? scrollTo(v.x, v.y) : p ? p.scrollIntoView() : scrollTo(0, 0)
  }
  const S =
    document.activeElement !== _ && document.activeElement !== document.body
  !r && !S && ze(),
    (xt = !0),
    l.props.page && (R = l.props.page),
    (G = !1),
    t === "popstate" && Jt(A),
    g.fulfil(void 0),
    O.forEach(p => p(g.navigation)),
    x.navigating.set(null)
}
async function te(t, e, n, r) {
  return t.origin === H && t.pathname === location.pathname && !yt
    ? await at({ status: r, error: n, url: t, route: e })
    : await D(t)
}
function Be() {
  let t
  L.addEventListener("mousemove", o => {
    const i = o.target
    clearTimeout(t),
      (t = setTimeout(() => {
        r(i, 2)
      }, 20))
  })
  function e(o) {
    r(o.composedPath()[0], 1)
  }
  L.addEventListener("mousedown", e),
    L.addEventListener("touchstart", e, { passive: !0 })
  const n = new IntersectionObserver(
    o => {
      for (const i of o)
        i.isIntersecting && (ct(i.target.href), n.unobserve(i.target))
    },
    { threshold: 0 },
  )
  function r(o, i) {
    const s = Gt(o, L)
    if (!s) return
    const { url: c, external: f, download: u } = lt(s, I)
    if (f || u) return
    const h = Y(s)
    if (!h.reload)
      if (i <= h.preload_data) {
        const g = kt(c, !1)
        g && Ge(g)
      } else i <= h.preload_code && ct(c.pathname)
  }
  function a() {
    n.disconnect()
    for (const o of L.querySelectorAll("a")) {
      const { url: i, external: s, download: c } = lt(o, I)
      if (s || c) continue
      const f = Y(o)
      f.reload ||
        (f.preload_code === K.viewport && n.observe(o),
        f.preload_code === K.eager && ct(i.pathname))
    }
  }
  O.push(a), a()
}
function q(t, e) {
  if (t instanceof et) return t.body
  const n = J(t),
    r = Ve(t)
  return (
    $.hooks.handleError({ error: t, event: e, status: n, message: r }) ?? {
      message: r,
    }
  )
}
function Ke(t, e) {
  oe(
    () => (
      t.push(e),
      () => {
        const n = t.indexOf(e)
        t.splice(n, 1)
      }
    ),
  )
}
function tn(t) {
  Ke(_t, t)
}
function Ye(t, e = {}) {
  return (
    (t = Ft(t)),
    t.origin !== H
      ? Promise.reject(new Error("goto: invalid URL"))
      : Wt(t, e, 0)
  )
}
function Je() {
  var e
  ;(history.scrollRestoration = "manual"),
    addEventListener("beforeunload", n => {
      let r = !1
      if ((Tt(), !G)) {
        const a = ae(w, void 0, null, "leave"),
          o = {
            ...a.navigation,
            cancel: () => {
              ;(r = !0), a.reject(new Error("navigation cancelled"))
            },
          }
        _t.forEach(i => i(o))
      }
      r
        ? (n.preventDefault(), (n.returnValue = ""))
        : (history.scrollRestoration = "auto")
    }),
    addEventListener("visibilitychange", () => {
      document.visibilityState === "hidden" && Tt()
    }),
    ((e = navigator.connection) != null && e.saveData) || Be(),
    L.addEventListener("click", n => {
      var g
      if (
        n.button ||
        n.which !== 1 ||
        n.metaKey ||
        n.ctrlKey ||
        n.shiftKey ||
        n.altKey ||
        n.defaultPrevented
      )
        return
      const r = Gt(n.composedPath()[0], L)
      if (!r) return
      const { url: a, external: o, target: i, download: s } = lt(r, I)
      if (!a) return
      if (i === "_parent" || i === "_top") {
        if (window.parent !== window) return
      } else if (i && i !== "_self") return
      const c = Y(r)
      if (
        (!(r instanceof SVGAElement) &&
          a.protocol !== location.protocol &&
          !(a.protocol === "https:" || a.protocol === "http:")) ||
        s
      )
        return
      if (o || c.reload) {
        Qt({ url: a, type: "link" }) ? (G = !0) : n.preventDefault()
        return
      }
      const [u, h] = a.href.split("#")
      if (h !== void 0 && u === st(location)) {
        const [, d] = w.url.href.split("#")
        if (d === h) {
          n.preventDefault(),
            h === "" ||
            (h === "top" && r.ownerDocument.getElementById("top") === null)
              ? window.scrollTo({ top: 0 })
              : (g = r.ownerDocument.getElementById(h)) == null ||
                g.scrollIntoView()
          return
        }
        if (((C = !0), mt(k), t(a), !c.replace_state)) return
        C = !1
      }
      n.preventDefault(),
        B({
          type: "link",
          url: a,
          keepfocus: c.keepfocus,
          noscroll: c.noscroll,
          replace_state: c.replace_state ?? a.href === location.href,
        })
    }),
    L.addEventListener("submit", n => {
      if (n.defaultPrevented) return
      const r = HTMLFormElement.prototype.cloneNode.call(n.target),
        a = n.submitter
      if (((a == null ? void 0 : a.formMethod) || r.method) !== "get") return
      const i = new URL(
        ((a == null ? void 0 : a.hasAttribute("formaction")) &&
          (a == null ? void 0 : a.formAction)) ||
          r.action,
      )
      if (tt(i, I)) return
      const s = n.target,
        c = Y(s)
      if (c.reload) return
      n.preventDefault(), n.stopPropagation()
      const f = new FormData(s),
        u = a == null ? void 0 : a.getAttribute("name")
      u && f.append(u, (a == null ? void 0 : a.getAttribute("value")) ?? ""),
        (i.search = new URLSearchParams(f).toString()),
        B({
          type: "form",
          url: i,
          keepfocus: c.keepfocus,
          noscroll: c.noscroll,
          replace_state: c.replace_state ?? i.href === location.href,
        })
    }),
    addEventListener("popstate", async n => {
      var r
      if ((r = n.state) != null && r[j]) {
        const a = n.state[j]
        if (((Z = {}), a === k)) return
        const o = U[a],
          i = n.state[Vt] ?? {},
          s = new URL(n.state[Re] ?? location.href),
          c = n.state[F],
          f = st(location) === st(w.url)
        if (c === A && (Kt || f)) {
          t(s),
            (U[k] = pt()),
            o && scrollTo(o.x, o.y),
            i !== R.state && ((R = { ...R, state: i }), vt.$set({ page: R })),
            (k = a)
          return
        }
        const h = a - k
        await B({
          type: "popstate",
          url: s,
          popped: { state: i, scroll: o, delta: h },
          accept: () => {
            ;(k = a), (A = c)
          },
          block: () => {
            history.go(-h)
          },
          nav_token: Z,
        })
      } else if (!C) {
        const a = new URL(location.href)
        t(a)
      }
    }),
    addEventListener("hashchange", () => {
      C &&
        ((C = !1),
        history.replaceState(
          { ...history.state, [j]: ++k, [F]: A },
          "",
          location.href,
        ))
    })
  for (const n of document.querySelectorAll("link"))
    n.rel === "icon" && (n.href = n.href)
  addEventListener("pageshow", n => {
    n.persisted && x.navigating.set(null)
  })
  function t(n) {
    ;(w.url = n), x.page.set({ ...R, url: n }), x.page.notify()
  }
}
async function We(
  t,
  {
    status: e = 200,
    error: n,
    node_ids: r,
    params: a,
    route: o,
    data: i,
    form: s,
  },
) {
  yt = !0
  const c = new URL(location.href)
  ;({ params: a = {}, route: o = { id: null } } = kt(c, !1) || {})
  let f
  try {
    const u = r.map(async (d, m) => {
        const l = i[m]
        return (
          l != null && l.uses && (l.uses = ne(l.uses)),
          bt({
            loader: $.nodes[d],
            url: c,
            params: a,
            route: o,
            parent: async () => {
              const _ = {}
              for (let v = 0; v < m; v += 1) Object.assign(_, (await u[v]).data)
              return _
            },
            server_data_node: Et(l),
          })
        )
      }),
      h = await Promise.all(u),
      g = nt.find(({ id: d }) => d === o.id)
    if (g) {
      const d = g.layouts
      for (let m = 0; m < d.length; m++) d[m] || h.splice(m, 0, void 0)
    }
    f = await Q({
      url: c,
      params: a,
      branch: h,
      status: e,
      error: n,
      form: s,
      route: g ?? null,
    })
  } catch (u) {
    if (u instanceof Ht) {
      await D(new URL(u.location, location.href))
      return
    }
    f = await at({
      status: J(u),
      error: await q(u, { url: c, params: a, route: o }),
      url: c,
      route: o,
    })
  }
  f.props.page && (f.props.page.state = {}), zt(f, t)
}
async function ee(t, e) {
  var a
  const n = new URL(t)
  ;(n.pathname = he(t.pathname)),
    t.pathname.endsWith("/") && n.searchParams.append(Ce, "1"),
    n.searchParams.append($e, e.map(o => (o ? "1" : "0")).join(""))
  const r = await jt(n.href)
  if (!r.ok) {
    let o
    throw (
      ((a = r.headers.get("content-type")) != null &&
      a.includes("application/json")
        ? (o = await r.json())
        : r.status === 404
          ? (o = "Not Found")
          : r.status === 500 && (o = "Internal Error"),
      new et(r.status, o))
    )
  }
  return new Promise(async o => {
    var h
    const i = new Map(),
      s = r.body.getReader(),
      c = new TextDecoder()
    function f(g) {
      return Oe(g, {
        Promise: d =>
          new Promise((m, l) => {
            i.set(d, { fulfil: m, reject: l })
          }),
      })
    }
    let u = ""
    for (;;) {
      const { done: g, value: d } = await s.read()
      if (g && !u) break
      for (
        u +=
          !d && u
            ? `
`
            : c.decode(d, { stream: !0 });
        ;

      ) {
        const m = u.indexOf(`
`)
        if (m === -1) break
        const l = JSON.parse(u.slice(0, m))
        if (((u = u.slice(m + 1)), l.type === "redirect")) return o(l)
        if (l.type === "data")
          (h = l.nodes) == null ||
            h.forEach(_ => {
              ;(_ == null ? void 0 : _.type) === "data" &&
                ((_.uses = ne(_.uses)), (_.data = f(_.data)))
            }),
            o(l)
        else if (l.type === "chunk") {
          const { id: _, data: v, error: S } = l,
            p = i.get(_)
          i.delete(_), S ? p.reject(f(S)) : p.fulfil(f(v))
        }
      }
    }
  })
}
function ne(t) {
  return {
    dependencies: new Set((t == null ? void 0 : t.dependencies) ?? []),
    params: new Set((t == null ? void 0 : t.params) ?? []),
    parent: !!(t != null && t.parent),
    route: !!(t != null && t.route),
    url: !!(t != null && t.url),
    search_params: new Set((t == null ? void 0 : t.search_params) ?? []),
  }
}
function ze() {
  const t = document.querySelector("[autofocus]")
  if (t) t.focus()
  else {
    const e = document.body,
      n = e.getAttribute("tabindex")
    ;(e.tabIndex = -1),
      e.focus({ preventScroll: !0, focusVisible: !1 }),
      n !== null ? e.setAttribute("tabindex", n) : e.removeAttribute("tabindex")
    const r = getSelection()
    if (r && r.type !== "None") {
      const a = []
      for (let o = 0; o < r.rangeCount; o += 1) a.push(r.getRangeAt(o))
      setTimeout(() => {
        if (r.rangeCount === a.length) {
          for (let o = 0; o < r.rangeCount; o += 1) {
            const i = a[o],
              s = r.getRangeAt(o)
            if (
              i.commonAncestorContainer !== s.commonAncestorContainer ||
              i.startContainer !== s.startContainer ||
              i.endContainer !== s.endContainer ||
              i.startOffset !== s.startOffset ||
              i.endOffset !== s.endOffset
            )
              return
          }
          r.removeAllRanges()
        }
      })
    }
  }
}
function ae(t, e, n, r) {
  var c, f
  let a, o
  const i = new Promise((u, h) => {
    ;(a = u), (o = h)
  })
  return (
    i.catch(() => {}),
    {
      navigation: {
        from: {
          params: t.params,
          route: { id: ((c = t.route) == null ? void 0 : c.id) ?? null },
          url: t.url,
        },
        to: n && {
          params: (e == null ? void 0 : e.params) ?? null,
          route: {
            id:
              ((f = e == null ? void 0 : e.route) == null ? void 0 : f.id) ??
              null,
          },
          url: n,
        },
        willUnload: !e,
        type: r,
        complete: i,
      },
      fulfil: a,
      reject: o,
    }
  )
}
export { I as a, tn as b, Qe as c, x as s }
