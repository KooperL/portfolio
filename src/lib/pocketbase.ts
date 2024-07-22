import PocketBase from "pocketbase";
import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import { writable } from "svelte/store";
export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const currentUser = writable(pb.authStore);

pb.authStore.onChange((auth) => {
  console.log("authStore changed", auth);
  currentUser.set(pb.authStore);
});
