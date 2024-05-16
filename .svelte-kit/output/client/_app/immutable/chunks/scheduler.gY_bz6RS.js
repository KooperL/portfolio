function A() {}
const nt = t => t
function P(t, e) {
  for (const n in e) t[n] = e[n]
  return t
}
function q(t) {
  return t()
}
function rt() {
  return Object.create(null)
}
function H(t) {
  t.forEach(q)
}
function B(t) {
  return typeof t == "function"
}
function it(t, e) {
  return t != t
    ? e == e
    : t !== e || (t && typeof t == "object") || typeof t == "function"
}
let m
function ct(t, e) {
  return t === e
    ? !0
    : (m || (m = document.createElement("a")), (m.href = e), t === m.href)
}
function st(t) {
  return Object.keys(t).length === 0
}
function L(t, ...e) {
  if (t == null) {
    for (const r of e) r(void 0)
    return A
  }
  const n = t.subscribe(...e)
  return n.unsubscribe ? () => n.unsubscribe() : n
}
function lt(t, e, n) {
  t.$$.on_destroy.push(L(e, n))
}
function ot(t, e, n, r) {
  if (t) {
    const i = C(t, e, n, r)
    return t[0](i)
  }
}
function C(t, e, n, r) {
  return t[1] && r ? P(n.ctx.slice(), t[1](r(e))) : n.ctx
}
function ut(t, e, n, r) {
  if (t[2] && r) {
    const i = t[2](r(n))
    if (e.dirty === void 0) return i
    if (typeof i == "object") {
      const o = [],
        c = Math.max(e.dirty.length, i.length)
      for (let l = 0; l < c; l += 1) o[l] = e.dirty[l] | i[l]
      return o
    }
    return e.dirty | i
  }
  return e.dirty
}
function at(t, e, n, r, i, o) {
  if (i) {
    const c = C(e, n, r, o)
    t.p(c, i)
  }
}
function ft(t) {
  if (t.ctx.length > 32) {
    const e = [],
      n = t.ctx.length / 32
    for (let r = 0; r < n; r++) e[r] = -1
    return e
  }
  return -1
}
function _t(t) {
  const e = {}
  for (const n in t) n[0] !== "$" && (e[n] = t[n])
  return e
}
function dt(t, e) {
  const n = {}
  e = new Set(e)
  for (const r in t) !e.has(r) && r[0] !== "$" && (n[r] = t[r])
  return n
}
function ht(t) {
  const e = {}
  for (const n in t) e[n] = !0
  return e
}
function mt(t, e, n) {
  return t.set(n), e
}
function pt(t) {
  return t && B(t.destroy) ? t.destroy : A
}
let y = !1
function yt() {
  y = !0
}
function bt() {
  y = !1
}
function M(t, e, n, r) {
  for (; t < e; ) {
    const i = t + ((e - t) >> 1)
    n(i) <= r ? (t = i + 1) : (e = i)
  }
  return t
}
function R(t) {
  if (t.hydrate_init) return
  t.hydrate_init = !0
  let e = t.childNodes
  if (t.nodeName === "HEAD") {
    const s = []
    for (let u = 0; u < e.length; u++) {
      const a = e[u]
      a.claim_order !== void 0 && s.push(a)
    }
    e = s
  }
  const n = new Int32Array(e.length + 1),
    r = new Int32Array(e.length)
  n[0] = -1
  let i = 0
  for (let s = 0; s < e.length; s++) {
    const u = e[s].claim_order,
      a =
        (i > 0 && e[n[i]].claim_order <= u
          ? i + 1
          : M(1, i, T => e[n[T]].claim_order, u)) - 1
    r[s] = n[a] + 1
    const k = a + 1
    ;(n[k] = s), (i = Math.max(k, i))
  }
  const o = [],
    c = []
  let l = e.length - 1
  for (let s = n[i] + 1; s != 0; s = r[s - 1]) {
    for (o.push(e[s - 1]); l >= s; l--) c.push(e[l])
    l--
  }
  for (; l >= 0; l--) c.push(e[l])
  o.reverse(), c.sort((s, u) => s.claim_order - u.claim_order)
  for (let s = 0, u = 0; s < c.length; s++) {
    for (; u < o.length && c[s].claim_order >= o[u].claim_order; ) u++
    const a = u < o.length ? o[u] : null
    t.insertBefore(c[s], a)
  }
}
function z(t, e) {
  t.appendChild(e)
}
function F(t) {
  if (!t) return document
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument
  return e && e.host ? e : t.ownerDocument
}
function gt(t) {
  const e = j("style")
  return (e.textContent = "/* empty */"), I(F(t), e), e.sheet
}
function I(t, e) {
  return z(t.head || t, e), e.sheet
}
function U(t, e) {
  if (y) {
    for (
      R(t),
        (t.actual_end_child === void 0 ||
          (t.actual_end_child !== null &&
            t.actual_end_child.parentNode !== t)) &&
          (t.actual_end_child = t.firstChild);
      t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

    )
      t.actual_end_child = t.actual_end_child.nextSibling
    e !== t.actual_end_child
      ? (e.claim_order !== void 0 || e.parentNode !== t) &&
        t.insertBefore(e, t.actual_end_child)
      : (t.actual_end_child = e.nextSibling)
  } else (e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e)
}
function xt(t, e, n) {
  y && !n
    ? U(t, e)
    : (e.parentNode !== t || e.nextSibling != n) && t.insertBefore(e, n || null)
}
function wt(t) {
  t.parentNode && t.parentNode.removeChild(t)
}
function j(t) {
  return document.createElement(t)
}
function W(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t)
}
function v(t) {
  return document.createTextNode(t)
}
function vt() {
  return v(" ")
}
function Et() {
  return v("")
}
function kt(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r)
}
function E(t, e, n) {
  n == null
    ? t.removeAttribute(e)
    : t.getAttribute(e) !== n && t.setAttribute(e, n)
}
const G = ["width", "height"]
function J(t, e) {
  const n = Object.getOwnPropertyDescriptors(t.__proto__)
  for (const r in e)
    e[r] == null
      ? t.removeAttribute(r)
      : r === "style"
        ? (t.style.cssText = e[r])
        : r === "__value"
          ? (t.value = t[r] = e[r])
          : n[r] && n[r].set && G.indexOf(r) === -1
            ? (t[r] = e[r])
            : E(t, r, e[r])
}
function Nt(t, e) {
  for (const n in e) E(t, n, e[n])
}
function K(t, e) {
  Object.keys(e).forEach(n => {
    Q(t, n, e[n])
  })
}
function Q(t, e, n) {
  const r = e.toLowerCase()
  r in t
    ? (t[r] = typeof t[r] == "boolean" && n === "" ? !0 : n)
    : e in t
      ? (t[e] = typeof t[e] == "boolean" && n === "" ? !0 : n)
      : E(t, e, n)
}
function At(t) {
  return /-/.test(t) ? K : J
}
function Ct(t) {
  return t.dataset.svelteH
}
function jt(t) {
  return Array.from(t.childNodes)
}
function V(t) {
  t.claim_info === void 0 &&
    (t.claim_info = { last_index: 0, total_claimed: 0 })
}
function D(t, e, n, r, i = !1) {
  V(t)
  const o = (() => {
    for (let c = t.claim_info.last_index; c < t.length; c++) {
      const l = t[c]
      if (e(l)) {
        const s = n(l)
        return (
          s === void 0 ? t.splice(c, 1) : (t[c] = s),
          i || (t.claim_info.last_index = c),
          l
        )
      }
    }
    for (let c = t.claim_info.last_index - 1; c >= 0; c--) {
      const l = t[c]
      if (e(l)) {
        const s = n(l)
        return (
          s === void 0 ? t.splice(c, 1) : (t[c] = s),
          i
            ? s === void 0 && t.claim_info.last_index--
            : (t.claim_info.last_index = c),
          l
        )
      }
    }
    return r()
  })()
  return (
    (o.claim_order = t.claim_info.total_claimed),
    (t.claim_info.total_claimed += 1),
    o
  )
}
function S(t, e, n, r) {
  return D(
    t,
    i => i.nodeName === e,
    i => {
      const o = []
      for (let c = 0; c < i.attributes.length; c++) {
        const l = i.attributes[c]
        n[l.name] || o.push(l.name)
      }
      o.forEach(c => i.removeAttribute(c))
    },
    () => r(e),
  )
}
function Dt(t, e, n) {
  return S(t, e, n, j)
}
function St(t, e, n) {
  return S(t, e, n, W)
}
function X(t, e) {
  return D(
    t,
    n => n.nodeType === 3,
    n => {
      const r = "" + e
      if (n.data.startsWith(r)) {
        if (n.data.length !== r.length) return n.splitText(r.length)
      } else n.data = r
    },
    () => v(e),
    !0,
  )
}
function Ot(t) {
  return X(t, " ")
}
function Tt(t, e) {
  ;(e = "" + e), t.data !== e && (t.data = e)
}
function Pt(t, e) {
  t.value = e ?? ""
}
function qt(t, e, n, r) {
  n == null
    ? t.style.removeProperty(e)
    : t.style.setProperty(e, n, r ? "important" : "")
}
function Y(t, e, { bubbles: n = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: r })
}
function Ht(t, e) {
  const n = []
  let r = 0
  for (const i of e.childNodes)
    if (i.nodeType === 8) {
      const o = i.textContent.trim()
      o === `HEAD_${t}_END`
        ? ((r -= 1), n.push(i))
        : o === `HEAD_${t}_START` && ((r += 1), n.push(i))
    } else r > 0 && n.push(i)
  return n
}
function Bt(t, e) {
  return new t(e)
}
let p
function b(t) {
  p = t
}
function d() {
  if (!p) throw new Error("Function called outside component initialization")
  return p
}
function Lt(t) {
  d().$$.on_mount.push(t)
}
function Mt(t) {
  d().$$.after_update.push(t)
}
function Rt(t) {
  d().$$.on_destroy.push(t)
}
function zt() {
  const t = d()
  return (e, n, { cancelable: r = !1 } = {}) => {
    const i = t.$$.callbacks[e]
    if (i) {
      const o = Y(e, n, { cancelable: r })
      return (
        i.slice().forEach(c => {
          c.call(t, o)
        }),
        !o.defaultPrevented
      )
    }
    return !0
  }
}
function Ft(t, e) {
  return d().$$.context.set(t, e), e
}
function It(t) {
  return d().$$.context.get(t)
}
function Ut(t, e) {
  const n = t.$$.callbacks[e.type]
  n && n.slice().forEach(r => r.call(this, e))
}
const h = [],
  N = []
let _ = []
const x = [],
  O = Promise.resolve()
let w = !1
function Z() {
  w || ((w = !0), O.then(tt))
}
function Wt() {
  return Z(), O
}
function $(t) {
  _.push(t)
}
function Gt(t) {
  x.push(t)
}
const g = new Set()
let f = 0
function tt() {
  if (f !== 0) return
  const t = p
  do {
    try {
      for (; f < h.length; ) {
        const e = h[f]
        f++, b(e), et(e.$$)
      }
    } catch (e) {
      throw ((h.length = 0), (f = 0), e)
    }
    for (b(null), h.length = 0, f = 0; N.length; ) N.pop()()
    for (let e = 0; e < _.length; e += 1) {
      const n = _[e]
      g.has(n) || (g.add(n), n())
    }
    _.length = 0
  } while (h.length)
  for (; x.length; ) x.pop()()
  ;(w = !1), g.clear(), b(t)
}
function et(t) {
  if (t.fragment !== null) {
    t.update(), H(t.before_update)
    const e = t.dirty
    ;(t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, e),
      t.after_update.forEach($)
  }
}
function Jt(t) {
  const e = [],
    n = []
  _.forEach(r => (t.indexOf(r) === -1 ? e.push(r) : n.push(r))),
    n.forEach(r => r()),
    (_ = e)
}
export {
  tt as $,
  Et as A,
  ot as B,
  J as C,
  at as D,
  ft as E,
  ut as F,
  At as G,
  L as H,
  B as I,
  ct as J,
  Tt as K,
  lt as L,
  Ft as M,
  pt as N,
  N as O,
  Mt as P,
  Bt as Q,
  Wt as R,
  ht as S,
  Pt as T,
  Gt as U,
  F as V,
  gt as W,
  $ as X,
  Y,
  nt as Z,
  rt as _,
  jt as a,
  st as a0,
  Jt as a1,
  p as a2,
  b as a3,
  q as a4,
  h as a5,
  Z as a6,
  yt as a7,
  bt as a8,
  Rt as a9,
  d as aa,
  zt as ab,
  Ht as ac,
  mt as ad,
  E as b,
  Dt as c,
  wt as d,
  j as e,
  vt as f,
  Ct as g,
  Ot as h,
  xt as i,
  U as j,
  X as k,
  qt as l,
  P as m,
  A as n,
  Lt as o,
  W as p,
  St as q,
  Nt as r,
  it as s,
  v as t,
  kt as u,
  H as v,
  dt as w,
  It as x,
  _t as y,
  Ut as z,
}
