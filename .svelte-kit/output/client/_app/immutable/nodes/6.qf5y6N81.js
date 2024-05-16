import {
  s as T,
  e as d,
  c as h,
  a as j,
  d as p,
  b as _,
  i as y,
  o as H,
  f as S,
  g as A,
  h as V,
  j as m,
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
      s && p(t)
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
        e && p(s), k(t, e)
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
    D,
    i,
    c,
    I,
    f,
    g
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
        href: "https://pento.page/",
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
          (e = S()),
          (a = d("div")),
          (a.innerHTML = $),
          (D = S()),
          (i = d("div")),
          v(c.$$.fragment),
          (I = S()),
          v(f.$$.fragment),
          this.h()
      },
      l(n) {
        t = h(n, "DIV", { class: !0 })
        var o = j(t)
        ;(s = h(o, "SPAN", { class: !0, "data-svelte-h": !0 })),
          A(s) !== "svelte-1crtp5g" && (s.textContent = r),
          (e = V(o)),
          (a = h(o, "DIV", { "data-svelte-h": !0 })),
          A(a) !== "svelte-17w46of" && (a.innerHTML = $),
          (D = V(o)),
          (i = h(o, "DIV", { class: !0 }))
        var u = j(i)
        b(c.$$.fragment, u),
          (I = V(u)),
          b(f.$$.fragment, u),
          u.forEach(p),
          o.forEach(p),
          this.h()
      },
      h() {
        _(s, "class", "text-4xl font-bold"),
          _(i, "class", "flex space-x-4"),
          _(t, "class", "flex flex-col space-y-4")
      },
      m(n, o) {
        y(n, t, o),
          m(t, s),
          m(t, e),
          m(t, a),
          m(t, D),
          m(t, i),
          x(c, i, null),
          m(i, I),
          x(f, i, null),
          (g = !0)
      },
      p(n, o) {
        const u = {}
        o & 1 && (u.$$scope = { dirty: o, ctx: n }), c.$set(u)
        const z = {}
        o & 1 && (z.$$scope = { dirty: o, ctx: n }), f.$set(z)
      },
      i(n) {
        g || (w(c.$$.fragment, n), w(f.$$.fragment, n), (g = !0))
      },
      o(n) {
        C(c.$$.fragment, n), C(f.$$.fragment, n), (g = !1)
      },
      d(n) {
        n && p(t), k(c), k(f)
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
        var a = j(t)
        b(s.$$.fragment, a), a.forEach(p), this.h()
      },
      h() {
        _(t, "class", "box-border p-8 w-full h-full")
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
        e && p(t), k(s)
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
