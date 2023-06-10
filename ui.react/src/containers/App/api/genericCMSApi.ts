import { CMSPage } from "@components/TypeLookup/types"
import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { endpoints } from "./endpoints"
import { CmsEndpoints, GenericResponse } from "./types"

export const fetchCMSData = (
  route: keyof CmsEndpoints,
): Promise<GenericResponse<CMSPage, ApiError>> => {
  const apiConfig = {
    headers: {},
    params: {},
  }
  return get(endpoints[route], apiConfig)
}
