import { SecondaryRequest, SecondaryResponse } from "./../../../../containers/secondaryPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";
import { genericApiDataResponse } from "src/api/shared/types";


export const sendSecondary = (data: SecondaryRequest): Promise<genericApiDataResponse<SecondaryResponse>> => {
  const path = `${routes.secondary}`
  const config = {
    url: path,
    params: data,
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.NetworkFirst,
    CacheKey: path
  }
  return fetchCMS.request(
    config,
    cacheKey,
  )
}

export {
}
