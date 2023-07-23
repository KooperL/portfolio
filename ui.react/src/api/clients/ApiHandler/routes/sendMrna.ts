import { MrnaRequest, MrnaResponse } from "./../../../../containers/mrnaPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";


export const sendMrna = (data: MrnaRequest): Promise<MrnaResponse> => {
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
