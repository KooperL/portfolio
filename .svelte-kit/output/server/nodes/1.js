export const index = 1;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import("../entries/fallbacks/error.svelte.js"))
    .default);
export const imports = [
  "_app/immutable/nodes/1.LAEHmXQi.js",
  "_app/immutable/chunks/scheduler.gY_bz6RS.js",
  "_app/immutable/chunks/index.1Dz5KRer.js",
  "_app/immutable/chunks/entry.6kHzac2I.js",
  "_app/immutable/chunks/index.f12sfW-N.js",
];
export const stylesheets = [];
export const fonts = [];
