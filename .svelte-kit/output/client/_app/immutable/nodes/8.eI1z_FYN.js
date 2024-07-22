import {
  s as S,
  e as d,
  c as h,
  a as q,
  d as m,
  b as v,
  i as k,
  o as T,
  f as V,
  g as B,
  h as j,
  j as $,
  t as M,
  k as P,
  n as H,
} from "../chunks/scheduler.gY_bz6RS.js";
import {
  S as L,
  i as z,
  c as g,
  a as b,
  m as x,
  t as w,
  b as y,
  d as C,
} from "../chunks/index.1Dz5KRer.js";
import "../chunks/pocketbase.eYyW_pXf.js";
import { B as E } from "../chunks/Button.ZyweCTx2.js";
import { C as N } from "../chunks/Card.vyHOi96P.js";
import { A as O } from "../chunks/ArrowRightToBracketOutline.6j5_Ggcq.js";
function R(l) {
  let t;
  return {
    c() {
      t = M("back");
    },
    l(s) {
      t = P(s, "back");
    },
    m(s, r) {
      k(s, t, r);
    },
    d(s) {
      s && m(t);
    },
  };
}
function F(l) {
  let t, s, r;
  return (
    (t = new O({ props: { class: "w-5 h-5 pr-2" } })),
    {
      c() {
        g(t.$$.fragment), (s = M("visit"));
      },
      l(e) {
        b(t.$$.fragment, e), (s = P(e, "visit"));
      },
      m(e, a) {
        x(t, e, a), k(e, s, a), (r = !0);
      },
      p: H,
      i(e) {
        r || (w(t.$$.fragment, e), (r = !0));
      },
      o(e) {
        y(t.$$.fragment, e), (r = !1);
      },
      d(e) {
        e && m(s), C(t, e);
      },
    }
  );
}
function G(l) {
  let t,
    s,
    r = "vybs.tv",
    e,
    a,
    p =
      '<span class="font-bold">Pretty web animations.</span> <div class="h-96 aspect-square border-solid border-3 bg-primary-600 rounded box-border p-1 m-4 flex justify-center items-center"><iframe src="https://vybs.tv" class="w-full h-full"></iframe></div>',
    D,
    i,
    c,
    I,
    f,
    _;
  return (
    (c = new E({
      props: {
        href: "/projects",
        class: "w-48",
        variant: "primary",
        $$slots: { default: [R] },
        $$scope: { ctx: l },
      },
    })),
    (f = new E({
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
        (t = d("div")),
          (s = d("span")),
          (s.textContent = r),
          (e = V()),
          (a = d("div")),
          (a.innerHTML = p),
          (D = V()),
          (i = d("div")),
          g(c.$$.fragment),
          (I = V()),
          g(f.$$.fragment),
          this.h();
      },
      l(n) {
        t = h(n, "DIV", { class: !0 });
        var o = q(t);
        (s = h(o, "SPAN", { class: !0, "data-svelte-h": !0 })),
          B(s) !== "svelte-q5r68g" && (s.textContent = r),
          (e = j(o)),
          (a = h(o, "DIV", { "data-svelte-h": !0 })),
          B(a) !== "svelte-1ua2gzd" && (a.innerHTML = p),
          (D = j(o)),
          (i = h(o, "DIV", { class: !0 }));
        var u = q(i);
        b(c.$$.fragment, u),
          (I = j(u)),
          b(f.$$.fragment, u),
          u.forEach(m),
          o.forEach(m),
          this.h();
      },
      h() {
        v(s, "class", "text-4xl font-bold"),
          v(i, "class", "flex space-x-4"),
          v(t, "class", "flex flex-col space-y-4");
      },
      m(n, o) {
        k(n, t, o),
          $(t, s),
          $(t, e),
          $(t, a),
          $(t, D),
          $(t, i),
          x(c, i, null),
          $(i, I),
          x(f, i, null),
          (_ = !0);
      },
      p(n, o) {
        const u = {};
        o & 1 && (u.$$scope = { dirty: o, ctx: n }), c.$set(u);
        const A = {};
        o & 1 && (A.$$scope = { dirty: o, ctx: n }), f.$set(A);
      },
      i(n) {
        _ || (w(c.$$.fragment, n), w(f.$$.fragment, n), (_ = !0));
      },
      o(n) {
        y(c.$$.fragment, n), y(f.$$.fragment, n), (_ = !1);
      },
      d(n) {
        n && m(t), C(c), C(f);
      },
    }
  );
}
function J(l) {
  let t, s, r;
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
        (t = d("div")), g(s.$$.fragment), this.h();
      },
      l(e) {
        t = h(e, "DIV", { class: !0 });
        var a = q(t);
        b(s.$$.fragment, a), a.forEach(m), this.h();
      },
      h() {
        v(t, "class", "box-border p-8 w-full h-full");
      },
      m(e, a) {
        k(e, t, a), x(s, t, null), (r = !0);
      },
      p(e, [a]) {
        const p = {};
        a & 1 && (p.$$scope = { dirty: a, ctx: e }), s.$set(p);
      },
      i(e) {
        r || (w(s.$$.fragment, e), (r = !0));
      },
      o(e) {
        y(s.$$.fragment, e), (r = !1);
      },
      d(e) {
        e && m(t), C(s);
      },
    }
  );
}
function K(l) {
  return T(async () => {}), [];
}
class tt extends L {
  constructor(t) {
    super(), z(this, t, K, J, S, {});
  }
}
export { tt as component };
