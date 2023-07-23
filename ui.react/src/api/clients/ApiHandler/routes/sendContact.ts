import { ContactRequestPayload, ContactResponsePayload } from "./../../../../containers/contactPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";


export const sendContact = (data: ContactRequestPayload): Promise<ContactResponsePayload> => {
  const path = `${routes.contact}`
  const config = {
    url: path,
    method: 'POST',
    data,
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.NetworkFirst,
    CacheKey: path
  }
  return ApiConsumer.request(
    config,
    cacheKey,
  )
}

export {
}
