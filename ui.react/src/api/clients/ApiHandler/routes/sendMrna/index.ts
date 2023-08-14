import { MrnaRequest, MrnaResponse } from "./types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { ApiConsumer } from "../../instance";
import { routes } from "../../types";
import { genericApiDataResponse, genericApiRequestArgs, projectPath } from "src/api/shared/types";
import { AxiosResponse } from "axios";


export const sendMrna = (props: genericApiRequestArgs<MrnaRequest>): Promise<AxiosResponse<genericApiDataResponse<MrnaResponse>>> => {
  const {payload: params} = props
  const path = `${projectPath}/${routes.mrna}`
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
