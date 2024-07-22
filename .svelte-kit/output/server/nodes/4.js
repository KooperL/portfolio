export const index = 4;
let component_cache;
export const component = async () =>
  (component_cache ??= (
    await import("../entries/pages/contact/_page.svelte.js")
  ).default);
export const imports = [
  "_app/immutable/nodes/4.POa_2B-7.js",
  "_app/immutable/chunks/scheduler.gY_bz6RS.js",
  "_app/immutable/chunks/index.1Dz5KRer.js",
  "_app/immutable/chunks/pocketbase.eYyW_pXf.js",
  "_app/immutable/chunks/index.f12sfW-N.js",
  "_app/immutable/chunks/Button.ZyweCTx2.js",
  "_app/immutable/chunks/Frame.osOJd-OA.js",
  "_app/immutable/chunks/Card.vyHOi96P.js",
];
export const stylesheets = [];
export const fonts = [];
