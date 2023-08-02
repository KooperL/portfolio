import { AxiosResponse } from "axios";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { genericApiDataResponse } from "src/api/shared/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";

interface MonitorRequestPayload {
  uuid: string
  session_id: string
  page: string
  prevPage: string
  newVisit?: string
}

export const sendMonitor = (data: MonitorRequestPayload): Promise<AxiosResponse<genericApiDataResponse<null>>> => {
  const path = `${routes.monitor}`
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

