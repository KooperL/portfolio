import {
  s as H,
  e as j,
  c as P,
  a as T,
  d as f,
  b as S,
  i as x,
  o as J,
  f as C,
  g as I,
  h as k,
  j as m,
  t as y,
  k as B,
  n as F,
} from "../chunks/scheduler.gY_bz6RS.js";
import {
  S as Q,
  i as U,
  c as h,
  a as g,
  m as _,
  t as d,
  b,
  d as v,
} from "../chunks/index.1Dz5KRer.js";
import "../chunks/pocketbase.eYyW_pXf.js";
import { B as A } from "../chunks/Button.ZyweCTx2.js";
import { C as W } from "../chunks/Card.vyHOi96P.js";
import { A as G } from "../chunks/ArrowRightToBracketOutline.6j5_Ggcq.js";
function X(l) {
  let t;
  return {
    c() {
      t = y("dropzones");
    },
    l(e) {
      t = B(e, "dropzones");
    },
    m(e, o) {
      x(e, t, o);
    },
    d(e) {
      e && f(t);
    },
  };
}
function Y(l) {
  let t;
  return {
    c() {
      t = y("pento");
    },
    l(e) {
      t = B(e, "pento");
    },
    m(e, o) {
      x(e, t, o);
    },
    d(e) {
      e && f(t);
    },
  };
}
function Z(l) {
  let t;
  return {
    c() {
      t = y("vybs");
    },
    l(e) {
      t = B(e, "vybs");
    },
    m(e, o) {
      x(e, t, o);
    },
    d(e) {
      e && f(t);
    },
  };
}
function tt(l) {
  let t,
    e,
    o = "svelte-pocketbase-quickstart",
    s;
  return (
    (t = new G({ props: { class: "w-5 pr-2 h-5" } })),
    {
      c() {
        h(t.$$.fragment), (e = j("span")), (e.textContent = o), this.h();
      },
      l(n) {
        g(t.$$.fragment, n),
          (e = P(n, "SPAN", { class: !0, "data-svelte-h": !0 })),
          I(e) !== "svelte-72kvfv" && (e.textContent = o),
          this.h();
      },
      h() {
        S(e, "class", "text-xxs");
      },
      m(n, $) {
        _(t, n, $), x(n, e, $), (s = !0);
      },
      p: F,
      i(n) {
        s || (d(t.$$.fragment, n), (s = !0));
      },
      o(n) {
        b(t.$$.fragment, n), (s = !1);
      },
      d(n) {
        n && f(e), v(t, n);
      },
    }
  );
}
function et(l) {
  let t, e, o;
  return (
    (t = new G({ props: { class: "w-5 h-5 pr-2" } })),
    {
      c() {
        h(t.$$.fragment), (e = y("mdApp"));
      },
      l(s) {
        g(t.$$.fragment, s), (e = B(s, "mdApp"));
      },
      m(s, n) {
        _(t, s, n), x(s, e, n), (o = !0);
      },
      p: F,
      i(s) {
        o || (d(t.$$.fragment, s), (o = !0));
      },
      o(s) {
        b(t.$$.fragment, s), (o = !1);
      },
      d(s) {
        s && f(e), v(t, s);
      },
    }
  );
}
function st(l) {
  let t,
    e,
    o = "Published sites",
    s,
    n,
    $,
    c,
    N,
    p,
    z,
    w,
    K = "My projects",
    D,
    u,
    E,
    i,
    q;
  return (
    (n = new A({
      props: {
        href: "/projects/bingoApp",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [X] },
        $$scope: { ctx: l },
      },
    })),
    (c = new A({
      props: {
        href: "/projects/pento",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [Y] },
        $$scope: { ctx: l },
      },
    })),
    (p = new A({
      props: {
        href: "/projects/vybs",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [Z] },
        $$scope: { ctx: l },
      },
    })),
    (u = new A({
      props: {
        href: "https://github.com/KooperL/svelte-pocketbase-quickstart",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [tt] },
        $$scope: { ctx: l },
      },
    })),
    (i = new A({
      props: {
        href: "https://github.com/KooperL/mdApp",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [et] },
        $$scope: { ctx: l },
      },
    })),
    {
      c() {
        (t = j("div")),
          (e = j("span")),
          (e.textContent = o),
          (s = C()),
          h(n.$$.fragment),
          ($ = C()),
          h(c.$$.fragment),
          (N = C()),
          h(p.$$.fragment),
          (z = C()),
          (w = j("span")),
          (w.textContent = K),
          (D = C()),
          h(u.$$.fragment),
          (E = C()),
          h(i.$$.fragment),
          this.h();
      },
      l(r) {
        t = P(r, "DIV", { class: !0 });
        var a = T(t);
        (e = P(a, "SPAN", { class: !0, "data-svelte-h": !0 })),
          I(e) !== "svelte-qomhdo" && (e.textContent = o),
          (s = k(a)),
          g(n.$$.fragment, a),
          ($ = k(a)),
          g(c.$$.fragment, a),
          (N = k(a)),
          g(p.$$.fragment, a),
          (z = k(a)),
          (w = P(a, "SPAN", { class: !0, "data-svelte-h": !0 })),
          I(w) !== "svelte-1fh6nt2" && (w.textContent = K),
          (D = k(a)),
          g(u.$$.fragment, a),
          (E = k(a)),
          g(i.$$.fragment, a),
          a.forEach(f),
          this.h();
      },
      h() {
        S(e, "class", "text-4xl font-bold"),
          S(w, "class", "text-4xl font-bold"),
          S(t, "class", "flex flex-col space-y-4");
      },
      m(r, a) {
        x(r, t, a),
          m(t, e),
          m(t, s),
          _(n, t, null),
          m(t, $),
          _(c, t, null),
          m(t, N),
          _(p, t, null),
          m(t, z),
          m(t, w),
          m(t, D),
          _(u, t, null),
          m(t, E),
          _(i, t, null),
          (q = !0);
      },
      p(r, a) {
        const L = {};
        a & 1 && (L.$$scope = { dirty: a, ctx: r }), n.$set(L);
        const M = {};
        a & 1 && (M.$$scope = { dirty: a, ctx: r }), c.$set(M);
        const V = {};
        a & 1 && (V.$$scope = { dirty: a, ctx: r }), p.$set(V);
        const O = {};
        a & 1 && (O.$$scope = { dirty: a, ctx: r }), u.$set(O);
        const R = {};
        a & 1 && (R.$$scope = { dirty: a, ctx: r }), i.$set(R);
      },
      i(r) {
        q ||
          (d(n.$$.fragment, r),
          d(c.$$.fragment, r),
          d(p.$$.fragment, r),
          d(u.$$.fragment, r),
          d(i.$$.fragment, r),
          (q = !0));
      },
      o(r) {
        b(n.$$.fragment, r),
          b(c.$$.fragment, r),
          b(p.$$.fragment, r),
          b(u.$$.fragment, r),
          b(i.$$.fragment, r),
          (q = !1);
      },
      d(r) {
        r && f(t), v(n), v(c), v(p), v(u), v(i);
      },
    }
  );
}
function nt(l) {
  let t, e, o;
  return (
    (e = new W({
      props: {
        class: "w-full max-w-full h-full bg-white/50",
        $$slots: { default: [st] },
        $$scope: { ctx: l },
      },
    })),
    {
      c() {
        (t = j("div")), h(e.$$.fragment), this.h();
      },
      l(s) {
        t = P(s, "DIV", { class: !0 });
        var n = T(t);
        g(e.$$.fragment, n), n.forEach(f), this.h();
      },
      h() {
        S(t, "class", "box-border p-8 w-full h-full");
      },
      m(s, n) {
        x(s, t, n), _(e, t, null), (o = !0);
      },
      p(s, [n]) {
        const $ = {};
        n & 1 && ($.$$scope = { dirty: n, ctx: s }), e.$set($);
      },
      i(s) {
        o || (d(e.$$.fragment, s), (o = !0));
      },
      o(s) {
        b(e.$$.fragment, s), (o = !1);
      },
      d(s) {
        s && f(t), v(e);
      },
    }
  );
}
function at(l) {
  return J(async () => {}), [];
}
class pt extends Q {
  constructor(t) {
    super(), U(this, t, at, nt, H, {});
  }
}
export { pt as component };
