import { MrnaRequest, MrnaResponse } from "./../../../../containers/mrnaPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";
import { genericApiDataResponse } from "src/api/shared/types";
import { AxiosResponse } from "axios";


export const sendMrna = (data: MrnaRequest): Promise<AxiosResponse<genericApiDataResponse<MrnaResponse>>> => {
  const path = `${routes.mrna}`
  const config = {
    url: path,
    params: data,
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
