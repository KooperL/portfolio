import * as server from "../entries/pages/_page.server.js";

export const index = 2;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import("../entries/pages/_page.svelte.js"))
    .default);
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = [
  "_app/immutable/nodes/2.PY0-wMbD.js",
  "_app/immutable/chunks/scheduler.gY_bz6RS.js",
  "_app/immutable/chunks/index.1Dz5KRer.js",
  "_app/immutable/chunks/pocketbase.eYyW_pXf.js",
  "_app/immutable/chunks/index.f12sfW-N.js",
  "_app/immutable/chunks/Button.ZyweCTx2.js",
  "_app/immutable/chunks/Frame.osOJd-OA.js",
  "_app/immutable/chunks/Card.vyHOi96P.js",
  "_app/immutable/chunks/ArrowRightToBracketOutline.6j5_Ggcq.js",
];
export const stylesheets = [];
export const fonts = [];
