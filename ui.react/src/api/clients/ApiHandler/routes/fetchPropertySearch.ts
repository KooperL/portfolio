import { PropertyIndexResponse } from "./../../../../containers/propertyPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { routes } from "../types";
import { ApiConsumer } from "../instance";
import { genericApiDataResponse } from "src/api/shared/types";
import { AxiosResponse } from "axios";


export const fetchPropertySearch = (body: {}, suburb: string): Promise<AxiosResponse<genericApiDataResponse<PropertyIndexResponse>>> => {
  const path = `${routes.property}/${suburb}`
  const config = {
    url: path,
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.CacheFirst,
    CacheKey: path
  }
  return ApiConsumer.request(
    config,
    cacheKey,
  )
}

export {
}
