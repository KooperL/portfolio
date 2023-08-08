import { AxiosResponse } from "axios";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { genericApiDataResponse, genericApiRequestArgs } from "src/api/shared/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";

interface MonitorRequestPayload {
  uuid: string
  session_id: string
  page: string
  prevPage: string
  newVisit?: string
}

export const sendMonitor = (props: genericApiRequestArgs<MonitorRequestPayload>): Promise<AxiosResponse<genericApiDataResponse<null>>> => {
  const {payload: params} = props
  const path = `${routes.monitor}`
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

