import * as universal from "../entries/pages/_layout.js";

export const index = 0;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import("../entries/pages/_layout.svelte.js"))
    .default);
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = [
  "_app/immutable/nodes/0._bhLl1wR.js",
  "_app/immutable/chunks/scheduler.gY_bz6RS.js",
  "_app/immutable/chunks/index.1Dz5KRer.js",
  "_app/immutable/chunks/entry.6kHzac2I.js",
  "_app/immutable/chunks/index.f12sfW-N.js",
  "_app/immutable/chunks/Frame.osOJd-OA.js",
  "_app/immutable/chunks/pocketbase.eYyW_pXf.js",
];
export const stylesheets = ["_app/immutable/assets/0.41mCIbvY.css"];
export const fonts = [];
