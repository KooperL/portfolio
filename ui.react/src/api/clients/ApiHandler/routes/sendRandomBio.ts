import { RandombioRequest } from "./../../../../containers/randomBioPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";
import { genericApiDataResponse, genericApiRequestArgs } from "src/api/shared/types";
import { AxiosResponse } from "axios";


export const sendRandomBio = (props: genericApiRequestArgs<RandombioRequest>): Promise<AxiosResponse<genericApiDataResponse<string>>> => {
  const {payload: params} = props
  const path = `${routes.randombio}`
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
