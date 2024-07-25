export const index = 3;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import("../entries/pages/about/_page.svelte.js"))
    .default);
export const imports = [
  "_app/immutable/nodes/3._sjrZsLT.js",
  "_app/immutable/chunks/scheduler.gY_bz6RS.js",
  "_app/immutable/chunks/index.1Dz5KRer.js",
  "_app/immutable/chunks/Card.vyHOi96P.js",
  "_app/immutable/chunks/Frame.osOJd-OA.js",
];
export const stylesheets = [];
export const fonts = [];
