import {
  s as me,
  A as j,
  i as C,
  d as _,
  w as x,
  m as L,
  y as ie,
  B as X,
  D as H,
  E as J,
  F as K,
  e as E,
  c as D,
  a as N,
  G as Le,
  N as Je,
  O as Ce,
  C as ce,
  S as Xe,
  x as Pe,
  f as T,
  h as B,
  z as v,
  b as O,
  T as ye,
  u as k,
  v as He,
  g as Ke,
  j as W,
  U as Ne,
  t as we,
  k as Ee,
} from "../chunks/scheduler.gY_bz6RS.js";
import {
  S as pe,
  i as be,
  g as de,
  b as p,
  e as _e,
  t as g,
  c as M,
  a as R,
  m as q,
  d as U,
  f as We,
} from "../chunks/index.1Dz5KRer.js";
import { p as Qe } from "../chunks/pocketbase.eYyW_pXf.js";
import { B as Ye } from "../chunks/Button.ZyweCTx2.js";
import { C as Ze } from "../chunks/Card.vyHOi96P.js";
import { g as De, t as F } from "../chunks/Frame.osOJd-OA.js";
function $e(t) {
  let e;
  const l = t[5].default,
    n = X(l, t, t[4], null);
  return {
    c() {
      n && n.c();
    },
    l(s) {
      n && n.l(s);
    },
    m(s, a) {
      n && n.m(s, a), (e = !0);
    },
    p(s, a) {
      n &&
        n.p &&
        (!e || a & 16) &&
        H(n, l, s, s[4], e ? K(l, s[4], a, null) : J(s[4]), null);
    },
    i(s) {
      e || (g(n, s), (e = !0));
    },
    o(s) {
      p(n, s), (e = !1);
    },
    d(s) {
      n && n.d(s);
    },
  };
}
function xe(t) {
  let e = t[0],
    l,
    n,
    s = t[0] && Ve(t);
  return {
    c() {
      s && s.c(), (l = j());
    },
    l(a) {
      s && s.l(a), (l = j());
    },
    m(a, r) {
      s && s.m(a, r), C(a, l, r), (n = !0);
    },
    p(a, r) {
      a[0]
        ? e
          ? me(e, a[0])
            ? (s.d(1), (s = Ve(a)), (e = a[0]), s.c(), s.m(l.parentNode, l))
            : s.p(a, r)
          : ((s = Ve(a)), (e = a[0]), s.c(), s.m(l.parentNode, l))
        : e && (s.d(1), (s = null), (e = a[0]));
    },
    i(a) {
      n || (g(s, a), (n = !0));
    },
    o(a) {
      p(s, a), (n = !1);
    },
    d(a) {
      a && _(l), s && s.d(a);
    },
  };
}
function Ve(t) {
  let e, l, n, s;
  const a = t[5].default,
    r = X(a, t, t[4], null);
  let i = [t[3]],
    o = {};
  for (let u = 0; u < i.length; u += 1) o = L(o, i[u]);
  return {
    c() {
      (e = E(t[0])), r && r.c(), this.h();
    },
    l(u) {
      e = D(u, (t[0] || "null").toUpperCase(), {});
      var f = N(e);
      r && r.l(f), f.forEach(_), this.h();
    },
    h() {
      Le(t[0])(e, o);
    },
    m(u, f) {
      C(u, e, f),
        r && r.m(e, null),
        (l = !0),
        n || ((s = Je(t[2].call(null, e))), (n = !0));
    },
    p(u, f) {
      r &&
        r.p &&
        (!l || f & 16) &&
        H(r, a, u, u[4], l ? K(a, u[4], f, null) : J(u[4]), null),
        Le(u[0])(e, (o = De(i, [f & 8 && u[3]])));
    },
    i(u) {
      l || (g(r, u), (l = !0));
    },
    o(u) {
      p(r, u), (l = !1);
    },
    d(u) {
      u && _(e), r && r.d(u), (n = !1), s();
    },
  };
}
function et(t) {
  let e, l, n, s;
  const a = [xe, $e],
    r = [];
  function i(o, u) {
    return o[1] ? 0 : 1;
  }
  return (
    (e = i(t)),
    (l = r[e] = a[e](t)),
    {
      c() {
        l.c(), (n = j());
      },
      l(o) {
        l.l(o), (n = j());
      },
      m(o, u) {
        r[e].m(o, u), C(o, n, u), (s = !0);
      },
      p(o, [u]) {
        let f = e;
        (e = i(o)),
          e === f
            ? r[e].p(o, u)
            : (de(),
              p(r[f], 1, 1, () => {
                r[f] = null;
              }),
              _e(),
              (l = r[e]),
              l ? l.p(o, u) : ((l = r[e] = a[e](o)), l.c()),
              g(l, 1),
              l.m(n.parentNode, n));
      },
      i(o) {
        s || (g(l), (s = !0));
      },
      o(o) {
        p(l), (s = !1);
      },
      d(o) {
        o && _(n), r[e].d(o);
      },
    }
  );
}
function tt(t, e, l) {
  const n = ["tag", "show", "use"];
  let s = x(e, n),
    { $$slots: a = {}, $$scope: r } = e,
    { tag: i = "div" } = e,
    { show: o } = e,
    { use: u = () => {} } = e;
  return (
    (t.$$set = (f) => {
      (e = L(L({}, e), ie(f))),
        l(3, (s = x(e, n))),
        "tag" in f && l(0, (i = f.tag)),
        "show" in f && l(1, (o = f.show)),
        "use" in f && l(2, (u = f.use)),
        "$$scope" in f && l(4, (r = f.$$scope));
    }),
    [i, o, u, s, r, a]
  );
}
class Se extends pe {
  constructor(e) {
    super(), be(this, e, tt, et, me, { tag: 0, show: 1, use: 2 });
  }
}
function lt(t) {
  let e;
  const l = t[7].default,
    n = X(l, t, t[6], null);
  return {
    c() {
      n && n.c();
    },
    l(s) {
      n && n.l(s);
    },
    m(s, a) {
      n && n.m(s, a), (e = !0);
    },
    p(s, a) {
      n &&
        n.p &&
        (!e || a & 64) &&
        H(n, l, s, s[6], e ? K(l, s[6], a, null) : J(s[6]), null);
    },
    i(s) {
      e || (g(n, s), (e = !0));
    },
    o(s) {
      p(n, s), (e = !1);
    },
    d(s) {
      n && n.d(s);
    },
  };
}
function st(t) {
  let e, l;
  const n = t[7].default,
    s = X(n, t, t[6], null);
  let a = [t[3], { class: t[2] }],
    r = {};
  for (let i = 0; i < a.length; i += 1) r = L(r, a[i]);
  return {
    c() {
      (e = E("label")), s && s.c(), this.h();
    },
    l(i) {
      e = D(i, "LABEL", { class: !0 });
      var o = N(e);
      s && s.l(o), o.forEach(_), this.h();
    },
    h() {
      ce(e, r);
    },
    m(i, o) {
      C(i, e, o), s && s.m(e, null), t[8](e), (l = !0);
    },
    p(i, o) {
      s &&
        s.p &&
        (!l || o & 64) &&
        H(s, n, i, i[6], l ? K(n, i[6], o, null) : J(i[6]), null),
        ce(e, (r = De(a, [o & 8 && i[3], (!l || o & 4) && { class: i[2] }])));
    },
    i(i) {
      l || (g(s, i), (l = !0));
    },
    o(i) {
      p(s, i), (l = !1);
    },
    d(i) {
      i && _(e), s && s.d(i), t[8](null);
    },
  };
}
function at(t) {
  let e, l, n, s;
  const a = [st, lt],
    r = [];
  function i(o, u) {
    return o[0] ? 0 : 1;
  }
  return (
    (e = i(t)),
    (l = r[e] = a[e](t)),
    {
      c() {
        l.c(), (n = j());
      },
      l(o) {
        l.l(o), (n = j());
      },
      m(o, u) {
        r[e].m(o, u), C(o, n, u), (s = !0);
      },
      p(o, [u]) {
        let f = e;
        (e = i(o)),
          e === f
            ? r[e].p(o, u)
            : (de(),
              p(r[f], 1, 1, () => {
                r[f] = null;
              }),
              _e(),
              (l = r[e]),
              l ? l.p(o, u) : ((l = r[e] = a[e](o)), l.c()),
              g(l, 1),
              l.m(n.parentNode, n));
      },
      i(o) {
        s || (g(l), (s = !0));
      },
      o(o) {
        p(l), (s = !1);
      },
      d(o) {
        o && _(n), r[e].d(o);
      },
    }
  );
}
function rt(t, e, l) {
  let n;
  const s = ["color", "defaultClass", "show"];
  let a = x(e, s),
    { $$slots: r = {}, $$scope: i } = e,
    { color: o = "gray" } = e,
    { defaultClass: u = "text-sm rtl:text-right font-medium block" } = e,
    { show: f = !0 } = e,
    h;
  const V = {
    gray: "text-gray-900 dark:text-gray-300",
    green: "text-green-700 dark:text-green-500",
    red: "text-red-700 dark:text-red-500",
    disabled: "text-gray-400 dark:text-gray-500",
  };
  function w(b) {
    Ce[b ? "unshift" : "push"](() => {
      (h = b), l(1, h);
    });
  }
  return (
    (t.$$set = (b) => {
      l(10, (e = L(L({}, e), ie(b)))),
        l(3, (a = x(e, s))),
        "color" in b && l(4, (o = b.color)),
        "defaultClass" in b && l(5, (u = b.defaultClass)),
        "show" in b && l(0, (f = b.show)),
        "$$scope" in b && l(6, (i = b.$$scope));
    }),
    (t.$$.update = () => {
      if (t.$$.dirty & 18) {
        const b = h == null ? void 0 : h.control;
        l(4, (o = b != null && b.disabled ? "disabled" : o));
      }
      l(2, (n = F(u, V[o], e.class)));
    }),
    (e = ie(e)),
    [f, h, n, a, o, u, i, r, w]
  );
}
class ze extends pe {
  constructor(e) {
    super(), be(this, e, rt, at, me, { color: 4, defaultClass: 5, show: 0 });
  }
}
const nt = (t) => ({}),
  Te = (t) => ({}),
  ot = (t) => ({ props: t[0] & 72 }),
  Be = (t) => ({ props: { ...t[6], class: t[3] } }),
  it = (t) => ({}),
  Me = (t) => ({});
function Re(t) {
  let e, l, n;
  const s = t[11].left,
    a = X(s, t, t[26], Me);
  return {
    c() {
      (e = E("div")), a && a.c(), this.h();
    },
    l(r) {
      e = D(r, "DIV", { class: !0 });
      var i = N(e);
      a && a.l(i), i.forEach(_), this.h();
    },
    h() {
      O(
        e,
        "class",
        (l = F(t[2], t[4].classLeft) + " start-0 ps-2.5 pointer-events-none"),
      );
    },
    m(r, i) {
      C(r, e, i), a && a.m(e, null), (n = !0);
    },
    p(r, i) {
      a &&
        a.p &&
        (!n || i[0] & 67108864) &&
        H(a, s, r, r[26], n ? K(s, r[26], i, it) : J(r[26]), Me),
        (!n ||
          (i[0] & 20 &&
            l !==
              (l =
                F(r[2], r[4].classLeft) +
                " start-0 ps-2.5 pointer-events-none"))) &&
          O(e, "class", l);
    },
    i(r) {
      n || (g(a, r), (n = !0));
    },
    o(r) {
      p(a, r), (n = !1);
    },
    d(r) {
      r && _(e), a && a.d(r);
    },
  };
}
function ft(t) {
  let e,
    l,
    n,
    s = [t[6], { type: t[1] }, { class: t[3] }],
    a = {};
  for (let r = 0; r < s.length; r += 1) a = L(a, s[r]);
  return {
    c() {
      (e = E("input")), this.h();
    },
    l(r) {
      (e = D(r, "INPUT", { class: !0 })), this.h();
    },
    h() {
      ce(e, a);
    },
    m(r, i) {
      C(r, e, i),
        e.autofocus && e.focus(),
        ye(e, t[0]),
        l ||
          ((n = [
            k(e, "input", t[25]),
            k(e, "blur", t[12]),
            k(e, "change", t[13]),
            k(e, "click", t[14]),
            k(e, "contextmenu", t[15]),
            k(e, "focus", t[16]),
            k(e, "keydown", t[17]),
            k(e, "keypress", t[18]),
            k(e, "keyup", t[19]),
            k(e, "mouseover", t[20]),
            k(e, "mouseenter", t[21]),
            k(e, "mouseleave", t[22]),
            k(e, "paste", t[23]),
            k(e, "input", t[24]),
          ]),
          (l = !0));
    },
    p(r, i) {
      ce(
        e,
        (a = De(s, [
          i[0] & 64 && r[6],
          i[0] & 2 && { type: r[1] },
          i[0] & 8 && { class: r[3] },
        ])),
      ),
        i[0] & 1 && e.value !== r[0] && ye(e, r[0]);
    },
    d(r) {
      r && _(e), (l = !1), He(n);
    },
  };
}
function qe(t) {
  let e, l, n;
  const s = t[11].right,
    a = X(s, t, t[26], Te);
  return {
    c() {
      (e = E("div")), a && a.c(), this.h();
    },
    l(r) {
      e = D(r, "DIV", { class: !0 });
      var i = N(e);
      a && a.l(i), i.forEach(_), this.h();
    },
    h() {
      O(e, "class", (l = F(t[2], t[4].classRight) + " end-0 pe-2.5"));
    },
    m(r, i) {
      C(r, e, i), a && a.m(e, null), (n = !0);
    },
    p(r, i) {
      a &&
        a.p &&
        (!n || i[0] & 67108864) &&
        H(a, s, r, r[26], n ? K(s, r[26], i, nt) : J(r[26]), Te),
        (!n ||
          (i[0] & 20 &&
            l !== (l = F(r[2], r[4].classRight) + " end-0 pe-2.5"))) &&
          O(e, "class", l);
    },
    i(r) {
      n || (g(a, r), (n = !0));
    },
    o(r) {
      p(a, r), (n = !1);
    },
    d(r) {
      r && _(e), a && a.d(r);
    },
  };
}
function ut(t) {
  let e,
    l,
    n,
    s,
    a = t[5].left && Re(t);
  const r = t[11].default,
    i = X(r, t, t[26], Be),
    o = i || ft(t);
  let u = t[5].right && qe(t);
  return {
    c() {
      a && a.c(), (e = T()), o && o.c(), (l = T()), u && u.c(), (n = j());
    },
    l(f) {
      a && a.l(f), (e = B(f)), o && o.l(f), (l = B(f)), u && u.l(f), (n = j());
    },
    m(f, h) {
      a && a.m(f, h),
        C(f, e, h),
        o && o.m(f, h),
        C(f, l, h),
        u && u.m(f, h),
        C(f, n, h),
        (s = !0);
    },
    p(f, h) {
      f[5].left
        ? a
          ? (a.p(f, h), h[0] & 32 && g(a, 1))
          : ((a = Re(f)), a.c(), g(a, 1), a.m(e.parentNode, e))
        : a &&
          (de(),
          p(a, 1, 1, () => {
            a = null;
          }),
          _e()),
        i
          ? i.p &&
            (!s || h[0] & 67108936) &&
            H(i, r, f, f[26], s ? K(r, f[26], h, ot) : J(f[26]), Be)
          : o && o.p && (!s || h[0] & 75) && o.p(f, s ? h : [-1, -1]),
        f[5].right
          ? u
            ? (u.p(f, h), h[0] & 32 && g(u, 1))
            : ((u = qe(f)), u.c(), g(u, 1), u.m(n.parentNode, n))
          : u &&
            (de(),
            p(u, 1, 1, () => {
              u = null;
            }),
            _e());
    },
    i(f) {
      s || (g(a), g(o, f), g(u), (s = !0));
    },
    o(f) {
      p(a), p(o, f), p(u), (s = !1);
    },
    d(f) {
      f && (_(e), _(l), _(n)), a && a.d(f), o && o.d(f), u && u.d(f);
    },
  };
}
function ct(t) {
  let e, l;
  return (
    (e = new Se({
      props: {
        class: "relative w-full",
        show: t[5].left || t[5].right,
        $$slots: { default: [ut] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        M(e.$$.fragment);
      },
      l(n) {
        R(e.$$.fragment, n);
      },
      m(n, s) {
        q(e, n, s), (l = !0);
      },
      p(n, s) {
        const a = {};
        s[0] & 32 && (a.show = n[5].left || n[5].right),
          s[0] & 67108991 && (a.$$scope = { dirty: s, ctx: n }),
          e.$set(a);
      },
      i(n) {
        l || (g(e.$$.fragment, n), (l = !0));
      },
      o(n) {
        p(e.$$.fragment, n), (l = !1);
      },
      d(n) {
        U(e, n);
      },
    }
  );
}
function dt(t) {
  return t && t === "xs" ? "sm" : t === "xl" ? "lg" : t;
}
function _t(t, e, l) {
  let n;
  const s = ["type", "value", "size", "defaultClass", "color", "floatClass"];
  let a = x(e, s),
    { $$slots: r = {}, $$scope: i } = e;
  const o = Xe(r);
  let { type: u = "text" } = e,
    { value: f = void 0 } = e,
    { size: h = void 0 } = e,
    {
      defaultClass:
        V = "block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right",
    } = e,
    { color: w = "base" } = e,
    {
      floatClass:
        b = "flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400",
    } = e;
  const Q = {
      base: "border-gray-300 dark:border-gray-600",
      tinted: "border-gray-300 dark:border-gray-500",
      green: "border-green-500 dark:border-green-400",
      red: "border-red-500 dark:border-red-400",
    },
    z = {
      base: "focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500",
      green:
        "focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 dark:focus:ring-green-500",
      red: "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500",
    },
    Y = {
      base: "bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400",
      tinted:
        "bg-gray-50 text-gray-900 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400",
      green:
        "bg-green-50 text-green-900 placeholder-green-700 dark:text-green-400 dark:placeholder-green-500 dark:bg-gray-700",
      red: "bg-red-50 text-red-900 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:bg-gray-700",
    };
  let ee = Pe("background"),
    I = Pe("group");
  const S = { sm: "sm:text-xs", md: "text-sm", lg: "sm:text-base" },
    te = { sm: "ps-9", md: "ps-10", lg: "ps-11" },
    P = { sm: "pe-9", md: "pe-10", lg: "pe-11" },
    le = { sm: "p-2", md: "p-2.5", lg: "p-3" };
  let Z;
  function G(c) {
    v.call(this, t, c);
  }
  function A(c) {
    v.call(this, t, c);
  }
  function $(c) {
    v.call(this, t, c);
  }
  function se(c) {
    v.call(this, t, c);
  }
  function fe(c) {
    v.call(this, t, c);
  }
  function ge(c) {
    v.call(this, t, c);
  }
  function ue(c) {
    v.call(this, t, c);
  }
  function d(c) {
    v.call(this, t, c);
  }
  function ke(c) {
    v.call(this, t, c);
  }
  function Ie(c) {
    v.call(this, t, c);
  }
  function ve(c) {
    v.call(this, t, c);
  }
  function m(c) {
    v.call(this, t, c);
  }
  function y(c) {
    v.call(this, t, c);
  }
  function ae() {
    (f = this.value), l(0, f);
  }
  return (
    (t.$$set = (c) => {
      l(4, (e = L(L({}, e), ie(c)))),
        l(6, (a = x(e, s))),
        "type" in c && l(1, (u = c.type)),
        "value" in c && l(0, (f = c.value)),
        "size" in c && l(7, (h = c.size)),
        "defaultClass" in c && l(8, (V = c.defaultClass)),
        "color" in c && l(9, (w = c.color)),
        "floatClass" in c && l(2, (b = c.floatClass)),
        "$$scope" in c && l(26, (i = c.$$scope));
    }),
    (t.$$.update = () => {
      t.$$.dirty[0] & 128 &&
        l(10, (n = h || dt(I == null ? void 0 : I.size) || "md"));
      {
        const c = w === "base" && ee ? "tinted" : w;
        l(
          3,
          (Z = F([
            V,
            le[n],
            (o.left && te[n]) || (o.right && P[n]),
            z[w],
            Y[c],
            Q[c],
            S[n],
            I || "rounded-lg",
            I && "first:rounded-s-lg last:rounded-e-lg",
            I && "border-s-0 first:border-s last:border-e",
            e.class,
          ])),
        );
      }
    }),
    (e = ie(e)),
    [
      f,
      u,
      b,
      Z,
      e,
      o,
      a,
      h,
      V,
      w,
      n,
      r,
      G,
      A,
      $,
      se,
      fe,
      ge,
      ue,
      d,
      ke,
      Ie,
      ve,
      m,
      y,
      ae,
      i,
    ]
  );
}
class Ue extends pe {
  constructor(e) {
    super(),
      be(
        this,
        e,
        _t,
        ct,
        me,
        {
          type: 1,
          value: 0,
          size: 7,
          defaultClass: 8,
          color: 9,
          floatClass: 2,
        },
        null,
        [-1, -1],
      );
  }
}
const mt = (t) => ({}),
  Fe = (t) => ({}),
  gt = (t) => ({}),
  Oe = (t) => ({});
function je(t) {
  let e, l;
  const n = t[11].header,
    s = X(n, t, t[26], Oe);
  return {
    c() {
      (e = E("div")), s && s.c(), this.h();
    },
    l(a) {
      e = D(a, "DIV", { class: !0 });
      var r = N(e);
      s && s.l(r), r.forEach(_), this.h();
    },
    h() {
      O(e, "class", t[5](!0));
    },
    m(a, r) {
      C(a, e, r), s && s.m(e, null), (l = !0);
    },
    p(a, r) {
      s &&
        s.p &&
        (!l || r & 67108864) &&
        H(s, n, a, a[26], l ? K(n, a[26], r, gt) : J(a[26]), Oe);
    },
    i(a) {
      l || (g(s, a), (l = !0));
    },
    o(a) {
      p(s, a), (l = !1);
    },
    d(a) {
      a && _(e), s && s.d(a);
    },
  };
}
function ht(t) {
  let e,
    l,
    n,
    s = [t[7], { class: t[3] }],
    a = {};
  for (let r = 0; r < s.length; r += 1) a = L(a, s[r]);
  return {
    c() {
      (e = E("textarea")), this.h();
    },
    l(r) {
      (e = D(r, "TEXTAREA", { class: !0 })), N(e).forEach(_), this.h();
    },
    h() {
      ce(e, a);
    },
    m(r, i) {
      C(r, e, i),
        e.autofocus && e.focus(),
        ye(e, t[0]),
        l ||
          ((n = [
            k(e, "input", t[25]),
            k(e, "blur", t[12]),
            k(e, "change", t[13]),
            k(e, "click", t[14]),
            k(e, "contextmenu", t[15]),
            k(e, "focus", t[16]),
            k(e, "input", t[17]),
            k(e, "keydown", t[18]),
            k(e, "keypress", t[19]),
            k(e, "keyup", t[20]),
            k(e, "mouseenter", t[21]),
            k(e, "mouseleave", t[22]),
            k(e, "mouseover", t[23]),
            k(e, "paste", t[24]),
          ]),
          (l = !0));
    },
    p(r, i) {
      ce(e, (a = De(s, [i & 128 && r[7], i & 8 && { class: r[3] }]))),
        i & 1 && ye(e, r[0]);
    },
    d(r) {
      r && _(e), (l = !1), He(n);
    },
  };
}
function Ge(t) {
  let e, l;
  const n = t[11].footer,
    s = X(n, t, t[26], Fe);
  return {
    c() {
      (e = E("div")), s && s.c(), this.h();
    },
    l(a) {
      e = D(a, "DIV", { class: !0 });
      var r = N(e);
      s && s.l(r), r.forEach(_), this.h();
    },
    h() {
      O(e, "class", t[5](!1));
    },
    m(a, r) {
      C(a, e, r), s && s.m(e, null), (l = !0);
    },
    p(a, r) {
      s &&
        s.p &&
        (!l || r & 67108864) &&
        H(s, n, a, a[26], l ? K(n, a[26], r, mt) : J(a[26]), Fe);
    },
    i(a) {
      l || (g(s, a), (l = !0));
    },
    o(a) {
      p(s, a), (l = !1);
    },
    d(a) {
      a && _(e), s && s.d(a);
    },
  };
}
function pt(t) {
  let e,
    l,
    n,
    s,
    a,
    r = t[6].header && je(t);
  l = new Se({
    props: {
      show: t[1],
      class: t[4],
      $$slots: { default: [ht] },
      $$scope: { ctx: t },
    },
  });
  let i = t[6].footer && Ge(t);
  return {
    c() {
      r && r.c(), (e = T()), M(l.$$.fragment), (n = T()), i && i.c(), (s = j());
    },
    l(o) {
      r && r.l(o),
        (e = B(o)),
        R(l.$$.fragment, o),
        (n = B(o)),
        i && i.l(o),
        (s = j());
    },
    m(o, u) {
      r && r.m(o, u),
        C(o, e, u),
        q(l, o, u),
        C(o, n, u),
        i && i.m(o, u),
        C(o, s, u),
        (a = !0);
    },
    p(o, u) {
      o[6].header
        ? r
          ? (r.p(o, u), u & 64 && g(r, 1))
          : ((r = je(o)), r.c(), g(r, 1), r.m(e.parentNode, e))
        : r &&
          (de(),
          p(r, 1, 1, () => {
            r = null;
          }),
          _e());
      const f = {};
      u & 2 && (f.show = o[1]),
        u & 16 && (f.class = o[4]),
        u & 67109001 && (f.$$scope = { dirty: u, ctx: o }),
        l.$set(f),
        o[6].footer
          ? i
            ? (i.p(o, u), u & 64 && g(i, 1))
            : ((i = Ge(o)), i.c(), g(i, 1), i.m(s.parentNode, s))
          : i &&
            (de(),
            p(i, 1, 1, () => {
              i = null;
            }),
            _e());
    },
    i(o) {
      a || (g(r), g(l.$$.fragment, o), g(i), (a = !0));
    },
    o(o) {
      p(r), p(l.$$.fragment, o), p(i), (a = !1);
    },
    d(o) {
      o && (_(e), _(n), _(s)), r && r.d(o), U(l, o), i && i.d(o);
    },
  };
}
function bt(t) {
  let e, l;
  return (
    (e = new Se({
      props: {
        show: t[1],
        class: t[2],
        $$slots: { default: [pt] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        M(e.$$.fragment);
      },
      l(n) {
        R(e.$$.fragment, n);
      },
      m(n, s) {
        q(e, n, s), (l = !0);
      },
      p(n, [s]) {
        const a = {};
        s & 2 && (a.show = n[1]),
          s & 4 && (a.class = n[2]),
          s & 67109083 && (a.$$scope = { dirty: s, ctx: n }),
          e.$set(a);
      },
      i(n) {
        l || (g(e.$$.fragment, n), (l = !0));
      },
      o(n) {
        p(e.$$.fragment, n), (l = !1);
      },
      d(n) {
        U(e, n);
      },
    }
  );
}
function kt(t, e, l) {
  const n = ["value", "wrappedClass", "unWrappedClass", "innerWrappedClass"];
  let s = x(e, n),
    { $$slots: a = {}, $$scope: r } = e;
  const i = Xe(a),
    o = Pe("background");
  let { value: u = void 0 } = e,
    {
      wrappedClass:
        f = "block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-none focus:ring-0",
    } = e,
    {
      unWrappedClass:
        h = "p-2.5 text-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500",
    } = e,
    { innerWrappedClass: V = "py-2 px-4 bg-white dark:bg-gray-800" } = e,
    w,
    b,
    Q;
  const z = (d) =>
    F(
      d ? "border-b" : "border-t",
      "py-2 px-3 border-gray-200 dark:border-gray-600",
    );
  let Y;
  function ee(d) {
    v.call(this, t, d);
  }
  function I(d) {
    v.call(this, t, d);
  }
  function S(d) {
    v.call(this, t, d);
  }
  function te(d) {
    v.call(this, t, d);
  }
  function P(d) {
    v.call(this, t, d);
  }
  function le(d) {
    v.call(this, t, d);
  }
  function Z(d) {
    v.call(this, t, d);
  }
  function G(d) {
    v.call(this, t, d);
  }
  function A(d) {
    v.call(this, t, d);
  }
  function $(d) {
    v.call(this, t, d);
  }
  function se(d) {
    v.call(this, t, d);
  }
  function fe(d) {
    v.call(this, t, d);
  }
  function ge(d) {
    v.call(this, t, d);
  }
  function ue() {
    (u = this.value), l(0, u);
  }
  return (
    (t.$$set = (d) => {
      l(28, (e = L(L({}, e), ie(d)))),
        l(7, (s = x(e, n))),
        "value" in d && l(0, (u = d.value)),
        "wrappedClass" in d && l(8, (f = d.wrappedClass)),
        "unWrappedClass" in d && l(9, (h = d.unWrappedClass)),
        "innerWrappedClass" in d && l(10, (V = d.innerWrappedClass)),
        "$$scope" in d && l(26, (r = d.$$scope));
    }),
    (t.$$.update = () => {
      l(
        2,
        (b = F(
          "w-full rounded-lg",
          o ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700",
          "text-gray-900 dark:placeholder-gray-400 dark:text-white ",
          "border border-gray-200 dark:border-gray-600",
          e.class,
        )),
      ),
        t.$$.dirty & 774 && l(3, (Q = w ? f : F(b, h))),
        t.$$.dirty & 1024 &&
          l(
            4,
            (Y = F(
              V,
              i.footer ? "" : "rounded-b-lg",
              i.header ? "" : "rounded-t-lg",
            )),
          );
    }),
    l(1, (w = i.header || i.footer)),
    (e = ie(e)),
    [
      u,
      w,
      b,
      Q,
      Y,
      z,
      i,
      s,
      f,
      h,
      V,
      a,
      ee,
      I,
      S,
      te,
      P,
      le,
      Z,
      G,
      A,
      $,
      se,
      fe,
      ge,
      ue,
      r,
    ]
  );
}
class vt extends pe {
  constructor(e) {
    super(),
      be(this, e, kt, bt, me, {
        value: 0,
        wrappedClass: 8,
        unWrappedClass: 9,
        innerWrappedClass: 10,
      });
  }
}
function Ct(t) {
  let e;
  return {
    c() {
      e = we("Name");
    },
    l(l) {
      e = Ee(l, "Name");
    },
    m(l, n) {
      C(l, e, n);
    },
    d(l) {
      l && _(e);
    },
  };
}
function yt(t) {
  let e;
  return {
    c() {
      e = we("Email (optional)");
    },
    l(l) {
      e = Ee(l, "Email (optional)");
    },
    m(l, n) {
      C(l, e, n);
    },
    d(l) {
      l && _(e);
    },
  };
}
function wt(t) {
  let e;
  return {
    c() {
      e = we("Message");
    },
    l(l) {
      e = Ee(l, "Message");
    },
    m(l, n) {
      C(l, e, n);
    },
    d(l) {
      l && _(e);
    },
  };
}
function Et(t) {
  let e;
  return {
    c() {
      e = we("Send");
    },
    l(l) {
      e = Ee(l, "Send");
    },
    m(l, n) {
      C(l, e, n);
    },
    d(l) {
      l && _(e);
    },
  };
}
function Dt(t) {
  let e,
    l,
    n = "Contact me",
    s,
    a,
    r,
    i,
    o,
    u,
    f,
    h,
    V,
    w,
    b,
    Q,
    z,
    Y,
    ee,
    I,
    S,
    te,
    P,
    le,
    Z,
    G,
    A,
    $,
    se,
    fe;
  o = new ze({
    props: { for: "name", $$slots: { default: [Ct] }, $$scope: { ctx: t } },
  });
  function ge(m) {
    t[4](m);
  }
  let ue = { type: "text", id: "name", name: "name", required: !0 };
  t[0] !== void 0 && (ue.value = t[0]),
    (f = new Ue({ props: ue })),
    Ce.push(() => We(f, "value", ge)),
    (b = new ze({
      props: { for: "email", $$slots: { default: [yt] }, $$scope: { ctx: t } },
    }));
  function d(m) {
    t[5](m);
  }
  let ke = { type: "email", id: "email", name: "email" };
  t[1] !== void 0 && (ke.value = t[1]),
    (z = new Ue({ props: ke })),
    Ce.push(() => We(z, "value", d)),
    (S = new ze({
      props: {
        for: "message",
        $$slots: { default: [wt] },
        $$scope: { ctx: t },
      },
    }));
  function Ie(m) {
    t[6](m);
  }
  let ve = {
    id: "message",
    name: "message",
    class: "bg-gray-50",
    required: !0,
  };
  return (
    t[2] !== void 0 && (ve.value = t[2]),
    (P = new vt({ props: ve })),
    Ce.push(() => We(P, "value", Ie)),
    (A = new Ye({
      props: {
        type: "submit",
        class: "w-48",
        $$slots: { default: [Et] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        (e = E("div")),
          (l = E("span")),
          (l.textContent = n),
          (s = T()),
          (a = E("form")),
          (r = E("div")),
          (i = E("div")),
          M(o.$$.fragment),
          (u = T()),
          M(f.$$.fragment),
          (V = T()),
          (w = E("div")),
          M(b.$$.fragment),
          (Q = T()),
          M(z.$$.fragment),
          (ee = T()),
          (I = E("div")),
          M(S.$$.fragment),
          (te = T()),
          M(P.$$.fragment),
          (Z = T()),
          (G = E("div")),
          M(A.$$.fragment),
          this.h();
      },
      l(m) {
        e = D(m, "DIV", { class: !0 });
        var y = N(e);
        (l = D(y, "SPAN", { class: !0, "data-svelte-h": !0 })),
          Ke(l) !== "svelte-hk2y0w" && (l.textContent = n),
          (s = B(y)),
          (a = D(y, "FORM", {}));
        var ae = N(a);
        r = D(ae, "DIV", { class: !0 });
        var c = N(r);
        i = D(c, "DIV", {});
        var re = N(i);
        R(o.$$.fragment, re),
          (u = B(re)),
          R(f.$$.fragment, re),
          re.forEach(_),
          (V = B(c)),
          (w = D(c, "DIV", {}));
        var ne = N(w);
        R(b.$$.fragment, ne),
          (Q = B(ne)),
          R(z.$$.fragment, ne),
          ne.forEach(_),
          (ee = B(c)),
          (I = D(c, "DIV", {}));
        var oe = N(I);
        R(S.$$.fragment, oe),
          (te = B(oe)),
          R(P.$$.fragment, oe),
          oe.forEach(_),
          (Z = B(c)),
          (G = D(c, "DIV", {}));
        var he = N(G);
        R(A.$$.fragment, he),
          he.forEach(_),
          c.forEach(_),
          ae.forEach(_),
          y.forEach(_),
          this.h();
      },
      h() {
        O(l, "class", "text-4xl font-bold"),
          O(r, "class", "flex flex-col space-y-4"),
          O(e, "class", "flex flex-col space-y-4");
      },
      m(m, y) {
        C(m, e, y),
          W(e, l),
          W(e, s),
          W(e, a),
          W(a, r),
          W(r, i),
          q(o, i, null),
          W(i, u),
          q(f, i, null),
          W(r, V),
          W(r, w),
          q(b, w, null),
          W(w, Q),
          q(z, w, null),
          W(r, ee),
          W(r, I),
          q(S, I, null),
          W(I, te),
          q(P, I, null),
          W(r, Z),
          W(r, G),
          q(A, G, null),
          ($ = !0),
          se || ((fe = k(a, "submit", t[3])), (se = !0));
      },
      p(m, y) {
        const ae = {};
        y & 128 && (ae.$$scope = { dirty: y, ctx: m }), o.$set(ae);
        const c = {};
        !h && y & 1 && ((h = !0), (c.value = m[0]), Ne(() => (h = !1))),
          f.$set(c);
        const re = {};
        y & 128 && (re.$$scope = { dirty: y, ctx: m }), b.$set(re);
        const ne = {};
        !Y && y & 2 && ((Y = !0), (ne.value = m[1]), Ne(() => (Y = !1))),
          z.$set(ne);
        const oe = {};
        y & 128 && (oe.$$scope = { dirty: y, ctx: m }), S.$set(oe);
        const he = {};
        !le && y & 4 && ((le = !0), (he.value = m[2]), Ne(() => (le = !1))),
          P.$set(he);
        const Ae = {};
        y & 128 && (Ae.$$scope = { dirty: y, ctx: m }), A.$set(Ae);
      },
      i(m) {
        $ ||
          (g(o.$$.fragment, m),
          g(f.$$.fragment, m),
          g(b.$$.fragment, m),
          g(z.$$.fragment, m),
          g(S.$$.fragment, m),
          g(P.$$.fragment, m),
          g(A.$$.fragment, m),
          ($ = !0));
      },
      o(m) {
        p(o.$$.fragment, m),
          p(f.$$.fragment, m),
          p(b.$$.fragment, m),
          p(z.$$.fragment, m),
          p(S.$$.fragment, m),
          p(P.$$.fragment, m),
          p(A.$$.fragment, m),
          ($ = !1);
      },
      d(m) {
        m && _(e), U(o), U(f), U(b), U(z), U(S), U(P), U(A), (se = !1), fe();
      },
    }
  );
}
function It(t) {
  let e, l, n;
  return (
    (l = new Ze({
      props: {
        class: "w-full max-w-full h-full bg-white/50",
        $$slots: { default: [Dt] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        (e = E("div")), M(l.$$.fragment), this.h();
      },
      l(s) {
        e = D(s, "DIV", { class: !0 });
        var a = N(e);
        R(l.$$.fragment, a), a.forEach(_), this.h();
      },
      h() {
        O(e, "class", "box-border p-8 w-full h-full");
      },
      m(s, a) {
        C(s, e, a), q(l, e, null), (n = !0);
      },
      p(s, [a]) {
        const r = {};
        a & 135 && (r.$$scope = { dirty: a, ctx: s }), l.$set(r);
      },
      i(s) {
        n || (g(l.$$.fragment, s), (n = !0));
      },
      o(s) {
        p(l.$$.fragment, s), (n = !1);
      },
      d(s) {
        s && _(e), U(l);
      },
    }
  );
}
function Nt(t, e, l) {
  let n = "",
    s = "",
    a = "";
  async function r(f) {
    if ((console.log("submit"), f.preventDefault(), !n.length || !a.length))
      return;
    const h = { name: n, email: s, message: a };
    Qe.collection("messages").create(h);
  }
  function i(f) {
    (n = f), l(0, n);
  }
  function o(f) {
    (s = f), l(1, s);
  }
  function u(f) {
    (a = f), l(2, a);
  }
  return [n, s, a, r, i, o, u];
}
class Lt extends pe {
  constructor(e) {
    super(), be(this, e, Nt, It, me, {});
  }
}
export { Lt as component };
