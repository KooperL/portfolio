import { AxiosResponse } from "axios";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { genericApiDataResponse, genericApiRequestArgs } from "src/api/shared/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";

interface CaptureRequestPayload {
  canvas_hash: string
  uuid: string
  innerHeight: number
  outerHeight: number
  innerWidth: number
  outerWidth: number
  actualHeight: number
  actualWidth: number
  pixelDepth: number
  platform: string
  cookieEnabled: boolean
  darkMode: boolean
}
export const sendCapture = (props: genericApiRequestArgs<CaptureRequestPayload>): Promise<AxiosResponse<genericApiDataResponse<null>>> => {
  const {payload: params} = props
  const path = `${routes.capture}`
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

