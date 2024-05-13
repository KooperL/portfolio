import {
  s as H,
  e as d,
  c as h,
  a as A,
  d as p,
  b as g,
  i as y,
  o as L,
  f as V,
  g as E,
  h as j,
  j as m,
  t as S,
  k as T,
  n as O,
} from "../chunks/scheduler.gY_bz6RS.js"
import {
  S as P,
  i as q,
  c as v,
  a as b,
  m as x,
  t as w,
  b as k,
  d as C,
} from "../chunks/index.1Dz5KRer.js"
import "../chunks/pocketbase.eYyW_pXf.js"
import { B as M } from "../chunks/Button.ZyweCTx2.js"
import { C as N } from "../chunks/Card.vyHOi96P.js"
import { A as R } from "../chunks/ArrowRightToBracketOutline.6j5_Ggcq.js"
function z(l) {
  let t
  return {
    c() {
      t = S("back")
    },
    l(s) {
      t = T(s, "back")
    },
    m(s, n) {
      y(s, t, n)
    },
    d(s) {
      s && p(t)
    },
  }
}
function F(l) {
  let t, s, n
  return (
    (t = new R({ props: { class: "w-5 h-5 pr-2" } })),
    {
      c() {
        v(t.$$.fragment), (s = S("visit"))
      },
      l(e) {
        b(t.$$.fragment, e), (s = T(e, "visit"))
      },
      m(e, a) {
        x(t, e, a), y(e, s, a), (n = !0)
      },
      p: O,
      i(e) {
        n || (w(t.$$.fragment, e), (n = !0))
      },
      o(e) {
        k(t.$$.fragment, e), (n = !1)
      },
      d(e) {
        e && p(s), C(t, e)
      },
    }
  )
}
function G(l) {
  let t,
    s,
    n = "pento.io",
    e,
    a,
    $ =
      '<span class="font-bold">Online note archive.</span> <div class="h-128 border-solid border-3 bg-primary-600 rounded box-border p-1 m-4 flex justify-center items-center" style="max-height: 50vh"><iframe src="https://pento.page/new" class="w-full h-full"></iframe></div>',
    D,
    i,
    c,
    I,
    f,
    _
  return (
    (c = new M({
      props: {
        href: "/projects",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [z] },
        $$scope: { ctx: l },
      },
    })),
    (f = new M({
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
          (s.textContent = n),
          (e = V()),
          (a = d("div")),
          (a.innerHTML = $),
          (D = V()),
          (i = d("div")),
          v(c.$$.fragment),
          (I = V()),
          v(f.$$.fragment),
          this.h()
      },
      l(r) {
        t = h(r, "DIV", { class: !0 })
        var o = A(t)
        ;(s = h(o, "SPAN", { class: !0, "data-svelte-h": !0 })),
          E(s) !== "svelte-16k1h3e" && (s.textContent = n),
          (e = j(o)),
          (a = h(o, "DIV", { "data-svelte-h": !0 })),
          E(a) !== "svelte-1141gwk" && (a.innerHTML = $),
          (D = j(o)),
          (i = h(o, "DIV", { class: !0 }))
        var u = A(i)
        b(c.$$.fragment, u),
          (I = j(u)),
          b(f.$$.fragment, u),
          u.forEach(p),
          o.forEach(p),
          this.h()
      },
      h() {
        g(s, "class", "text-4xl font-bold"),
          g(i, "class", "flex space-x-4"),
          g(t, "class", "flex flex-col space-y-4")
      },
      m(r, o) {
        y(r, t, o),
          m(t, s),
          m(t, e),
          m(t, a),
          m(t, D),
          m(t, i),
          x(c, i, null),
          m(i, I),
          x(f, i, null),
          (_ = !0)
      },
      p(r, o) {
        const u = {}
        o & 1 && (u.$$scope = { dirty: o, ctx: r }), c.$set(u)
        const B = {}
        o & 1 && (B.$$scope = { dirty: o, ctx: r }), f.$set(B)
      },
      i(r) {
        _ || (w(c.$$.fragment, r), w(f.$$.fragment, r), (_ = !0))
      },
      o(r) {
        k(c.$$.fragment, r), k(f.$$.fragment, r), (_ = !1)
      },
      d(r) {
        r && p(t), C(c), C(f)
      },
    }
  )
}
function J(l) {
  let t, s, n
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
        var a = A(t)
        b(s.$$.fragment, a), a.forEach(p), this.h()
      },
      h() {
        g(t, "class", "box-border p-8 w-full h-full")
      },
      m(e, a) {
        y(e, t, a), x(s, t, null), (n = !0)
      },
      p(e, [a]) {
        const $ = {}
        a & 1 && ($.$$scope = { dirty: a, ctx: e }), s.$set($)
      },
      i(e) {
        n || (w(s.$$.fragment, e), (n = !0))
      },
      o(e) {
        k(s.$$.fragment, e), (n = !1)
      },
      d(e) {
        e && p(t), C(s)
      },
    }
  )
}
function K(l) {
  return L(async () => {}), []
}
class tt extends P {
  constructor(t) {
    super(), q(this, t, K, J, H, {})
  }
}
export { tt as component }
