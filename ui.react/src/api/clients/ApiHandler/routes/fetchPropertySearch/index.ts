import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types"
import { routes } from "../../types"
import { ApiConsumer } from "../../instance"
import {
  genericApiDataResponse,
  genericApiRequestArgs,
  projectPath,
} from "src/api/shared/types"
import { AxiosResponse } from "axios"
import { PropertyIndexResponse } from "../fetchPropertyIndex/types"

export const fetchPropertySearch = (
  props: genericApiRequestArgs<any>,
): Promise<AxiosResponse<genericApiDataResponse<PropertyIndexResponse>>> => {
  const { varRoute: suburb, payload: body } = props

  const path = `${projectPath}/${routes.property}/${suburb}`
  const config = {
    url: path,
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.CacheFirst,
    CacheKey: path,
  }
  return ApiConsumer.request(config, cacheKey)
}

export {}
