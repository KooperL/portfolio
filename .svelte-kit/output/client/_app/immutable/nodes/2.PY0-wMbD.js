import {
  s as Q,
  e as A,
  c as I,
  a as z,
  d as f,
  b as S,
  i as C,
  o as U,
  f as x,
  g as G,
  h as k,
  j as $,
  t as L,
  k as H,
  n as F,
} from "../chunks/scheduler.gY_bz6RS.js";
import {
  S as X,
  i as Y,
  c as d,
  a as g,
  m as h,
  t as _,
  b,
  d as v,
} from "../chunks/index.1Dz5KRer.js";
import "../chunks/pocketbase.eYyW_pXf.js";
import { B as j } from "../chunks/Button.ZyweCTx2.js";
import { C as Z } from "../chunks/Card.vyHOi96P.js";
import { A as J } from "../chunks/ArrowRightToBracketOutline.6j5_Ggcq.js";
function tt(l) {
  let t;
  return {
    c() {
      t = L("Projects");
    },
    l(e) {
      t = H(e, "Projects");
    },
    m(e, s) {
      C(e, t, s);
    },
    d(e) {
      e && f(t);
    },
  };
}
function et(l) {
  let t;
  return {
    c() {
      t = L("About");
    },
    l(e) {
      t = H(e, "About");
    },
    m(e, s) {
      C(e, t, s);
    },
    d(e) {
      e && f(t);
    },
  };
}
function nt(l) {
  let t;
  return {
    c() {
      t = L("Contact");
    },
    l(e) {
      t = H(e, "Contact");
    },
    m(e, s) {
      C(e, t, s);
    },
    d(e) {
      e && f(t);
    },
  };
}
function at(l) {
  let t, e, s;
  return (
    (t = new J({ props: { class: "w-5 pr-2 h-5" } })),
    {
      c() {
        d(t.$$.fragment), (e = L("GitHub"));
      },
      l(n) {
        g(t.$$.fragment, n), (e = H(n, "GitHub"));
      },
      m(n, o) {
        h(t, n, o), C(n, e, o), (s = !0);
      },
      p: F,
      i(n) {
        s || (_(t.$$.fragment, n), (s = !0));
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
function st(l) {
  let t, e, s;
  return (
    (t = new J({ props: { class: "w-5 h-5 pr-2" } })),
    {
      c() {
        d(t.$$.fragment), (e = L("LinkedIn"));
      },
      l(n) {
        g(t.$$.fragment, n), (e = H(n, "LinkedIn"));
      },
      m(n, o) {
        h(t, n, o), C(n, e, o), (s = !0);
      },
      p: F,
      i(n) {
        s || (_(t.$$.fragment, n), (s = !0));
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
function rt(l) {
  let t,
    e,
    s = "Welcome to my portfolio",
    n,
    o,
    y =
      '<span class="font-bold">I&#39;m Kooper. Have a poke around and enjoy your visit. Let me know if you like what you see!</span> <span class="hidden md:block">(Try playing around with the plane on the right)</span>',
    T,
    i,
    B,
    u,
    D,
    c,
    E,
    w,
    K = "External links",
    M,
    p,
    V,
    m,
    P;
  return (
    (i = new j({
      props: {
        href: "/projects",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [tt] },
        $$scope: { ctx: l },
      },
    })),
    (u = new j({
      props: {
        href: "/about",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [et] },
        $$scope: { ctx: l },
      },
    })),
    (c = new j({
      props: {
        href: "/contact",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [nt] },
        $$scope: { ctx: l },
      },
    })),
    (p = new j({
      props: {
        href: "https://github.com/KooperL",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [at] },
        $$scope: { ctx: l },
      },
    })),
    (m = new j({
      props: {
        href: "https://linkedin.com/in/kooper",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [st] },
        $$scope: { ctx: l },
      },
    })),
    {
      c() {
        (t = A("div")),
          (e = A("span")),
          (e.textContent = s),
          (n = x()),
          (o = A("div")),
          (o.innerHTML = y),
          (T = x()),
          d(i.$$.fragment),
          (B = x()),
          d(u.$$.fragment),
          (D = x()),
          d(c.$$.fragment),
          (E = x()),
          (w = A("span")),
          (w.textContent = K),
          (M = x()),
          d(p.$$.fragment),
          (V = x()),
          d(m.$$.fragment),
          this.h();
      },
      l(r) {
        t = I(r, "DIV", { class: !0 });
        var a = z(t);
        (e = I(a, "SPAN", { class: !0, "data-svelte-h": !0 })),
          G(e) !== "svelte-4tyvej" && (e.textContent = s),
          (n = k(a)),
          (o = I(a, "DIV", { "data-svelte-h": !0 })),
          G(o) !== "svelte-1ikuy2p" && (o.innerHTML = y),
          (T = k(a)),
          g(i.$$.fragment, a),
          (B = k(a)),
          g(u.$$.fragment, a),
          (D = k(a)),
          g(c.$$.fragment, a),
          (E = k(a)),
          (w = I(a, "SPAN", { class: !0, "data-svelte-h": !0 })),
          G(w) !== "svelte-1jt5udw" && (w.textContent = K),
          (M = k(a)),
          g(p.$$.fragment, a),
          (V = k(a)),
          g(m.$$.fragment, a),
          a.forEach(f),
          this.h();
      },
      h() {
        S(e, "class", "text-4xl font-bold"),
          S(w, "class", "text-4xl font-bold"),
          S(t, "class", "flex flex-col space-y-4");
      },
      m(r, a) {
        C(r, t, a),
          $(t, e),
          $(t, n),
          $(t, o),
          $(t, T),
          h(i, t, null),
          $(t, B),
          h(u, t, null),
          $(t, D),
          h(c, t, null),
          $(t, E),
          $(t, w),
          $(t, M),
          h(p, t, null),
          $(t, V),
          h(m, t, null),
          (P = !0);
      },
      p(r, a) {
        const N = {};
        a & 1 && (N.$$scope = { dirty: a, ctx: r }), i.$set(N);
        const q = {};
        a & 1 && (q.$$scope = { dirty: a, ctx: r }), u.$set(q);
        const O = {};
        a & 1 && (O.$$scope = { dirty: a, ctx: r }), c.$set(O);
        const R = {};
        a & 1 && (R.$$scope = { dirty: a, ctx: r }), p.$set(R);
        const W = {};
        a & 1 && (W.$$scope = { dirty: a, ctx: r }), m.$set(W);
      },
      i(r) {
        P ||
          (_(i.$$.fragment, r),
          _(u.$$.fragment, r),
          _(c.$$.fragment, r),
          _(p.$$.fragment, r),
          _(m.$$.fragment, r),
          (P = !0));
      },
      o(r) {
        b(i.$$.fragment, r),
          b(u.$$.fragment, r),
          b(c.$$.fragment, r),
          b(p.$$.fragment, r),
          b(m.$$.fragment, r),
          (P = !1);
      },
      d(r) {
        r && f(t), v(i), v(u), v(c), v(p), v(m);
      },
    }
  );
}
function ot(l) {
  let t, e, s;
  return (
    (e = new Z({
      props: {
        class: "w-full max-w-full h-full bg-white/50",
        $$slots: { default: [rt] },
        $$scope: { ctx: l },
      },
    })),
    {
      c() {
        (t = A("div")), d(e.$$.fragment), this.h();
      },
      l(n) {
        t = I(n, "DIV", { class: !0 });
        var o = z(t);
        g(e.$$.fragment, o), o.forEach(f), this.h();
      },
      h() {
        S(t, "class", "box-border p-8 w-full h-full");
      },
      m(n, o) {
        C(n, t, o), h(e, t, null), (s = !0);
      },
      p(n, [o]) {
        const y = {};
        o & 1 && (y.$$scope = { dirty: o, ctx: n }), e.$set(y);
      },
      i(n) {
        s || (_(e.$$.fragment, n), (s = !0));
      },
      o(n) {
        b(e.$$.fragment, n), (s = !1);
      },
      d(n) {
        n && f(t), v(e);
      },
    }
  );
}
function lt(l) {
  return U(async () => {}), [];
}
class mt extends X {
  constructor(t) {
    super(), Y(this, t, lt, ot, Q, {});
  }
}
export { mt as component };
