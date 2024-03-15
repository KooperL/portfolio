import { writable } from "svelte/store"

export interface Metadata {
  title?: string
  description?: string
  headline?: string
}

export interface Toast {
  text?: string
}

export const metadata = writable<Metadata>({})
export const toast = writable<Toast>({})
