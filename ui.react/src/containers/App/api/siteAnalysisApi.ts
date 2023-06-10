import { siteAnalysisResponse } from "@containers/siteAnalysisPage/types"
import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { endpoints } from "./endpoints"
import { GenericResponse } from "./types"

export const fetchSiteAnalysis = (): Promise<GenericResponse<siteAnalysisResponse, ApiError>> => {
  const apiConfig = {
    headers: {},
    params: { uuid: localStorage.getItem("uuid") },
  }
  return get(endpoints["siteanalysis"], apiConfig)
}
