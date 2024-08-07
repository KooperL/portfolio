import {
  s as R,
  m as f,
  p as L,
  q as b,
  a as w,
  d,
  b as u,
  r as j,
  i as T,
  j as V,
  u as l,
  n as z,
  v as D,
  w as W,
  x as F,
  y as A,
  z as n,
} from "./scheduler.gY_bz6RS.js";
import { t as B, g as G } from "./Frame.osOJd-OA.js";
import { S as I, i as J } from "./index.1Dz5KRer.js";
function K(s) {
  let e,
    a,
    h,
    k,
    r,
    m = [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      s[7],
      { class: (h = B("shrink-0", s[6][s[0]], s[8].class)) },
      { role: s[1] },
      { "aria-label": s[5] },
      { viewBox: "0 0 16 16" },
    ],
    c = {};
  for (let i = 0; i < m.length; i += 1) c = f(c, m[i]);
  return {
    c() {
      (e = L("svg")), (a = L("path")), this.h();
    },
    l(i) {
      e = b(i, "svg", {
        xmlns: !0,
        fill: !0,
        class: !0,
        role: !0,
        "aria-label": !0,
        viewBox: !0,
      });
      var o = w(e);
      (a = b(o, "path", {
        stroke: !0,
        "stroke-linecap": !0,
        "stroke-linejoin": !0,
        "stroke-width": !0,
        d: !0,
      })),
        w(a).forEach(d),
        o.forEach(d),
        this.h();
    },
    h() {
      u(a, "stroke", "currentColor"),
        u(a, "stroke-linecap", s[2]),
        u(a, "stroke-linejoin", s[3]),
        u(a, "stroke-width", s[4]),
        u(
          a,
          "d",
          "M4 7.64h11m0 0-4-3.79m4 3.79-4 3.791m-5 2.844H3c-.53 0-1.04-.2-1.414-.556A1.846 1.846 0 0 1 1 12.38V2.902c0-.503.21-.985.586-1.34A2.057 2.057 0 0 1 3 1.007h3",
        ),
        j(e, c);
    },
    m(i, o) {
      T(i, e, o),
        V(e, a),
        k ||
          ((r = [
            l(e, "click", s[9]),
            l(e, "keydown", s[10]),
            l(e, "keyup", s[11]),
            l(e, "focus", s[12]),
            l(e, "blur", s[13]),
            l(e, "mouseenter", s[14]),
            l(e, "mouseleave", s[15]),
            l(e, "mouseover", s[16]),
            l(e, "mouseout", s[17]),
          ]),
          (k = !0));
    },
    p(i, [o]) {
      o & 4 && u(a, "stroke-linecap", i[2]),
        o & 8 && u(a, "stroke-linejoin", i[3]),
        o & 16 && u(a, "stroke-width", i[4]),
        j(
          e,
          (c = G(m, [
            { xmlns: "http://www.w3.org/2000/svg" },
            { fill: "none" },
            o & 128 && i[7],
            o & 257 &&
              h !== (h = B("shrink-0", i[6][i[0]], i[8].class)) && { class: h },
            o & 2 && { role: i[1] },
            o & 32 && { "aria-label": i[5] },
            { viewBox: "0 0 16 16" },
          ])),
        );
    },
    i: z,
    o: z,
    d(i) {
      i && d(e), (k = !1), D(r);
    },
  };
}
function N(s, e, a) {
  const h = [
    "size",
    "role",
    "strokeLinecap",
    "strokeLinejoin",
    "strokeWidth",
    "ariaLabel",
  ];
  let k = W(e, h);
  const r = F("iconCtx") ?? {},
    m = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
    };
  let { size: c = r.size || "md" } = e,
    { role: i = r.role || "img" } = e,
    { strokeLinecap: o = r.strokeLinecap || "round" } = e,
    { strokeLinejoin: g = r.strokeLinejoin || "round" } = e,
    { strokeWidth: _ = r.strokeWidth || "2" } = e,
    { ariaLabel: v = "arrow right to bracket outline" } = e;
  function C(t) {
    n.call(this, s, t);
  }
  function q(t) {
    n.call(this, s, t);
  }
  function E(t) {
    n.call(this, s, t);
  }
  function M(t) {
    n.call(this, s, t);
  }
  function S(t) {
    n.call(this, s, t);
  }
  function y(t) {
    n.call(this, s, t);
  }
  function H(t) {
    n.call(this, s, t);
  }
  function O(t) {
    n.call(this, s, t);
  }
  function P(t) {
    n.call(this, s, t);
  }
  return (
    (s.$$set = (t) => {
      a(8, (e = f(f({}, e), A(t)))),
        a(7, (k = W(e, h))),
        "size" in t && a(0, (c = t.size)),
        "role" in t && a(1, (i = t.role)),
        "strokeLinecap" in t && a(2, (o = t.strokeLinecap)),
        "strokeLinejoin" in t && a(3, (g = t.strokeLinejoin)),
        "strokeWidth" in t && a(4, (_ = t.strokeWidth)),
        "ariaLabel" in t && a(5, (v = t.ariaLabel));
    }),
    (e = A(e)),
    [c, i, o, g, _, v, m, k, e, C, q, E, M, S, y, H, O, P]
  );
}
class Y extends I {
  constructor(e) {
    super(),
      J(this, e, N, K, R, {
        size: 0,
        role: 1,
        strokeLinecap: 2,
        strokeLinejoin: 3,
        strokeWidth: 4,
        ariaLabel: 5,
      });
  }
}
export { Y as A };
