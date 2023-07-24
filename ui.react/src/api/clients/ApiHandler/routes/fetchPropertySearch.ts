import { PropertyIndexResponse } from "./../../../../containers/propertyPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { routes } from "../types";
import { ApiConsumer } from "../instance";


export const fetchPropertySearch = (body: {}, suburb: string): Promise<PropertyIndexResponse> => {
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
