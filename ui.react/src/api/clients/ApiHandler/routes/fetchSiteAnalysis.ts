import { siteAnalysisResponse } from "./../../../../containers/siteAnalysisPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";
import { genericApiDataResponse } from "src/api/shared/types";
import { AxiosResponse } from "axios";


export const fetchSiteAnalysis = (data: {}): Promise<AxiosResponse<genericApiDataResponse<siteAnalysisResponse>>> => {
  const path = `${routes.logsPull}`
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
