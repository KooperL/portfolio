import { P as PUBLIC_POCKETBASE_URL } from "./public.js"
import PocketBase from "pocketbase"
const handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL)
  const cookie = event.request.headers.get("cookie")
  event.locals.pb.authStore.loadFromCookie(cookie || "")
  try {
    event.locals.pb.authStore.isValid &&
      (await event.locals.pb.collection("users").authRefresh())
  } catch (_) {
    event.locals.pb.authStore.clear()
  }
  const response = await resolve(event)
  response.headers.set(
    "set-cookie",
    event.locals.pb.authStore.exportToCookie({
      httpOnly: false,
      secure: false,
    }),
  )
  return response
}
export { handle }
