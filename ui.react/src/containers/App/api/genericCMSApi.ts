import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { endpoints } from "./endpoints"
import { cmsData, CmsEndpoints, GenericResponse } from "./types"

export const fetchCMSData = (route: keyof CmsEndpoints): Promise<GenericResponse<cmsData[], ApiError>> => {
  const apiConfig = {
    headers: {},
    params: {},
  }
  return get(endpoints[route], apiConfig)
}
