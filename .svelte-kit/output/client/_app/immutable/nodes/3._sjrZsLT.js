import {
  s as f,
  e as i,
  c as d,
  a as h,
  d as r,
  b as c,
  i as m,
  g as p,
  l as u,
  n as b,
} from "../chunks/scheduler.gY_bz6RS.js"
import {
  S as w,
  i as g,
  c as v,
  a as _,
  m as y,
  t as $,
  b as I,
  d as x,
} from "../chunks/index.1Dz5KRer.js"
import { C as k } from "../chunks/Card.vyHOi96P.js"
function C(n) {
  let e,
    a =
      '<span class="text-4xl font-bold">About me</span> <div><span class="font-bold">I&#39;m Kooper. We might have met already but I can&#39;t remember - I didn&#39;t want to annoy you with cookies.</span> <span class="md:block font-bold">I&#39;m a software developer and I like to make things. I wear the hat of web developer most often but I&#39;ve also dabbled in other areas of software development.</span></div> <div><span class="md:block font-bold">Continuous growth is important to me and I&#39;m always looking for new things to learn. From new frameworks and different programming languages, to biology and physiology.</span> <span class="md:block font-bold">There&#39;s a reason why I&#39;m a fan of the web. I get inspired by other websites who try to be different and love that anyone can contribute their ideas to the internet via weird websites, awesome toolkits/libraries and open source.</span></div>'
  return {
    c() {
      ;(e = i("div")), (e.innerHTML = a), this.h()
    },
    l(o) {
      ;(e = d(o, "DIV", { class: !0, style: !0, "data-svelte-h": !0 })),
        p(e) !== "svelte-7570lo" && (e.innerHTML = a),
        this.h()
    },
    h() {
      c(e, "class", "flex flex-col space-y-4 overflow-scroll"),
        u(e, "scrollbar-width", "none")
    },
    m(o, t) {
      m(o, e, t)
    },
    p: b,
    d(o) {
      o && r(e)
    },
  }
}
function T(n) {
  let e, a, o
  return (
    (a = new k({
      props: {
        class: "w-full max-w-full h-full bg-white/50",
        $$slots: { default: [C] },
        $$scope: { ctx: n },
      },
    })),
    {
      c() {
        ;(e = i("div")), v(a.$$.fragment), this.h()
      },
      l(t) {
        e = d(t, "DIV", { class: !0 })
        var s = h(e)
        _(a.$$.fragment, s), s.forEach(r), this.h()
      },
      h() {
        c(e, "class", "box-border p-8 w-full h-full")
      },
      m(t, s) {
        m(t, e, s), y(a, e, null), (o = !0)
      },
      p(t, [s]) {
        const l = {}
        s & 1 && (l.$$scope = { dirty: s, ctx: t }), a.$set(l)
      },
      i(t) {
        o || ($(a.$$.fragment, t), (o = !0))
      },
      o(t) {
        I(a.$$.fragment, t), (o = !1)
      },
      d(t) {
        t && r(e), x(a)
      },
    }
  )
}
class M extends w {
  constructor(e) {
    super(), g(this, e, null, T, f, {})
  }
}
export { M as component }
