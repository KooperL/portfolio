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
      ],
      routes: [],
      matchers: async () => {
        return {};
      },
      server_assets: {},
    },
  };
})();
