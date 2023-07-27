import { PropertyIndexRequest, PropertyIndexResponse } from "./../../../../containers/propertyPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { routes } from "../types";
import { ApiConsumer } from "../instance";
import { genericApiDataResponse } from "src/api/shared/types";


export const fetchPropertyIndex = (data: PropertyIndexRequest): Promise<genericApiDataResponse<PropertyIndexResponse>> => {
  const path = `${routes.property}`
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
