import { ContactRequestPayload, ContactResponsePayload } from "./../../../../containers/contactPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";
import { genericApiDataResponse } from "src/api/shared/types";
import { MrnaResponse } from "src/containers/mrnaPage/types";
import { AxiosResponse } from "axios";


export const sendContact = (data: ContactRequestPayload): Promise<AxiosResponse<genericApiDataResponse<ContactResponsePayload>>> => {
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
