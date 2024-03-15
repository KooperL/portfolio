import { writable } from "svelte/store"

export let showCollider = writable(false)
export let autoRotate = writable(true)
export let tickSpeed = writable(1)
export let tick = writable(1)
