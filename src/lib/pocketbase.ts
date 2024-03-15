import PocketBase from "pocketbase"
import { env } from "$env/dynamic/public"
import { writable } from "svelte/store"

export const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL)

export const currentUser = writable(pb.authStore)

pb.authStore.onChange(auth => {
  console.log("authStore changed", auth)
  currentUser.set(pb.authStore)
})
