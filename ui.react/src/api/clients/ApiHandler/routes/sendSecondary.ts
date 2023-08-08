import { SecondaryRequest, SecondaryResponse } from "./../../../../containers/secondaryPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";
import { genericApiDataResponse, genericApiRequestArgs } from "src/api/shared/types";
import { AxiosResponse } from "axios";


export const sendSecondary = (props: genericApiRequestArgs<SecondaryRequest>): Promise<AxiosResponse<genericApiDataResponse<SecondaryResponse>>> => {
  const {payload: params} = props
  const path = `${routes.secondary}`
  const config = {
    url: path,
    params,
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
