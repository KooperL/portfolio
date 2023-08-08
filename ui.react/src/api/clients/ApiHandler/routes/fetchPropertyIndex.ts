import { PropertyIndexRequest, PropertyIndexResponse } from "./../../../../containers/propertyPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { routes } from "../types";
import { ApiConsumer } from "../instance";
import { genericApiDataResponse, genericApiRequestArgs } from "src/api/shared/types";
import { AxiosResponse } from "axios";


export const fetchPropertyIndex = (props: genericApiRequestArgs<PropertyIndexRequest>): Promise<AxiosResponse<genericApiDataResponse<PropertyIndexResponse>>> => {
  const {payload: body} = props
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
