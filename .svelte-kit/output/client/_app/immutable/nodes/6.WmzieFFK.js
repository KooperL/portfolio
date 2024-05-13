import {
  s as T,
  e as d,
  c as h,
  a as V,
  d as m,
  b as g,
  i as y,
  o as H,
  f as I,
  g as A,
  h as S,
  j as p,
  t as E,
  k as M,
  n as L,
} from "../chunks/scheduler.gY_bz6RS.js"
import {
  S as P,
  i as q,
  c as v,
  a as b,
  m as x,
  t as w,
  b as C,
  d as k,
} from "../chunks/index.1Dz5KRer.js"
import "../chunks/pocketbase.eYyW_pXf.js"
import { B } from "../chunks/Button.ZyweCTx2.js"
import { C as N } from "../chunks/Card.vyHOi96P.js"
import { A as O } from "../chunks/ArrowRightToBracketOutline.6j5_Ggcq.js"
function R(l) {
  let t
  return {
    c() {
      t = E("back")
    },
    l(s) {
      t = M(s, "back")
    },
    m(s, r) {
      y(s, t, r)
    },
    d(s) {
      s && m(t)
    },
  }
}
function F(l) {
  let t, s, r
  return (
    (t = new O({ props: { class: "w-5 h-5 pr-2" } })),
    {
      c() {
        v(t.$$.fragment), (s = E("visit"))
      },
      l(e) {
        b(t.$$.fragment, e), (s = M(e, "visit"))
      },
      m(e, a) {
        x(t, e, a), y(e, s, a), (r = !0)
      },
      p: L,
      i(e) {
        r || (w(t.$$.fragment, e), (r = !0))
      },
      o(e) {
        C(t.$$.fragment, e), (r = !1)
      },
      d(e) {
        e && m(s), k(t, e)
      },
    }
  )
}
function G(l) {
  let t,
    s,
    r = "dropzones.io",
    e,
    a,
    $ =
      '<span class="font-bold">Straight up bingo.</span> <div class="h-96 2xl:h-192 md:h-128 border-solid border-3 bg-primary-600 rounded box-border p-1 m-4 flex justify-center items-center" style="max-height: 50vh"><iframe src="https://dropzones.io/sheet/3fv45nzt3gko5us" class="w-full h-full"></iframe></div>',
    z,
    i,
    c,
    D,
    f,
    _
  return (
    (c = new B({
      props: {
        href: "/projects",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [R] },
        $$scope: { ctx: l },
      },
    })),
    (f = new B({
      props: {
        href: "https://dropzones.io/",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [F] },
        $$scope: { ctx: l },
      },
    })),
    {
      c() {
        ;(t = d("div")),
          (s = d("span")),
          (s.textContent = r),
          (e = I()),
          (a = d("div")),
          (a.innerHTML = $),
          (z = I()),
          (i = d("div")),
          v(c.$$.fragment),
          (D = I()),
          v(f.$$.fragment),
          this.h()
      },
      l(n) {
        t = h(n, "DIV", { class: !0 })
        var o = V(t)
        ;(s = h(o, "SPAN", { class: !0, "data-svelte-h": !0 })),
          A(s) !== "svelte-1crtp5g" && (s.textContent = r),
          (e = S(o)),
          (a = h(o, "DIV", { "data-svelte-h": !0 })),
          A(a) !== "svelte-17w46of" && (a.innerHTML = $),
          (z = S(o)),
          (i = h(o, "DIV", { class: !0 }))
        var u = V(i)
        b(c.$$.fragment, u),
          (D = S(u)),
          b(f.$$.fragment, u),
          u.forEach(m),
          o.forEach(m),
          this.h()
      },
      h() {
        g(s, "class", "text-4xl font-bold"),
          g(i, "class", "flex space-x-4"),
          g(t, "class", "flex flex-col space-y-4")
      },
      m(n, o) {
        y(n, t, o),
          p(t, s),
          p(t, e),
          p(t, a),
          p(t, z),
          p(t, i),
          x(c, i, null),
          p(i, D),
          x(f, i, null),
          (_ = !0)
      },
      p(n, o) {
        const u = {}
        o & 1 && (u.$$scope = { dirty: o, ctx: n }), c.$set(u)
        const j = {}
        o & 1 && (j.$$scope = { dirty: o, ctx: n }), f.$set(j)
      },
      i(n) {
        _ || (w(c.$$.fragment, n), w(f.$$.fragment, n), (_ = !0))
      },
      o(n) {
        C(c.$$.fragment, n), C(f.$$.fragment, n), (_ = !1)
      },
      d(n) {
        n && m(t), k(c), k(f)
      },
    }
  )
}
function J(l) {
  let t, s, r
  return (
    (s = new N({
      props: {
        class: "w-full max-w-full h-full bg-white/50",
        $$slots: { default: [G] },
        $$scope: { ctx: l },
      },
    })),
    {
      c() {
        ;(t = d("div")), v(s.$$.fragment), this.h()
      },
      l(e) {
        t = h(e, "DIV", { class: !0 })
        var a = V(t)
        b(s.$$.fragment, a), a.forEach(m), this.h()
      },
      h() {
        g(t, "class", "box-border p-8 w-full h-full")
      },
      m(e, a) {
        y(e, t, a), x(s, t, null), (r = !0)
      },
      p(e, [a]) {
        const $ = {}
        a & 1 && ($.$$scope = { dirty: a, ctx: e }), s.$set($)
      },
      i(e) {
        r || (w(s.$$.fragment, e), (r = !0))
      },
      o(e) {
        C(s.$$.fragment, e), (r = !1)
      },
      d(e) {
        e && m(t), k(s)
      },
    }
  )
}
function K(l) {
  return H(async () => {}), []
}
class tt extends P {
  constructor(t) {
    super(), q(this, t, K, J, T, {})
  }
}
export { tt as component }
