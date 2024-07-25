export const manifest = (() => {
  function __memo(fn) {
    let value;
    return () => (value ??= value = fn());
  }

  return {
    appDir: "_app",
    appPath: "sveltekit-github-pages/_app",
    assets: new Set([".DS_Store", "favicon.ico", "svgviewer-output.svg"]),
    mimeTypes: { ".svg": "image/svg+xml" },
    _: {
      client: {
        start: "_app/immutable/entry/start.HeHXXYvA.js",
        app: "_app/immutable/entry/app.A-vR_ZK-.js",
        imports: [
          "_app/immutable/entry/start.HeHXXYvA.js",
          "_app/immutable/chunks/entry.6kHzac2I.js",
          "_app/immutable/chunks/scheduler.gY_bz6RS.js",
          "_app/immutable/chunks/index.f12sfW-N.js",
          "_app/immutable/entry/app.A-vR_ZK-.js",
          "_app/immutable/chunks/scheduler.gY_bz6RS.js",
          "_app/immutable/chunks/index.1Dz5KRer.js",
        ],
        stylesheets: [],
        fonts: [],
        uses_env_dynamic_public: false,
      },
      nodes: [
        __memo(() => import("./nodes/0.js")),
        __memo(() => import("./nodes/1.js")),
        __memo(() => import("./nodes/2.js")),
        __memo(() => import("./nodes/3.js")),
        __memo(() => import("./nodes/4.js")),
        __memo(() => import("./nodes/5.js")),
        __memo(() => import("./nodes/6.js")),
        __memo(() => import("./nodes/7.js")),
        __memo(() => import("./nodes/8.js")),
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null,
        },
        {
          id: "/about",
          pattern: /^\/about\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null,
        },
        {
          id: "/contact",
          pattern: /^\/contact\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 4 },
          endpoint: null,
        },
        {
          id: "/projects",
          pattern: /^\/projects\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 5 },
          endpoint: null,
        },
        {
          id: "/projects/bingoApp",
          pattern: /^\/projects\/bingoApp\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 6 },
          endpoint: null,
        },
        {
          id: "/projects/pento",
          pattern: /^\/projects\/pento\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 7 },
          endpoint: null,
        },
        {
          id: "/projects/vybs",
          pattern: /^\/projects\/vybs\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 8 },
          endpoint: null,
        },
      ],
      matchers: async () => {
        return {};
      },
      server_assets: {},
    },
  };
})();
