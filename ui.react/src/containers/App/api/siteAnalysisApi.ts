import { siteAnalysisResp } from "../../siteAnalysisPage/types"
import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { AboutPayload } from "../../aboutPage/types"
import { endpoints } from "./endpoints"
import { Payload } from "./types"

export const fetchSiteAnalysis = (): Promise<ApiError | siteAnalysisResp> => {
  const apiConfig = {
    headers: {},
    params: { uuid: localStorage.getItem("uuid") },
  }
  return get(endpoints["siteanalysis"], apiConfig)
}
