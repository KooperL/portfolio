import { PropertyIndexResponse } from "./../../../../containers/propertyPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { routes } from "../types";
import { ApiConsumer } from "../instance";
import { genericApiDataResponse, genericApiRequestArgs } from "src/api/shared/types";
import { AxiosResponse } from "axios";


export const fetchPropertySearch = (props: genericApiRequestArgs<any>): Promise<AxiosResponse<genericApiDataResponse<PropertyIndexResponse>>> => {
  const {
    varRoute: suburb,
    payload: body
  } = props

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
