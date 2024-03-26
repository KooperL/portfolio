import PocketBase from "pocketbase";
import { P as PUBLIC_POCKETBASE_URL } from "./public.js";
import { w as writable } from "./index.js";
const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
const currentUser = writable(pb.authStore);
pb.authStore.onChange((auth) => {
  console.log("authStore changed", auth);
  currentUser.set(pb.authStore);
});
export {
  currentUser as c
};
