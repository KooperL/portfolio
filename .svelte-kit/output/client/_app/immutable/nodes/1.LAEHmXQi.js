import {
  s as S,
  e as _,
  t as f,
  f as x,
  c as d,
  a as g,
  k as h,
  d as u,
  h as j,
  i as m,
  j as v,
  K as $,
  n as E,
  L as k,
} from "../chunks/scheduler.gY_bz6RS.js"
import { S as q, i as y } from "../chunks/index.1Dz5KRer.js"
import { s as C } from "../chunks/entry.6kHzac2I.js"
const H = () => {
    const s = C
    return {
      page: { subscribe: s.page.subscribe },
      navigating: { subscribe: s.navigating.subscribe },
      updated: s.updated,
    }
  },
  K = {
    subscribe(s) {
      return H().page.subscribe(s)
    },
  }
function L(s) {
  var b
  let t,
    r = s[0].status + "",
    o,
    n,
    i,
    c = ((b = s[0].error) == null ? void 0 : b.message) + "",
    l
  return {
    c() {
      ;(t = _("h1")), (o = f(r)), (n = x()), (i = _("p")), (l = f(c))
    },
    l(e) {
      t = d(e, "H1", {})
      var a = g(t)
      ;(o = h(a, r)), a.forEach(u), (n = j(e)), (i = d(e, "P", {}))
      var p = g(i)
      ;(l = h(p, c)), p.forEach(u)
    },
    m(e, a) {
      m(e, t, a), v(t, o), m(e, n, a), m(e, i, a), v(i, l)
    },
    p(e, [a]) {
      var p
      a & 1 && r !== (r = e[0].status + "") && $(o, r),
        a & 1 &&
          c !== (c = ((p = e[0].error) == null ? void 0 : p.message) + "") &&
          $(l, c)
    },
    i: E,
    o: E,
    d(e) {
      e && (u(t), u(n), u(i))
    },
  }
}
function P(s, t, r) {
  let o
  return k(s, K, n => r(0, (o = n))), [o]
}
let B = class extends q {
  constructor(t) {
    super(), y(this, t, P, L, S, {})
  }
}
export { B as component }
